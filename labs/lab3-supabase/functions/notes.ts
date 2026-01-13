// Supabase Edge Function - Notes CRUD
// Lab 3: Workshop Serverless Architecture
//
// This function demonstrates database integration
// Deploy via Supabase Dashboard

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    try {
        // POST - Create new note
        if (req.method === 'POST') {
            const { content } = await req.json()

            if (!content) {
                return new Response(
                    JSON.stringify({ error: 'Content is required' }),
                    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
                )
            }

            const { data, error } = await supabaseClient
                .from('notes')
                .insert({ content })
                .select()
                .single()

            if (error) throw error

            return new Response(
                JSON.stringify({
                    success: true,
                    message: 'Note created!',
                    note: data
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
            )
        }

        // GET - Fetch all notes
        if (req.method === 'GET') {
            const { data, error } = await supabaseClient
                .from('notes')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10)

            if (error) throw error

            return new Response(
                JSON.stringify({
                    success: true,
                    count: data.length,
                    notes: data
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Method not allowed
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
    }
})
