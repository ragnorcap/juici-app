import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Hash function for anonymizing sensitive data in logs
const hashData = (data: string): string => {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .substring(0, 8);
};

// In-memory store for development/fallback when database is unavailable
// Data is stored in a json file to persist between server restarts
const DATA_DIR = path.join(__dirname, '../../../data');
const FAVORITES_FILE = path.join(DATA_DIR, 'favorites.json');

let inMemoryFavorites: {
  id: number;
  user_id: string;
  prompt: string;
  categories: string;
  created_at: string;
}[] = [];

let nextId = 1;

// Initialize from file if exists
try {
  if (fs.existsSync(FAVORITES_FILE)) {
    const data = fs.readFileSync(FAVORITES_FILE, 'utf8');
    const parsed = JSON.parse(data);
    inMemoryFavorites = parsed.favorites || [];
    nextId = parsed.nextId || 1;
    console.log(`Loaded ${inMemoryFavorites.length} favorites from file`);
  }
} catch (error) {
  console.error('Error loading favorites from file:', error);
  // Continue with empty favorites
  inMemoryFavorites = [];
  nextId = 1;
}

// Save in-memory data to file function
const saveToFile = () => {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    fs.writeFileSync(
      FAVORITES_FILE, 
      JSON.stringify({ favorites: inMemoryFavorites, nextId }, null, 2)
    );
  } catch (error) {
    console.error('Error saving favorites to file:', error);
  }
};

// Create a fake query implementation for when DB is unavailable
const inMemoryQuery = async (text: string, params: any[]): Promise<QueryResult<any>> => {
  // Don't log sensitive data - hash user IDs and other potentially sensitive information
  const safeParams = params.map(p => 
    typeof p === 'string' && p.length > 8 ? hashData(p) : p
  );
  
  console.log('Using in-memory database fallback');
  console.log('Query:', text);
  console.log('Params:', safeParams);
  
  // Basic parsing of SQL queries for fallback functionality
  if (text.includes('INSERT INTO favorites')) {
    const [userId, prompt, categories] = params;
    const newFavorite = {
      id: nextId++,
      user_id: userId,
      prompt: prompt,
      categories: categories,
      created_at: new Date().toISOString()
    };
    inMemoryFavorites.push(newFavorite);
    saveToFile(); // Persist to file
    return {
      rows: [newFavorite],
      rowCount: 1,
      command: 'INSERT',
      oid: 0,
      fields: []
    } as QueryResult;
  } 
  else if (text.includes('SELECT * FROM favorites WHERE user_id')) {
    const userId = params[0];
    const filteredFavs = inMemoryFavorites.filter(fav => fav.user_id === userId);
    return {
      rows: filteredFavs,
      rowCount: filteredFavs.length,
      command: 'SELECT',
      oid: 0,
      fields: []
    } as QueryResult;
  } 
  else if (text.includes('DELETE FROM favorites WHERE id')) {
    const id = parseInt(params[0]);
    inMemoryFavorites = inMemoryFavorites.filter(fav => fav.id !== id);
    saveToFile(); // Persist to file
    return {
      rowCount: 1,
      rows: [],
      command: 'DELETE',
      oid: 0,
      fields: []
    } as QueryResult;
  }
  else if (text.includes('SELECT EXISTS')) {
    // Table existence check
    return {
      rows: [{ exists: true }],
      rowCount: 1,
      command: 'SELECT',
      oid: 0,
      fields: []
    } as QueryResult;
  }
  
  return {
    rows: [],
    rowCount: 0,
    command: '',
    oid: 0,
    fields: []
  } as QueryResult;
};

// SQL injection protection utility - validates query structure
const validateQuery = (query: string): boolean => {
  // Basic validation - allows simple queries used in our application
  // Blocks queries containing multiple statements, comments, or system commands
  const dangerousPatterns = [
    ';', // Multiple statements
    '--', // SQL comments
    '/*', // Block comments
    'DROP', // Dangerous operations
    'TRUNCATE',
    'DELETE FROM' // without WHERE clause (risky)
  ];
  
  // Check if query contains any dangerous patterns
  const normalizedQuery = query.toUpperCase();
  
  // Simple query validation - real applications should use parameterized queries only
  for (const pattern of dangerousPatterns) {
    if (normalizedQuery.includes(pattern)) {
      console.error(`Potentially dangerous SQL pattern detected: ${pattern}`);
      return false;
    }
  }
  
  // DELETE without WHERE could be dangerous
  if (normalizedQuery.includes('DELETE FROM') && !normalizedQuery.includes('WHERE')) {
    console.error('DELETE statement without WHERE clause detected');
    return false;
  }
  
  return true;
};

