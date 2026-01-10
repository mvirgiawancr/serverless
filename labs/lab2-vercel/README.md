# Lab 2: Vercel - Deploy Full-Stack Next.js App

## 🎯 Tujuan
Deploy Next.js application dengan serverless API routes ke Vercel (continuous deployment dari GitHub).

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- GitHub Account - [Sign up di sini](https://github.com)
- Vercel Account - [Sign up dengan GitHub](https://vercel.com/signup)
- Node.js 18+ installed
- Git installed

## 🚀 Apa yang Akan Kita Buat?
Next.js app dengan:
- Landing page sederhana
- Serverless API route untuk get data 
- Deploy otomatis via GitHub (Git push → Auto deploy!)

## 📝 Step-by-Step Guide

### Step 1: Clone Starter Code (2 menit)

```bash
cd labs/lab2-vercel
npm install
```

### Step 2: Explore Project Structure (2 menit)

```
lab2-vercel/
├── app/
│   ├── page.jsx          # Homepage
│   ├── layout.jsx        # Root layout
│   └── api/
│       ├── hello/
│       │   └── route.js  # GET /api/hello
│       └── data/
│           └── route.js  # GET /api/data
├── package.json
└── README.md
```

**Serverless API Routes di Next.js:**
- File di folder `app/api/` otomatis jadi API endpoints
- `app/api/hello/route.js` → accessible di `/api/hello`

### Step 3: Jalankan Development Server (2 menit)

```bash
npm run dev
```

Buka browser: http://localhost:3000

✅ Anda harus lihat:
- Homepage dengan UI menarik
- Button untuk test API

Test API endpoints:
- http://localhost:3000/api/hello
- http://localhost:3000/api/data

### Step 4: Push ke GitHub (5 menit)

1. **Create new GitHub repository:**
   - Buka https://github.com/new
   - Repository name: `serverless-workshop-vercel`
   - Visibility: Public atau Private (terserah)
   - **JANGAN** centang "Add README"
   - Klik **Create repository**

2. **Push code ke GitHub:**

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Next.js serverless app"

# Add remote origin (ganti dengan URL repository kalian!)
git remote add origin https://github.com/YOUR_USERNAME/serverless-workshop-vercel.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ Refresh halaman GitHub, code sudah ada!

### Step 5: Deploy ke Vercel (8 menit)

1. **Login ke Vercel:**
   - Buka https://vercel.com
   - Klik **Login** / **Sign Up**
   - Login dengan **GitHub account** kalian

2. **Import Project:**
   - Di Vercel dashboard, klik **Add New... → Project**
   - Pilih **Import Git Repository**
   - Authorize Vercel untuk akses GitHub kalian
   - Pilih repository `serverless-workshop-vercel`

3. **Configure Project:**
   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: ./
   Build Command: npm run build (auto-filled)
   Output Directory: (leave default)
   ```

4. **Environment Variables:**
   - (Untuk demo ini tidak perlu, skip)

5. **Klik Deploy!** 🚀

6. **Tunggu 1-2 menit...**
   - Vercel akan build dan deploy app kalian
   - Anda akan lihat build logs real-time
   - ✅ Deployment sukses!

### Step 6: Test Deployed App (3 menit)

Setelah deploy sukses:

1. Klik **Visit** atau buka URL deployment (contoh: `https://serverless-workshop-vercel.vercel.app`)

2. ✅ App kalian sudah live di internet!

3. **Test API endpoints:**
   - `https://YOUR-APP.vercel.app/api/hello`
   - `https://YOUR-APP.vercel.app/api/data`

### Step 7: Continuous Deployment Demo (3 menit)

Sekarang kita test **auto-deploy** saat push ke GitHub:

1. **Edit file `app/api/hello/route.js`:**

```javascript
export async function GET(request) {
    return Response.json({
        message: 'Hello dari Vercel Serverless! (Updated)',  // ← Tambah (Updated)
        timestamp: new Date().toISOString(),
        version: '2.0'  // ← Tambah version
    });
}
```

2. **Commit & Push:**

```bash
git add .
git commit -m "Update API response"
git push
```

3. **Buka Vercel dashboard:**
   - Anda akan lihat deployment baru otomatis triggered!
   - Tunggu build selesai (~30 detik)
   - ✅ Changes sudah live!

4. **Test lagi:**
   ```
   https://YOUR-APP.vercel.app/api/hello
   ```
   ✅ Response sudah updated!

## 🎉 Selamat!

Anda baru saja deploy full-stack app dengan serverless API + continuous deployment!

## 📊 Features Vercel

- ✅ **Unlimited deployments** (free)
- ✅ **Auto SSL certificate** (HTTPS otomatis)
- ✅ **Global CDN** (fast worldwide)
- ✅ **Preview deployments** untuk setiap PR
- ✅ **Analytics & monitoring**

## 💰 Vercel Pricing

**Hobby Plan (Free):**
- Unlimited projects & deployments
- 100 GB bandwidth/month
- Serverless functions: 100 GB-hours

**Pro Plan ($20/month):**
- Team collaboration
- More bandwidth & compute
- Advanced analytics

## 🔗 Custom Domain (Bonus)

Jika punya domain sendiri:
1. Di Vercel dashboard → Settings → Domains
2. Add domain (e.g., `myapp.com`)
3. Update DNS records sesuai instruksi
4. ✅ App accessible di domain kalian!

## ❓ Troubleshooting

**Q: Build failed dengan error "Module not found"?**
- A: Pastikan `npm install` sudah dijalankan dan `package-lock.json` ter-commit

**Q: API route return 404?**
- A: Pastikan file ada di `app/api/[route-name]/route.js` (Next.js 13+ App Router)

**Q: Git push gagal authentication?**
- A: Gunakan Personal Access Token (GitHub Settings → Developer settings → Tokens)

---

**Next:** [Lab 3 - Firebase Functions](../lab3-firebase/README.md)
