// Cloudflare Pages Functions - Hello API
// Lab 1: Workshop Serverless Architecture

// Handle OPTIONS (CORS preflight)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

// Handle GET /api/hello
export async function onRequestGet(context) {
  const { request } = context;
  
  return new Response(JSON.stringify({
    message: 'Hello dari Cloudflare Edge! 🚀',
    timestamp: new Date().toISOString(),
    datacenter: request.cf?.colo || 'Unknown',
    country: request.cf?.country || 'Unknown',
    runtime: 'Cloudflare Workers'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// Handle POST /api/hello
export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    return new Response(JSON.stringify({
      message: 'Data diterima!',
      received: body,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Invalid JSON'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
