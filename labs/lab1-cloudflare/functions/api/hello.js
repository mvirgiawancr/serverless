// Cloudflare Pages Functions - Hello API
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

  // GET /api/hello
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Hello dari Cloudflare Edge! 🚀',
      timestamp: new Date().toISOString(),
      datacenter: request.cf?.colo || 'Unknown',
      country: request.cf?.country || 'Unknown',
      runtime: 'Cloudflare Workers'
    }), { status: 200, headers });
  }

  // POST /api/hello - Echo back data
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      return new Response(JSON.stringify({
        message: 'Data diterima!',
        received: body,
        timestamp: new Date().toISOString()
      }), { status: 200, headers });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Invalid JSON'
      }), { status: 400, headers });
    }
  }

  return new Response(JSON.stringify({
    error: 'Method Not Allowed'
  }), { status: 405, headers });
}