// Parameter validation - ensures parameters are safe
const validateParams = (params: any[]): boolean => {
  if (!params || !Array.isArray(params)) {
    return false;
  }
  
  // Check each parameter for potential SQL injection patterns
  for (const param of params) {
    if (typeof param === 'string') {
      const dangerousPatterns = ["'", '"', ';', '--', '/*', '*/'];
      for (const pattern of dangerousPatterns) {
        if (param.includes(pattern)) {
          console.error(`Potentially dangerous character in parameter: ${pattern}`);
          return false;
        }
      }
    }
  }
  
  return true;
};

// Initialize database connection or fallback
let db: Pool;
let supabase: SupabaseClient | null = null;
let isDbConnected = false;

const initializeDbConnection = async () => {
  try {
    // First, try to initialize Supabase client
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET) {
      console.log('Initializing Supabase client...');
      supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SECRET
      );
      
      try {
        // Test the Supabase connection with a simple query
        const { error } = await supabase.from('favorites').select('id', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error connecting to Supabase:', error.message);
          isDbConnected = false;
        } else {
          console.log('✅ Supabase connection successful');
          console.log('✅ Using Supabase for database persistence');
          isDbConnected = true;
          
          // Important: Return here to avoid trying other connection methods
          return;
        }
      } catch (err) {
        console.error('Failed to connect to Supabase:', err instanceof Error ? err.message : String(err));
        isDbConnected = false;
      }
    } else {
      console.warn('⚠️ Supabase credentials not defined in environment variables');
    }
    
    // Fallback to direct PostgreSQL connection if Supabase client fails or isn't configured
    // Check if DATABASE_URL is defined
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not defined in environment variables');
      console.warn('⚠️ Using file-based persistent storage for development');
      throw new Error('DATABASE_URL not defined');
    }
    
    // Validate database URL format (basic check)
    if (!process.env.DATABASE_URL.startsWith('postgres')) {
      console.error('⚠️ Invalid DATABASE_URL format - must start with postgres or postgresql');
      throw new Error('Invalid DATABASE_URL format');
    }
    
    // Create a database pool with security settings
    db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: true } 
        : { rejectUnauthorized: false }, // Always disable SSL cert verification in dev mode
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection cannot be established
    });
    
    // Test the connection
    try {
      const client = await db.connect();
      console.log('✅ Database connection successful');
      
      // Check for proper database schema
      try {
        const result = await client.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)', ['favorites']);
        
        if (!result.rows[0].exists) {
          console.warn('⚠️ Favorites table does not exist in the database');
          console.log('Creating favorites table...');
          // Create favorites table if it doesn't exist
          await client.query(`
            CREATE TABLE IF NOT EXISTS favorites (
              id SERIAL PRIMARY KEY,
              user_id TEXT NOT NULL,
              prompt TEXT NOT NULL,
              categories JSONB,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
          `);
        } else {
          console.log('✅ Required database tables exist');
        }
      } catch (err) {
        console.error('Error checking/creating database schema:', err instanceof Error ? err.message : String(err));
      } finally {
        client.release();
      }
      
      isDbConnected = true;
      
      // Handle pool errors
      db.on('error', (err) => {
        console.error('Unexpected database pool error:', err.message);
        if (err.message.includes('connection terminated') || 
            err.message.includes('too many clients')) {
          isDbConnected = false;
          console.warn('⚠️ Database connection problems detected, using file-based persistent storage');
        }
      });
    } catch (err) {
      console.error('Error connecting to database:', err instanceof Error ? err.message : String(err));
      console.warn('⚠️ Using file-based persistent storage for development');
      isDbConnected = false;
    }
  } catch (error) {
    console.error('Failed to initialize database:', error instanceof Error ? error.message : 'Unknown error');
    console.warn('⚠️ Using file-based persistent storage for development');
    // Create a standard-compliant fake db with query method
    db = {
      query: inMemoryQuery,
      connect: async () => { throw new Error('Not implemented'); },
      end: async () => { console.log('Fake pool end called'); },
      on: (event: string, listener: any) => ({ event, listener }),
    } as unknown as Pool;
    isDbConnected = false;
  }
};

