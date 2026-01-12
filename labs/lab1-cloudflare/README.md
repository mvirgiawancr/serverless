# Lab 1: Cloudflare Pages - Serverless Edge Functions

## 🎯 Tujuan
Membuat serverless edge function menggunakan Cloudflare Pages yang berjalan di edge network global dengan deployment otomatis dari GitHub.

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- Akun GitHub
- Akun Cloudflare (gratis) - [Sign up di sini](https://dash.cloudflare.com)

## 🚀 Apa yang Akan Kita Buat?
REST API sederhana dengan endpoints:
- `GET /` - Landing page dengan test buttons
- `GET /api/hello` - Hello World API
- `POST /api/user` - Create user

## 📂 Struktur Folder

```
labs/lab1-cloudflare/
├── index.html              ← Landing page
├── functions/
│   └── api/
│       ├── hello.js        ← GET/POST /api/hello
│       └── user.js         ← GET/POST /api/user
└── README.md               ← File ini
```

## 📝 Step-by-Step Guide

### Step 1: Sign Up Cloudflare (2 menit)
1. Buka https://dash.cloudflare.com
2. Klik **"Sign up"**
3. Masukkan email dan password
4. Verifikasi email
5. ✅ Akun siap!

### Step 2: Create Pages Project (3 menit)

1. **Di Cloudflare Dashboard:**
   - Sidebar → **Workers & Pages**
   - Klik **"Create application"**
   - Pilih tab **"Pages"** (PENTING!)
   - Klik **"Connect to Git"**

2. **Connect GitHub:**
   - Authorize Cloudflare
   - Pilih repository: `serverless`

3. **Configure Build:**
   ```
   Project name: serverless-lab1
   Production branch: main
   Root directory: labs/lab1-cloudflare
   Build command: (KOSONGKAN)
   Build output directory: (KOSONGKAN)
   ```

4. **Deploy:**
   - Klik **"Save and Deploy"**
   - Tunggu 30-60 detik
   - ✅ Deployed!

5. **Copy Project URL:**
   - Contoh: `https://serverless-lab1.pages.dev`

### Step 3: Pahami Kode (5 menit)

#### File `functions/api/hello.js`:

```javascript
export async function onRequest(context) {
  const { request } = context;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // GET /api/hello
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Hello dari Cloudflare Edge! 🚀',
      timestamp: new Date().toISOString(),
      datacenter: request.cf?.colo || 'Unknown'
    }), { status: 200, headers });
  }
}
```

**Key Points:**
- `export async function onRequest()` - Entry point Cloudflare Pages Functions
- `context.request` - Request object
- `request.cf.colo` - Datacenter location (SIN, HKG, dll)
- `new Response()` - Return HTTP response

### Step 4: Test API (5 menit)

#### Cara 1: Buka Landing Page
Akses `https://YOUR-PROJECT.pages.dev` di browser - klik tombol test!

#### Cara 2: Browser langsung
```
https://YOUR-PROJECT.pages.dev/api/hello
```

#### Cara 3: curl
```bash
# GET
curl https://YOUR-PROJECT.pages.dev/api/hello

# POST
curl -X POST https://YOUR-PROJECT.pages.dev/api/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Virgi","email":"virgi@example.com"}'
```

**Expected Response GET /api/hello:**
```json
{
  "message": "Hello dari Cloudflare Edge! 🚀",
  "timestamp": "2026-01-12T12:00:00Z",
  "datacenter": "SIN",
  "country": "ID",
  "runtime": "Cloudflare Workers"
}
```

**Expected Response POST /api/user:**
```json
{
  "success": true,
  "message": "User berhasil dibuat!",
  "user": {
    "id": "abc123-...",
    "name": "Virgi",
    "email": "virgi@example.com",
    "createdAt": "2026-01-12T12:00:00Z",
    "datacenter": "SIN"
  }
}
```

### Step 5: Edit & Auto-Deploy (5 menit)

1. Edit `functions/api/hello.js` - ubah message:
   ```javascript
   message: 'Hello dari Workshop UBSI! 🎓'
   ```

2. Commit & Push:
   ```bash
   git add .
   git commit -m "Update hello message"
   git push origin main
   ```

3. Cloudflare auto-redeploy dalam **30 detik**!

4. Refresh browser - lihat perubahan! ✅

## 🎉 Selamat!

Anda baru saja membuat serverless edge function yang jalan di **35+ region worldwide**!

## ✨ Keunggulan Cloudflare Pages

- ✅ **Gratis unlimited** requests/month
- ✅ **Edge network** - ultra low latency (300+ lokasi)
- ✅ **Auto deploy** dari GitHub push
- ✅ **Zero config** - no build step needed
- ✅ **Custom domains** gratis
- ✅ **Professional** - dipakai perusahaan besar

## 💰 Pricing

Cloudflare Pages Free Tier:
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month
- No credit card required!

## 🧹 Cleanup (Optional)

Jika ingin hapus:
1. Dashboard → Workers & Pages → serverless-lab1 → Settings → Delete

## 🔗 Resources
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Functions Guide](https://developers.cloudflare.com/pages/functions/)
- [Routing](https://developers.cloudflare.com/pages/functions/routing/)

## ❓ Troubleshooting

**Q: Deploy error "Missing entry-point"?**
- A: Pastikan pilih **Pages** bukan Workers. Build command harus kosong.

**Q: 404 pada /api/hello?**
- A: Cek struktur folder `functions/api/hello.js` - harus persis seperti ini.

**Q: CORS error?**
- A: Pastikan ada header `Access-Control-Allow-Origin: *`

**Q: Dashboard loading lama?**
- A: Normal di awal. Coba refresh atau pakai browser lain.

---

**Next:** [Lab 2 - Vercel Deployment](../lab2-vercel/README.md)

**Cloudflare is POWERFUL! ☁️ Selamat mencoba!**
