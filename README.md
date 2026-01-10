# Workshop Serverless Cloud Computing - UBSI 2026

![Cloud Computing](https://img.shields.io/badge/Cloud-Serverless-blue)
![Workshop](https://img.shields.io/badge/Workshop-UBSI%202026-green)

Materi lengkap workshop **Cloud Computing dan Serverless Architecture**.

## 📅 Event Details

- **Tanggal**: 14 Januari 2026
- **Narasumber**: Assoc. Prof. Dr. Irawan Aprianto, ST, MT

## 📚 Struktur Workshop

### Part 1: Paparan Konseptual (30 menit)
Fondasi intelektual cloud computing dan serverless architecture:
- Masalah klasik deployment aplikasi
- Cloud computing sebagai paradigma
- Evolusi arsitektur: Monolithic → Microservices → Serverless
- Event-driven architecture
- Trade-offs dan best practices

**📊 Materi:** [workshop_presentation.html](./workshop_presentation.html)

### Part 2: Hands-On Labs (90 menit)

#### Lab 1: AWS Lambda - REST API Serverless (25 min)
Membuat serverless REST API menggunakan AWS Lambda dan API Gateway.
- 📁 [Lab Guide](./labs/lab1-aws-lambda/README.md)
- 💻 [Starter Code](./labs/lab1-aws-lambda/index.mjs)

#### Lab 2: Vercel - Deploy Full-Stack App (25 min)
Deploy Next.js application dengan serverless API routes ke Vercel.
- 📁 [Lab Guide](./labs/lab2-vercel/README.md)
- 💻 [Starter Code](./labs/lab2-vercel/)

#### Lab 3: Firebase Functions - Event-Driven (25 min)
Membuat cloud function yang triggered oleh database events.
- 📁 [Lab Guide](./labs/lab3-firebase/README.md)

#### Lab 4: Integration & Testing (15 min)
Menghubungkan frontend dengan serverless backends.
- 📁 [Lab Guide](./labs/lab4-integration/README.md)
- 🧪 [Testing Tool](./labs/lab4-integration/integration-test.html)

## 🚀 Quick Start

### Prerequisites
Lihat [Setup Guide](./SETUP_GUIDE.md) untuk detail lengkap.

**Software:**
- Node.js v18+
- Git
- Code editor (VS Code recommended)

**Cloud Accounts (Free Tier):**
- AWS Account
- GitHub Account
- Vercel Account
- Firebase/Google Account

### Clone Repository

```bash
git clone https://github.com/mvirgiawancr/serverless.git
cd serverless
```

### Test Setup

```bash
# Check Node.js
node --version

# Check Git
git --version

# Install Firebase CLI
npm install -g firebase-tools
```

## 🎯 Learning Objectives

Setelah workshop ini, peserta akan:
- ✅ Memahami konsep cloud computing dan serverless architecture
- ✅ Mampu deploy aplikasi ke AWS Lambda, Vercel, dan Firebase
- ✅ Memahami event-driven architecture
- ✅ Dapat mengintegrasikan frontend dengan serverless backends
- ✅ Mengerti trade-offs dan use cases serverless

## 📁 Repository Structure

```
serverless-workshop/
├── workshop_presentation.html    # Slide presentasi
├── SETUP_GUIDE.md               # Panduan setup prerequisites
├── README.md                    # File ini
└── labs/
    ├── lab1-aws-lambda/
    │   ├── README.md           # Step-by-step guide
    │   └── index.mjs           # Lambda function code
    ├── lab2-vercel/
    │   ├── README.md
    │   ├── package.json
    │   └── app/                # Next.js app
    ├── lab3-firebase/
    │   └── README.md
    └── lab4-integration/
        ├── README.md
        └── integration-test.html
```

## 🔗 Resources

### Platform Documentation
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Functions Docs](https://firebase.google.com/docs/functions)

### Learning Resources
- [NIST Cloud Computing Definition](https://csrc.nist.gov/publications/detail/sp/800-145/final)
- [Serverless Architecture Patterns](https://www.serverless.com/blog/serverless-architecture-patterns)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [Thunder Client](https://www.thunderclient.com/) - VS Code API client

## ❓ FAQ

**Q: Apakah workshop ini gratis?**  
A: Ya, semua platform yang digunakan memiliki free tier yang sangat generous.

**Q: Apakah perlu pengalaman cloud sebelumnya?**  
A: Tidak. Workshop ini dirancang untuk pemula yang baru pertama kali deployment ke cloud.

**Q: Apakah materi bisa diakses setelah workshop?**  
A: Ya, semua materi tersedia di repository ini dan bisa diakses kapan saja.

**Q: Bagaimana jika saya stuck saat mengikuti lab?**  
A: Ada sesi Q&A dan troubleshooting. Juga bisa baca troubleshooting guide di setiap lab README.

## 💰 Cost Considerations

**AWS Lambda:**
- Free tier: 1M requests/month (permanent)
- Workshop usage: < 100 requests
- **Cost: $0**

**Vercel:**
- Hobby plan: Unlimited projects
- **Cost: $0**

**Firebase:**
- Spark plan: 125K invocations/month
- Workshop usage: < 50 invocations
- **Cost: $0**

**Total: $0** 🎉

## 🤝 Support

Jika ada pertanyaan atau issue:
1. Check troubleshooting di masing-masing lab README
2. Lihat [Setup Guide](./SETUP_GUIDE.md)
3. Tanya saat workshop (Q&A session)

## 📜 License

Workshop materials untuk keperluan edukasi

---

**Happy Learning! 🚀**
