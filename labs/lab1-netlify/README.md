# Lab 1: Netlify Functions - REST API Serverless

## 🎯 Tujuan
Membuat serverless REST API menggunakan Netlify Functions yang dapat merespons HTTP requests dengan deployment otomatis dari GitHub.

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- Akun GitHub
- Akun Netlify (gratis, tanpa kartu kredit) - [Sign up di sini](https://app.netlify.com/signup)

## 🚀 Apa yang Akan Kita Buat?
REST API sederhana dengan endpoints:
- `GET /hello` - Mengembalikan pesan hello world
- `POST /user` - Menerima data user dan mengembalikan response

## 📝 Step-by-Step Guide

### Step 1: Sign Up Netlify (2 menit)
1. Buka https://app.netlify.com/signup
2. Pilih **"Sign up with GitHub"**
3. Authorize Netlify untuk mengakses GitHub Anda
4. ✅ Gratis, tanpa perlu kartu kredit!

### Step 2: Fork Starter Repository (2 menit)

1. Buka repository starter: **[netlify-functions-starter](https://github.com/YOUR-WORKSHOP-REPO/netlify-functions-starter)**
2. Klik tombol **Fork** di kanan atas
3. Fork ke akun GitHub Anda sendiri

### Step 3: Deploy ke Netlify (5 menit)

1. **Di Netlify Dashboard:**
   - Klik **"Add new site"** → **"Import an existing project"**
   
2. **Connect to Git Provider:**
   - Pilih **GitHub**
   - Authorize  Netlify jika diminta
   - Pilih repository yang baru di-fork

3. **Configure Build Settings:**
   ```
   Build command: (kosongkan)
   Publish directory: public (atau . jika tidak ada folder public)
   ```

4. **Klik "Deploy site"**
   - Tunggu 30-60 detik
   - ✅ Site sudah live!

5. **Copy Site URL:**
   - Contoh: `https://your-site-name-123abc.netlify.app`

### Step 4: Buat Netlify Function (8 menit)

1. **Di repository lokal Anda (clone dulu jika belum):**
   ```bash
   git clone https://github.com/YOUR-USERNAME/netlify-functions-starter.git
   cd netlify-functions-starter
   ```

2. **Buat folder untuk functions:**
   ```bash
   mkdir -p netlify/functions
   ```

3. **Buat file `netlify/functions/hello.js`** dengan code berikut:

```javascript
exports.handler = async (event, context) => {
    console.log('Function invoked:', event.path);
    
    const httpMethod = event.httpMethod;
    const path = event.path;
    
    // GET /hello endpoint
    if (httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Hello dari Netlify Functions!',
                timestamp: new Date().toISOString(),
                region: process.env.AWS_REGION || 'us-east-1'
            })
        };
    }
    
    // 404 for other methods
    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
    };
};
```

4. **Buat file `netlify/functions/user.js`** untuk POST endpoint:

```javascript
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    
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
};
```

5. **Commit & Push ke GitHub:**
   ```bash
   git add netlify/
   git commit -m "Add Netlify Functions"
   git push origin main
   ```

6. **Netlify akan auto-deploy!**
   - Buka Netlify Dashboard
   - Lihat di tab **Deploys** → Build sedang berjalan
   - Tunggu hingga status "Published"

### Step 5: Test Functions (5 menit)

#### Test GET /hello

**Di Browser:**
1. Buka: `https://YOUR-SITE.netlify.app/.netlify/functions/hello`
2. ✅ Anda harus lihat response JSON!

**Menggunakan curl:**
```bash
curl https://YOUR-SITE.netlify.app/.netlify/functions/hello
```

#### Test POST /user

**Menggunakan curl:**
```bash
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Virgi","email":"virgi@example.com"}'
```

**Menggunakan Postman/Thunder Client:**
1. POST ke: `https://YOUR-SITE.netlify.app/.netlify/functions/user`
2. Body (JSON):
   ```json
   {
     "name": "Virgi",
     "email": "virgi@example.com"
   }
   ```
3. Send request
4. ✅ Status 201 + User data!

### Step 6: Lihat Logs (3 menit)

1. Di Netlify Dashboard → Pilih site Anda
2. Klik tab **Functions**
3. Klik salah satu function (`hello` atau `user`)
4. Scroll ke bawah → Lihat **Function logs**
5. Setiap request akan tercatat di sini!

## 🎉 Selamat!

Anda baru saja membuat REST API serverless pertama Anda dengan Netlify Functions!

## ✨ Keunggulan Netlify Functions

- ✅ **Gratis tanpa kartu kredit** (125k requests/month)
- ✅ **Auto deploy** dari GitHub push  
- ✅ **Built on AWS Lambda** (sama powerful, lebih mudah)
- ✅ **Instant rollback** jika ada error
- ✅ **Environment variables** support

## 💰 Biaya

Netlify Free Tier:
- 125,000 requests per bulan
- 100 hours eksekusi per bulan
- Bandwidth 100GB per bulan

## 🧹 Cleanup (Optional)

Jika ingin hapus resources:
1. Di Netlify Dashboard → Site Settings
2. Scroll bawah → **Delete site**

## 🔗 Resources
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

## ❓ Troubleshooting

**Q: Function return 404?**
- A: Pastikan folder structure `netlify/functions/` benar
- A: Cek nama file function (case-sensitive)

**Q: Function tidak update setelah push?**
- A: Tunggu deploy selesai (cek tab Deploys)
- A: Hard refresh browser (Ctrl+Shift+R)

**Q: CORS error?**
- A: Pastikan header `Access-Control-Allow-Origin: *` ada di response

---

**Next:** [Lab 2 - Vercel Deployment](../lab2-vercel/README.md)
