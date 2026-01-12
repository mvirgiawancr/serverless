// Cloudflare Pages Worker - Single Entry Point
// Lab 1: Workshop Serverless Architecture

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Normalize path: replace double slashes with single slash and remove trailing slash
    const path = url.pathname.replace(/\/+/g, '/').replace(/\/$/, '');
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // API Routes
    
    // GET /api/hello
    if (path === '/api/hello' && request.method === 'GET') {
      return new Response(JSON.stringify({
        message: 'Hello dari Cloudflare Edge! 🚀',
        timestamp: new Date().toISOString(),
        datacenter: request.cf?.colo || 'Unknown',
        country: request.cf?.country || 'Unknown',
        runtime: 'Cloudflare Workers'
      }), { status: 200, headers: corsHeaders });
    }

    // POST /api/hello
    if (path === '/api/hello' && request.method === 'POST') {
      try {
        const body = await request.json();
        return new Response(JSON.stringify({
          message: 'Data diterima!',
          received: body,
          timestamp: new Date().toISOString()
        }), { status: 200, headers: corsHeaders });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), 
          { status: 400, headers: corsHeaders });
      }
    }

    // GET /api/user
    if (path === '/api/user' && request.method === 'GET') {
      return new Response(JSON.stringify({
        message: 'User API endpoint',
        usage: 'POST request dengan body { "name": "...", "email": "..." }'
      }), { status: 200, headers: corsHeaders });
    }

    // POST /api/user
    if (path === '/api/user' && request.method === 'POST') {
      try {
        const body = await request.json();
        
        if (!body.name || !body.email) {
          return new Response(JSON.stringify({
            error: 'Validation Error',
            message: 'Name dan email wajib diisi'
          }), { status: 400, headers: corsHeaders });
        }

        return new Response(JSON.stringify({
          success: true,
          message: 'User berhasil dibuat!',
          user: {
            id: crypto.randomUUID(),
            name: body.name,
            email: body.email,
            createdAt: new Date().toISOString(),
            datacenter: request.cf?.colo || 'Unknown'
          }
        }), { status: 201, headers: corsHeaders });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), 
          { status: 400, headers: corsHeaders });
      }
    }

    // For root path, serve static file (handled by Pages)
    // For other paths, return 404
    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({
        error: 'Not Found',
        message: `Endpoint ${path} tidak ditemukan`,
        availableEndpoints: ['/api/hello', '/api/user']
      }), { status: 404, headers: corsHeaders });
    }

    // Let Cloudflare Pages handle static files
    return env.ASSETS.fetch(request);
  }
};
