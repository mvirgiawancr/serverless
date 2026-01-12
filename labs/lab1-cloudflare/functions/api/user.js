// Cloudflare Pages Functions - User API
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

// Handle GET /api/user - Info endpoint
export async function onRequestGet() {
  return new Response(JSON.stringify({
    message: 'User API endpoint',
    usage: 'POST request dengan body { "name": "...", "email": "..." }'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// Handle POST /api/user - Create user
export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    
    // Validate
    if (!body.name || !body.email) {
      return new Response(JSON.stringify({
        error: 'Validation Error',
        message: 'Name dan email wajib diisi'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
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
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Invalid JSON',
      message: 'Request body harus valid JSON'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
