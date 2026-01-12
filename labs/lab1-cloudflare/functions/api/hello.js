// Cloudflare Workers - Hello Function
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

  // GET /api/hello
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Hello dari Cloudflare Edge!',
      timestamp: new Date().toISOString(),
      datacenter: request.cf?.colo || 'Unknown',
      country: request.cf?.country || 'Unknown',
    }), {
      status: 200,
      headers: corsHeaders,
    });
  }

  // POST /api/hello
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      
      return new Response(JSON.stringify({
        message: 'Data received!',
        receivedData: body,
        timestamp: new Date().toISOString(),
      }), {
        status: 200,
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

  // Method not allowed
  return new Response(JSON.stringify({
    error: 'Method Not Allowed',
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
  }), {
    status: 405,
    headers: corsHeaders,
  });
}