// Initialize the database connection
initializeDbConnection().catch(err => {
  console.error('Database initialization error:', err);
  isDbConnected = false;
  // Create a standard-compliant fake db with query method
  db = {
    query: inMemoryQuery,
    connect: async () => { throw new Error('Not implemented'); },
    end: async () => { console.log('Fake pool end called'); },
    on: (event: string, listener: any) => ({ event, listener }),
  } as unknown as Pool;
});

// Expose query method with fallback, security checks, and parameter sanitization
export const query = async (text: string, params: any[]): Promise<QueryResult<any>> => {
  try {
    // First, validate the query and parameters
    if (!validateQuery(text)) {
      console.error('Rejected potentially unsafe query:', text);
      throw new Error('Invalid query structure');
    }
    
    if (!validateParams(params)) {
      console.error('Rejected potentially unsafe parameters');
      throw new Error('Invalid query parameters');
    }
    
    // Log queries in a safe way (without exposing sensitive data)
    const safeParams = params.map(p => 
      typeof p === 'string' && p.length > 8 ? hashData(p) : p
    );
    console.log(`Executing query: ${text.replace(/\s+/g, ' ').trim()}`);
    console.log('Parameters:', safeParams);
    
    // If we have a working Supabase client, use it
    if (supabase && isDbConnected) {
      // Map SQL queries to Supabase client operations
      if (text.includes('INSERT INTO favorites')) {
        const [userId, prompt, categories] = params;
        const { data, error } = await supabase
          .from('favorites')
          .insert({
            user_id: userId,
            prompt: prompt,
            categories: categories,
          })
          .select();
        
        if (error) throw error;
        return {
          rows: data || [],
          rowCount: data?.length || 0,
          command: 'INSERT',
          oid: 0,
          fields: []
        } as QueryResult;
      } 
      else if (text.includes('SELECT * FROM favorites WHERE user_id')) {
        const userId = params[0];
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', userId);
        
        if (error) throw error;
        return {
          rows: data || [],
          rowCount: data?.length || 0,
          command: 'SELECT',
          oid: 0,
          fields: []
        } as QueryResult;
      } 
      else if (text.includes('DELETE FROM favorites WHERE id')) {
        const id = params[0];
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return {
          rows: [],
          rowCount: 1,
          command: 'DELETE',
          oid: 0,
          fields: []
        } as QueryResult;
      }
      else if (text.includes('SELECT EXISTS')) {
        return {
          rows: [{ exists: true }],
          rowCount: 1,
          command: 'SELECT',
          oid: 0,
          fields: []
        } as QueryResult;
      }
    }
    
    // Fallback to regular database or in-memory storage
    if (!isDbConnected) {
      return inMemoryQuery(text, params);
    }
    
    // When using real database connection, ensure queries have timeouts
    const result = await Promise.race([
      db.query(text, params),
      new Promise<never>((_, reject) => {
        const timeout = parseInt(process.env.REQUEST_TIMEOUT || '30000');
        setTimeout(() => reject(new Error('Query timeout')), timeout);
      })
    ]);
    
    return result;
  } catch (error) {
    console.error('Database query error:', error instanceof Error ? error.message : 'Unknown error');
    console.warn('⚠️ Falling back to file-based persistent storage');
    return inMemoryQuery(text, params);
  }
};

// Safe disconnect method for clean shutdowns
export const disconnect = async () => {
  if (db && typeof db.end === 'function') {
    try {
      await db.end();
      console.log('Database connection pool has ended');
    } catch (err) {
      console.error('Error ending database connection pool:', err);
    }
  }
  
  // Save any in-memory data before shutdown
  if (!isDbConnected) {
    saveToFile();
  }
};

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing database connections');
  await disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing database connections');
  await disconnect();
  process.exit(0);
});

export { db, isDbConnected }; 