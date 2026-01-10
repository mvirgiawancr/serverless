# Lab 1: AWS Lambda - REST API Serverless

## 🎯 Tujuan
Membuat serverless REST API menggunakan AWS Lambda dan API Gateway yang dapat merespons HTTP requests.

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- AWS Account (Free Tier) - [Sign up di sini](https://aws.amazon.com/free/)
- Browser untuk akses AWS Console

## 🚀 Apa yang Akan Kita Buat?
REST API sederhana dengan endpoints:
- `GET /hello` - Mengembalikan pesan hello world
- `POST /user` - Menerima data user dan mengembalikan response

## 📝 Step-by-Step Guide

### Step 1: Login ke AWS Console (2 menit)
1. Buka https://console.aws.amazon.com
2. Login dengan AWS account kalian
3. Pastikan region di kanan atas sudah dipilih (recommended: **ap-southeast-1** - Singapore)

### Step 2: Buat Lambda Function (5 menit)

1. **Cari Lambda service:**
   - Di search bar atas, ketik "Lambda"
   - Klik **Lambda** di hasil pencarian

2. **Create Function:**
   - Klik tombol **Create function** (orange button)
   - Pilih **Author from scratch**
   
3. **Function Configuration:**
   ```
   Function name: hello-world-api
   Runtime: Node.js 20.x
   Architecture: x86_64
   ```

4. **Execution Role:**
   - Pilih: **Create a new role with basic Lambda permissions**
   - (Lambda akan auto-create IAM role untuk kita)

5. **Klik Create function** (bawah halaman)

### Step 3: Tulis Function Code (5 menit)

1. Scroll ke bagian **Code source**
2. Anda akan lihat default code `index.mjs`
3. **Replace semua code** dengan code berikut:

```javascript
export const handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    // Get HTTP method and path
    const httpMethod = event.httpMethod || event.requestContext?.http?.method;
    const path = event.path || event.rawPath;
    
    // GET /hello endpoint
    if (httpMethod === 'GET' && path === '/hello') {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Hello dari AWS Lambda!',
                timestamp: new Date().toISOString(),
                region: process.env.AWS_REGION
            })
        };
    }
    
    // POST /user endpoint
    if (httpMethod === 'POST' && path === '/user') {
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
    }
    
    // 404 for other routes
    return {
        statusCode: 404,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            error: 'Not Found',
            message: `Route ${httpMethod} ${path} not found`
        })
    };
};
```

4. Klik **Deploy** (tombol orange di atas code editor)
5. Tunggu sampai muncul notifikasi "Successfully deployed"

### Step 4: Test Lambda Function (3 menit)

1. Klik tab **Test** (di sebelah Code)
2. **Create new test event:**
   ```
   Event name: test-get-hello
   ```
3. **Template:** Pilih "API Gateway AWS Proxy"
4. **Replace test event JSON** dengan:

```json
{
  "httpMethod": "GET",
  "path": "/hello",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

5. Klik **Save**
6. Klik **Test** (tombol orange)
7. ✅ Response harus sukses dengan status code 200!

### Step 5: Buat API Gateway (7 menit)

Sekarang kita perlu expose Lambda function ke internet menggunakan API Gateway:

1. **Scroll ke atas** ke section **Function overview**
2. Klik **Add trigger**
3. **Select trigger:** Pilih **API Gateway**
4. **Configuration:**
   ```
   Intent: Create a new API
   API type: HTTP API
   Security: Open
   ```
5. Klik **Add**

6. **Tunggu beberapa detik**, kemudian:
   - Di section **Triggers**, klik API Gateway yang baru dibuat
   - Anda akan lihat **API endpoint** URL (copy ini!)
   - Contoh: `https://abc123xyz.execute-api.ap-southeast-1.amazonaws.com/default/hello-world-api`

### Step 6: Test API dengan Browser/Postman (3 menit)

#### Test GET /hello

**Option 1: Browser**
1. Buka browser baru
2. Paste API endpoint + `/hello`
   ```
   https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/default/hello-world-api/hello
   ```
3. ✅ Anda harus lihat response JSON!

**Option 2: Postman/Thunder Client**
1. Buat GET request ke URL di atas
2. Send request
3. ✅ Status 200 + JSON response

#### Test POST /user

**Gunakan Postman/Thunder Client:**
1. Buat POST request ke:
   ```
   https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/default/hello-world-api/user
   ```
2. **Body** (JSON):
   ```json
   {
     "name": "Budi Santoso",
     "email": "budi@example.com"
   }
   ```
3. Send request
4. ✅ Status 201 + User data dengan ID generated!

## 🎉 Selamat!

Anda baru saja membuat REST API serverless pertama Anda dengan AWS Lambda!

## 📊 Monitoring & Logs

Untuk lihat logs dan monitoring:
1. Di Lambda console, klik tab **Monitor**
2. Klik **View CloudWatch logs**
3. Anda akan lihat semua execution logs

## 💰 Biaya

AWS Lambda Free Tier:
- 1 juta requests gratis per bulan
- 400,000 GB-seconds compute time
- API Gateway: 1 juta API calls gratis per bulan (12 bulan pertama)

## 🧹 Cleanup (Optional)

Jika ingin hapus resources setelah workshop:
1. Hapus API Gateway trigger di Lambda function
2. Delete Lambda function
3. Delete CloudWatch Log Group

## 🔗 Resources
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [API Gateway Docs](https://docs.aws.amazon.com/apigateway/)

## ❓ Troubleshooting

**Q: API endpoint return 403 Forbidden?**
- A: Pastikan API Gateway security setting = "Open" (bukan API Key)

**Q: Lambda return 502 Bad Gateway?**
- A: Check response format harus ada `statusCode`, `headers`, dan `body`

**Q: CORS error di browser?**
- A: Pastikan header `Access-Control-Allow-Origin: *` ada di response

---

**Next:** [Lab 2 - Vercel Deployment](../lab2-vercel/README.md)
