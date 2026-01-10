export async function GET(request) {
    return Response.json({
        message: 'Hello dari Vercel Serverless!',
        timestamp: new Date().toISOString(),
        headers: Object.fromEntries(request.headers),
    });
}
