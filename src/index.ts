// API Key verification middleware
const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  // Skip API key check for health check and in development
  if (req.path === '/health' || process.env.NODE_ENV !== 'production') {
    return next();
  }
  
  const providedKey = req.headers['x-api-key'];
  
  if (!providedKey || providedKey !== API_KEY) {
    // Use a generic error message to avoid information leakage
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
}; 