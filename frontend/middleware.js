// middleware.js
export default function middleware(req, res) {
  // Add strict CSP headers to prevent 'eval' usage and enforce HTTPS
  res.headers.set('Content-Security-Policy', 
    "default-src 'self' https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self' https:; font-src 'self' https:; object-src 'none'; media-src 'self' https:; frame-src 'self' https:; upgrade-insecure-requests;"
  );
  
  // Set proper CORS headers
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  
  // Add Strict-Transport-Security header to enforce HTTPS
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Prevent mixed content
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
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