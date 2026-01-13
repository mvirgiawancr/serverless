# Lab 3: Supabase Edge Functions

## 🎯 Tujuan
Membuat serverless edge function menggunakan Supabase yang berjalan di Deno runtime dengan database PostgreSQL terintegrasi.

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- Akun GitHub
- Akun Supabase (gratis) - [Sign up di sini](https://supabase.com)

## 🚀 Apa yang Akan Kita Buat?
REST API dengan fitur database:
- `GET /hello` - Hello World dengan info region
- `POST /notes` - Simpan catatan ke database
- `GET /notes` - Ambil semua catatan

## ✨ Keunggulan Supabase

| Fitur | Free Tier |
|-------|-----------|
| Edge Functions | 500K invocations/month |
| Database PostgreSQL | 500MB |
| Auth Users | Unlimited |
| Storage | 1GB |
| **Kartu Kredit** | **TIDAK PERLU** ✅ |

---

## 📝 Step-by-Step Guide

### Step 1: Sign Up Supabase (2 menit)
1. Buka https://supabase.com
2. Klik **"Start your project"**
3. **Sign in with GitHub** (recommended)
4. ✅ Akun siap!

### Step 2: Create Project (3 menit)
1. Klik **"New Project"**
2. Isi form:
   - **Organization**: Pilih yang ada atau buat baru
   - **Project name**: `serverless-lab3`
   - **Database Password**: Buat password (simpan baik-baik!)
   - **Region**: Pilih `Southeast Asia (Singapore)`
3. Klik **"Create new project"**
4. Tunggu 1-2 menit sampai project ready

### Step 3: Buat Table Database (5 menit)

1. Di sidebar, klik **"Table Editor"**
2. Klik **"Create a new table"**
3. Isi:
   - **Name**: `notes`
   - **Enable Row Level Security (RLS)**: Matikan dulu untuk testing
4. Tambah kolom:
   | Name | Type | Default |
   |------|------|---------|
   | id | int8 | (auto) |
   | content | text | - |
   | created_at | timestamptz | now() |
5. Klik **"Save"**

### Step 4: Buat Edge Function (5 menit)

1. Sidebar → **Edge Functions**
2. Klik **"Create a new function"**
3. **Function name**: `hello`
4. Klik **"Create function"**
5. Di code editor, paste kode berikut:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name } = await req.json()
    const data = {
      message: `Hello ${name || 'World'} dari Supabase Edge! 🚀`,
      timestamp: new Date().toISOString(),
      region: Deno.env.get('DENO_REGION') || 'unknown',
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 },
    )
  }
})
```

6. Klik **"Deploy"**

### Step 5: Test Edge Function (3 menit)

#### 5.1 Dapatkan URL Function
1. Setelah deploy, klik function yang sudah dibuat
2. Di halaman detail function, copy **URL endpoint**
3. Atau gunakan format manual:
   ```
   https://[PROJECT-REF].supabase.co/functions/v1/[FUNCTION-NAME]
   ```
4. **Cara mendapatkan Project Reference:**
   - Buka **Settings** (⚙️) → **General** → Copy **Reference ID**
   - Atau lihat di URL browser: `https://supabase.com/dashboard/project/[INI-PROJECT-REF]`

#### 5.2 Dapatkan Anon Key (Legacy JWT)
> ⚠️ **Penting:** Gunakan **Legacy Anon Key** (format JWT), bukan key baru `sb_publishable_...`

1. Buka **Settings** → **API Keys**
2. Cari section **"Legacy anon, service_role API keys"** (mungkin perlu di-expand)
3. Copy **anon** key yang formatnya: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### 5.3 Test dengan CLI (curl)
```bash
curl -X POST https://YOUR-PROJECT-REF.supabase.co/functions/v1/hello \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-LEGACY-ANON-KEY" \
  -d '{"name": "Virgi"}'
```

#### 5.4 Test dengan Browser (Alternatif)
Gunakan file `test-supabase.html` yang tersedia di folder ini:
1. Buka file `test-supabase.html` di browser
2. Masukkan URL function dan Legacy Anon Key
3. Klik tombol **"Test Function"**

### Step 6: Buat Function dengan Database (Optional)

1. Buat function baru: `notes`
2. Paste kode:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  try {
    if (req.method === 'POST') {
      const { content } = await req.json()
      const { data, error } = await supabaseClient
        .from('notes')
        .insert({ content })
        .select()

      if (error) throw error
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      })
    }

    if (req.method === 'GET') {
      const { data, error } = await supabaseClient
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

3. Deploy dan test!

---

## 🎉 Selamat!

Anda baru saja membuat:
- ✅ Edge Function yang jalan di Deno runtime
- ✅ Database PostgreSQL production-ready
- ✅ API dengan CRUD operations
- ✅ **100% GRATIS tanpa kartu kredit!**

## 🔗 Resources
- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

## ❓ Troubleshooting

**Q: Error "Missing authorization header"?**
A: Tambahkan header `Authorization: Bearer YOUR-ANON-KEY` pada request.

**Q: Error "Invalid JWT"?**
A: Gunakan **Legacy Anon Key** (format `eyJhbGciOi...`), bukan key baru `sb_publishable_...`. Cari di Settings → API Keys → Legacy anon, service_role API keys.

**Q: Function tidak muncul?**
A: Refresh halaman Edge Functions.

**Q: Database error?**
A: Cek apakah RLS sudah dimatikan untuk testing.

---

**Next:** [Lab 4 - Integration Test](../lab4-integration/README.md)

**Supabase is AWESOME! 💚 Selamat mencoba!**
