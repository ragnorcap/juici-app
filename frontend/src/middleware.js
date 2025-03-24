// Middleware to handle Content Security Policy and CORS
export default function middleware(req) {
  // Initialize headers object
  const headers = new Headers();
  
  // Set Content Security Policy header to allow eval for development
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.openai.com;"
  );
  
  // Set CORS headers to allow cross-origin requests
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Return modified response
  return new Response(null, {
    status: req.method === 'OPTIONS' ? 204 : 200, // 204 No Content for OPTIONS
    headers
  });
}

// Configure middleware to run on all routes
export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
}; 