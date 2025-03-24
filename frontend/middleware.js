// middleware.js
export default function middleware(req, res) {
  // Add CSP headers to allow 'unsafe-eval' for development
  res.headers.set('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  
  // Set proper CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.status = 200;
    return res;
  }
  
  return res;
}

// Match all routes
export const config = {
  matcher: '/:path*',
}; 