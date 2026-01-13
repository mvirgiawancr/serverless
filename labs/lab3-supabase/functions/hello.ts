// Supabase Edge Function - Hello World
// Lab 3: Workshop Serverless Architecture
// 
// Deploy via Supabase Dashboard:
// 1. Go to Edge Functions
// 2. Create new function "hello"
// 3. Paste this code
// 4. Deploy

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Parse request body (optional)
        let name = 'World'
        try {
            const body = await req.json()
            name = body.name || 'World'
        } catch {
            // No body or invalid JSON, use default
        }

        const data = {
            message: `Hello ${name} dari Supabase Edge! 🚀`,
            timestamp: new Date().toISOString(),
            region: Deno.env.get('DENO_REGION') || 'unknown',
            runtime: `Deno ${Deno.version.deno}`,
        }

        return new Response(
            JSON.stringify(data),
            {
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                },
                status: 200
            },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                },
                status: 400
            },
        )
    }
})
