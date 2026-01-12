# Lab 1: Cloudflare Pages & Workers - REST API Serverless

## 🎯 Tujuan
Membuat serverless REST API menggunakan Cloudflare Workers yang dapat merespons HTTP requests dengan deployment otomatis dari GitHub.

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- Akun GitHub
- Akun Cloudflare (gratis unlimited) - [Sign up di sini](https://dash.cloudflare.com/sign-up)

## 🚀 Apa yang Akan Kita Buat?
REST API sederhana dengan endpoints:
- `GET /api/hello` - Mengembalikan pesan hello world
- `POST /api/user` - Menerima data user dan mengembalikan response

## 📝 Step-by-Step Guide

### Step 1: Sign Up Cloudflare (2 menit)
1. Buka https://dash.cloudflare.com/sign-up
2. Daftar pakai **email** (tidak perlu kartu kredit!)
3. Verify email
4. ✅ Akun siap digunakan

### Step 2: Create Pages Project (3 menit)

1. **Di Cloudflare Dashboard:**
   - Sidebar → **Workers & Pages**
   - Klik **Create application**
   - Tab **Pages** → **Connect to Git**
   
2. **Connect GitHub:**
   - Authorize Cloudflare untuk mengakses GitHub
   - Pilih repository: `serverless` (yang sudah di-fork/clone)
   
3. **Configure Build:**
   ```
   Project name: serverless-workshop-[nama-anda]
   Production branch: main
   Build command: (kosongkan)
   Build output directory: (kosongkan)
   Root directory: labs/lab1-cloudflare
   ```

4.  **Deploy:**
   - Klik **Save and Deploy**
   - Tunggu ~30-60 detik
   - ✅ Site sudah live!

5. **Copy Project URL:**
   - Contoh: `https://serverless-workshop-virgi.pages.dev`

### Step 3: Buat Cloudflare Functions (8 menit)

Cloudflare Pages otomatis mendeteksi folder `functions/` sebagai serverless functions.

1. **Di repository Anda, buat struktur folder:**
   ```
   labs/lab1-cloudflare/
   ├── functions/
   │   ├── api/
   │   │   ├── hello.js
   │   │   └── user.js
   └── index.html (optional)
   ```

2. **Buat file `functions/api/hello.js`:**

```javascript
export async function onRequest(context) {
    // Function akan jalan di Cloudflare Edge Network
    const { request, env } = context;
    
    if (request.method === 'GET') {
        return new Response(JSON.stringify({
            message: 'Hello dari Cloudflare Edge!',
            timestamp: new Date().toISOString(),
            location: request.cf?.colo || 'Unknown' // Cloudflare datacenter
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
    
    return new Response('Method Not Allowed', { status: 405 });
}
```

3. **Buat file `functions/api/user.js`:**

```javascript
export async function onRequest(context) {
    const { request } = context;
    
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const body = await request.json();
    
    return new Response(JSON.stringify({
        message: 'User created successfully!',
        user: {
            name: body.name || 'Anonymous',
            email: body.email || 'no-email@example.com',
            id: crypto.randomUUID() // Built-in Web API
        },
        createdAt: new Date().toISOString()
    }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
```

4. **Commit & Push:**
   ```bash
   git add functions/
   git commit -m "Add Cloudflare Functions"
   git push origin main
   ```

5. **Cloudflare akan auto-deploy!**
   - Buka Cloudflare Dashboard → Pages → Your Project
   - Tab **Deployments** → Lihat status "Building"
   - Tunggu hingga "Published"
   - ✅ Functions sudah live di edge network global!

### Step 4: Test Functions (5 menit)

#### Test GET /api/hello

**Di Browser:**
1. Buka: `https://YOUR-PROJECT.pages.dev/api/hello`
2. ✅ Anda harus lihat response JSON!

**Menggunakan curl:**
```bash
curl https://YOUR-PROJECT.pages.dev/api/hello
```

**Response:**
```json
{
  "message": "Hello dari Cloudflare Edge!",
  "timestamp": "2026-01-12T12:00:00Z",
  "location": "SIN" // Singapore datacenter!
}
```

#### Test POST /api/user

**Menggunakan curl:**
```bash
curl -X POST https://YOUR-PROJECT.pages.dev/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Virgi","email":"virgi@example.com"}'
```

**Menggunakan Postman/Thunder Client:**
1. POST ke: `https://YOUR-PROJECT.pages.dev/api/user`
2. Body (JSON):
   ```json
   {
     "name": "Virgi",
     "email": "virgi@example.com"
   }
   ```
3. Send request
4. ✅ Status 201 + User data dengan UUID!

### Step 5: Lihat Analytics & Logs (3 menit)

1. Cloudflare Dashboard → Pages → Your Project
2. Tab **Analytics**
   - Requests per second
   - Bandwidth usage
   - Error rate
3. Tab **Functions**
   - Lihat function invocations
   - CPU time
   - Errors (if any)

✅ Real-time analytics tanpa setup apapun!

## 🎉 Selamat!

Anda baru saja membuat REST API serverless yang jalan di **Cloudflare Edge Network** di 275+ kota worldwide!

## ✨ Keunggulan Cloudflare Pages

- ✅ **Gratis unlimited** requests (100k/day pada free tier)
- ✅ **Edge network global** - ultra low latency
- ✅ **Auto deploy** dari GitHub push
- ✅ **No cold starts** - functions always warm
- ✅ **Built-in DDoS protection**
- ✅ **Developer-friendly** - simple API

## 💰 Pricing

Cloudflare Workers Free Tier:
- 100,000 requests per day
- 10ms CPU time per request
- Unlimited bandwidth
- No credit card required!

Paid Plan:
- $5/month untuk 10 juta requests
- Sangat cost-effective!

## 🧹 Cleanup (Optional)

Jika ingin hapus resources:
1. Cloudflare Dashboard → Pages → Your Project
2. Settings → Delete project

## 🔗 Resources
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Workers Runtime API](https://developers.cloudflare.com/workers/runtime-apis/)

## ❓ Troubleshooting

**Q: Function return 404?**
- A: Pastikan folder structure `functions/api/` benar
- A: File harus `.js` bukan `.mjs`
- A: Cek deployment logs di Cloudflare Dashboard

**Q: Function tidak update setelah push?**
- A: Tunggu deployment selesai (30-60 detik)
- A: Hard refresh browser (Ctrl+Shift+R)
- A: Clear Cloudflare cache (Dashboard → Caching → Purge Everything)

**Q: CORS error?**
- A: Pastikan header `Access-Control-Allow-Origin: *` ada di semua responses

**Q: "account_limit_exceeded"?**
- A: Free tier limit 100k requests/day
- A: Reset setiap 24 jam (UTC timezone)

## 🔥 Advanced Tips

### Environment Variables
Tambahkan di Dashboard → Settings → Environment variables:
```
API_KEY=your_secret_key
DB_URL=your_database_url
```

Access di code:
```javascript
export async function onRequest(context) {
    const { env } = context;
    const apiKey = env.API_KEY; // Environment variable
    // ...
}
```

### Middleware Pattern
Buat `functions/_middleware.js` untuk global middleware:
```javascript
export async function onRequest(context) {
    // Runs before all functions
    console.log('Request:', context.request.url);
    return context.next();
}
```

---

**Next:** [Lab 2 - Vercel Deployment](../lab2-vercel/README.md)

**Cloudflare is FAST! ⚡ Selamat mencoba!**
