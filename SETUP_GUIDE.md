# Setup Guide - Workshop Serverless Cloud Computing

## 📋 Prerequisites Checklist

Sebelum workshop dimulai, pastikan Anda sudah menyiapkan hal-hal berikut:

### ✅ Software Requirements

#### 1. **Node.js (v18 atau lebih baru)**
- Download: https://nodejs.org
- Verifikasi instalasi:
  ```bash
  node --version
  npm --version
  ```
- Output yang diharapkan: `v18.x.x` atau lebih baru

#### 2. **Git**
- Download: https://git-scm.com/downloads
- Verifikasi:
  ```bash
  git --version
  ```

#### 3. **Code Editor**
- **Recommended:** Visual Studio Code - https://code.visualstudio.com
- Alternatif: Sublime Text, Atom, atau editor favorit Anda

#### 4. **Browser Modern**
- Chrome, Firefox, atau Edge (untuk akses cloud consoles)

---

## ☁️ Cloud Accounts Setup

### 1. AWS Account

**Untuk Lab 1: AWS Lambda**

1. **Sign up:**
   - Kunjungi: https://aws.amazon.com/free/
   - Klik "Create a Free Account"

2. **Information needed:**
   - Email address
   - Password
   - Credit/debit card (tidak akan di-charge jika dalam free tier limits)
   - Phone number (untuk verifikasi)

3. **Free Tier Benefits:**
   - 1 juta Lambda requests gratis per bulan (permanent)
   - 1 juta API Gateway requests gratis (12 bulan pertama)
   - Lebih dari cukup untuk workshop ini!

4. **Post-signup:**
   - Login ke: https://console.aws.amazon.com
   - Pilih region: **ap-southeast-1 (Singapore)**

---

### 2. GitHub Account

**Untuk Lab 2: Vercel Deployment**

1. **Sign up:**
   - Kunjungi: https://github.com
   - Klik "Sign up" (jika belum punya account)

2. **GitHub CLI (Optional):**
   ```bash
   # Install GitHub CLI for easier authentication
   # Windows: winget install GitHub.cli
   # Mac: brew install gh
   gh auth login
   ```

---

### 3. Vercel Account

**Untuk Lab 2: Vercel Deployment**

1. **Sign up:**
   - Kunjungi: https://vercel.com/signup
   - **Pilih:** "Continue with GitHub" (recommended)
   - Authorize Vercel untuk akses GitHub repos

2. **Free Tier:**
   - Unlimited projects
   - Unlimited deployments
   - 100 GB bandwidth per bulan
   - Perfect untuk workshop dan personal projects!

---

### 4. Firebase / Google Cloud

**Untuk Lab 3: Firebase Functions**

1. **Prerequisites:**
   - Google Account (Gmail)

2. **Firebase Console:**
   - Kunjungi: https://console.firebase.google.com
   - Login dengan Google account
   - **Jangan create project dulu**, akan dilakukan saat workshop

3. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

4. **Verifikasi:**
   ```bash
   firebase --version
   ```

5. **Login (opsional, bisa dilakukan saat workshop):**
   ```bash
   firebase login
   ```

---

## 🛠️ Pre-Workshop Installation

### Install Firebase CLI dan Vercel CLI (Optional)

```bash
# Firebase CLI (untuk Lab 3)
npm install -g firebase-tools

# Vercel CLI (optional, untuk Lab 2)
npm install -g vercel
```

---

## 📥 Download Workshop Materials

Workshop materials akan tersedia di GitHub repository.

**Option 1: Clone Repository**
```bash
git clone <repository-url>
cd serverless-workshop
```

**Option 2: Download ZIP**
- Kunjungi repository page
- Klik "Code" → "Download ZIP"
- Extract ke folder pilihan Anda

---

## 🧪 Test Your Setup

Jalankan tes berikut untuk memastikan semuanya siap:

### 1. Node.js Test
```bash
node -e "console.log('Node.js ready! Version:', process.version)"
```

### 2. npm Test
```bash
npm -v
```

### 3. Git Test
```bash
git --version
```

### 4. Firebase CLI Test (jika sudah install)
```bash
firebase --version
```

---

## 🔐 Security Notes

### AWS Credentials
- **Jangan hardcode** AWS credentials di kode
- Gunakan IAM roles dan environment variables
- Aktifkan MFA (Multi-Factor Authentication) untuk keamanan

### API Keys
- Jangan commit API keys ke Git
- Gunakan `.env` file dan tambahkan ke `.gitignore`
- Gunakan environment variables di cloud platforms

---

## 💰 Cost Management

### AWS
- Stay dalam **Free Tier** limits
- Set up **billing alerts** di AWS Console:
  - Billing Dashboard → Budgets → Create budget
  - Set alert untuk $1-$5 untuk notifikasi dini

### Firebase
- **Spark Plan (Free)** cukup untuk workshop
- Jika diminta upgrade ke Blaze Plan:
  - Tetap gratis selama tidak exceed free tier quota
  - Untuk workshop ini, usage akan sangat minimal

### Vercel
- **Hobby Plan (Free)** unlimited untuk personal use
- Tidak perlu kartu kredit

---

## ❓ Troubleshooting Common Issues

### Issue: npm command not found
**Solution:**
- Restart terminal after installing Node.js
- Add Node.js to PATH (biasanya auto saat install)

### Issue: firebase login gagal
**Solution:**
```bash
firebase login --no-localhost
```
- Follow instruksi di terminal

### Issue: Git credential issues
**Solution:**
```bash
# Setup Git credentials
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Issue: AWS region salah
**Solution:**
- Di AWS Console, kanan atas, pilih region **ap-southeast-1 (Singapore)**
- Semua resources harus di region yang sama

---

## 📞 Workshop Support

Jika mengalami kendala saat setup:
1. Check troubleshooting section di atas
2. Google error message yang muncul
3. Tanyakan saat workshop (ada sesi Q&A)
4. Dokumentasi official:
   - AWS: https://docs.aws.amazon.com
   - Vercel: https://vercel.com/docs
   - Firebase: https://firebase.google.com/docs

---

## ✅ Final Checklist

Sebelum workshop, pastikan:

- [ ] Node.js v18+ terinstall
- [ ] Git terinstall
- [ ] Code editor (VS Code) terinstall
- [ ] Browser modern siap
- [ ] AWS Account created dan bisa login
- [ ] GitHub Account created
- [ ] Vercel Account created (connected ke GitHub)
- [ ] Firebase CLI terinstall
- [ ] Workshop materials di-download/clone

**Jika semua sudah ✅, Anda siap untuk workshop!** 🚀

---

## 📚 Optional Pre-Reading

Untuk pemahaman lebih dalam (optional):

- **Cloud Computing Basics:**
  - NIST Definition of Cloud Computing: https://csrc.nist.gov/publications/detail/sp/800-145/final

- **Serverless:**
  - AWS Lambda Developer Guide: https://docs.aws.amazon.com/lambda/
  - Serverless Framework: https://www.serverless.com/framework/docs

- **Modern JavaScript:**
  - Async/Await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

**Sampai jumpa di workshop!** 🎓
