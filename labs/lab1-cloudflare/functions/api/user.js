// Cloudflare Workers - User Function
export async function onRequest(context) {
  const { request } = context;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // POST /api/user - Create user
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      
      // Validate input
      if (!body.name || !body.email) {
        return new Response(JSON.stringify({
          error: 'Validation Error',
          message: 'Name and email are required',
        }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Create user response
      return new Response(JSON.stringify({
        success: true,
        message: 'User created successfully!',
        user: {
          id: crypto.randomUUID(), // Built-in Web Crypto API
          name: body.name,
          email: body.email,
          createdAt: new Date().toISOString(),
          datacenter: request.cf?.colo || 'Unknown',
        },
      }), {
        status: 201,
        headers: corsHeaders,
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Invalid JSON',
        message: error.message,
      }), {
        status: 400,
        headers: corsHeaders,
      });
    }
  }

  // GET /api/user - Get user info (demo)
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'User endpoint',
      usage: 'Send POST request with { "name": "...", "email": "..." }',
    }), {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Method not allowed
  return new Response(JSON.stringify({
    error: 'Method Not Allowed',
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
  }), {
    status: 405,
    headers: corsHeaders,
  });
}
