// Cloudflare Pages Functions - User API
// Lab 1: Workshop Serverless Architecture

export async function onRequest(context) {
  const { request } = context;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // GET /api/user - Info endpoint
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'User API endpoint',
      usage: 'POST request dengan body { "name": "...", "email": "..." }'
    }), { status: 200, headers });
  }

  // POST /api/user - Create user
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      
      // Validate
      if (!body.name || !body.email) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'Name dan email wajib diisi'
        }), { status: 400, headers });
      }

      // Create user response
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
      }), { status: 201, headers });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Invalid JSON',
        message: 'Request body harus valid JSON'
      }), { status: 400, headers });
    }
  }

  return new Response(JSON.stringify({
    error: 'Method Not Allowed'
  }), { status: 405, headers });
}
