export const handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    // Get HTTP method and path
    const httpMethod = event.httpMethod || event.requestContext?.http?.method;
    const path = event.path || event.rawPath;
    
    // GET /hello endpoint
    if (httpMethod === 'GET' && path === '/hello') {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Hello dari AWS Lambda!',
                timestamp: new Date().toISOString(),
                region: process.env.AWS_REGION
            })
        };
    }
    
    // POST /user endpoint
    if (httpMethod === 'POST' && path === '/user') {
        const body = JSON.parse(event.body || '{}');
        
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'User created successfully!',
                user: {
                    name: body.name || 'Anonymous',
                    email: body.email || 'no-email@example.com',
                    id: Math.random().toString(36).substr(2, 9)
                },
                createdAt: new Date().toISOString()
            })
        };
    }
    
    // 404 for other routes
    return {
        statusCode: 404,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            error: 'Not Found',
            message: `Route ${httpMethod} ${path} not found`
        })
    };
};
