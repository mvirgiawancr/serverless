# Lab 4: Integration & Testing - Connecting Frontend to Serverless

## 🎯 Tujuan
Memahami cara mengintegrasikan frontend application dengan serverless backends yang telah dibuat.

## ⏱️ Durasi: 15 Menit
- Quick demonstration of client-server interaction
- Testing serverless APIs dari berbagai clients

## 📋 Prerequisites
- Sudah menyelesaikan minimal 1 lab sebelumnya (AWS Lambda atau Vercel)
- Browser modern (Chrome/Firefox/Edge)
- Optional: Postman atau Thunder Client

## 🚀 Apa yang Akan Kita Buat?
Simple HTML page yang:
- Memanggil serverless API endpoints
- Menampilkan response data
- Handle errors

## 📝 Integration Examples

### Example 1: Fetch API (Modern JavaScript)

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serverless API Integration</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        button {
            background: #4a90e2;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 10px;
        }
        button:hover {
            background: #357abd;
        }
        pre {
            background: #1a1a2e;
            color: #e8e8e8;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        .loading {
            color: #4a90e2;
            font-style: italic;
        }
        .error {
            color: #e74c3c;
            background: #fadbd8;
            padding: 15px;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🌐 Serverless API Integration Demo</h1>
        <p>Test serverless endpoints yang sudah kita deploy:</p>
        
        <h3>AWS Lambda API:</h3>
        <input type="text" id="lambdaUrl" placeholder="Paste Lambda API URL" style="width: 100%; padding: 10px; margin-bottom: 10px;">
        <button onclick="testLambdaAPI()">Test GET /hello</button>
        <button onclick="testLambdaPost()">Test POST /user</button>
        
        <h3 style="margin-top: 30px;">Vercel API:</h3>
        <input type="text" id="vercelUrl" placeholder="Paste Vercel App URL" style="width: 100%; padding: 10px; margin-bottom: 10px;">
        <button onclick="testVercelHello()">Test /api/hello</button>
        <button onclick="testVercelData()">Test /api/data</button>
    </div>

    <div class="card" id="resultCard" style="display: none;">
        <h3>Response:</h3>
        <div id="result"></div>
    </div>

    <script>
        // Helper function to display results
        function displayResult(data, status = 'success') {
            const resultCard = document.getElementById('resultCard');
            const resultDiv = document.getElementById('result');
            
            resultCard.style.display = 'block';
            
            if (status === 'loading') {
                resultDiv.innerHTML = '<p class="loading">Loading...</p>';
            } else if (status === 'error') {
                resultDiv.innerHTML = `<div class="error">❌ Error: ${data}</div>`;
            } else {
                resultDiv.innerHTML = `
                    <p style="color: #27ae60; font-weight: 600;">✅ Success!</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            }
        }

        // AWS Lambda Tests
        async function testLambdaAPI() {
            const url = document.getElementById('lambdaUrl').value;
            if (!url) {
                alert('Please paste your Lambda API URL first!');
                return;
            }

            displayResult(null, 'loading');

            try {
                const response = await fetch(`${url}/hello`);
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayResult(error.message, 'error');
            }
        }

        async function testLambdaPost() {
            const url = document.getElementById('lambdaUrl').value;
            if (!url) {
                alert('Please paste your Lambda API URL first!');
                return;
            }

            displayResult(null, 'loading');

            try {
                const response = await fetch(`${url}/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'Test User',
                        email: 'test@example.com'
                    })
                });
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayResult(error.message, 'error');
            }
        }

        // Vercel Tests
        async function testVercelHello() {
            const url = document.getElementById('vercelUrl').value;
            if (!url) {
                alert('Please paste your Vercel App URL first!');
                return;
            }

            displayResult(null, 'loading');

            try {
                const response = await fetch(`${url}/api/hello`);
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayResult(error.message, 'error');
            }
        }

        async function testVercelData() {
            const url = document.getElementById('vercelUrl').value;
            if (!url) {
                alert('Please paste your Vercel App URL first!');
                return;
            }

            displayResult(null, 'loading');

            try {
                const response = await fetch(`${url}/api/data`);
                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayResult(error.message, 'error');
            }
        }
    </script>
</body>
</html>
```

### Simpan sebagai `integration-test.html` dan buka di browser!

## 🧪 Testing Methods

### 1. Browser DevTools

```javascript
// Open browser console (F12) dan test langsung:
fetch('https://your-api-url.com/hello')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 2. cURL (Command Line)

```bash
# GET request
curl https://your-api-url.com/hello

# POST request with JSON body
curl -X POST https://your-api-url.com/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Budi","email":"budi@example.com"}'
```

### 3. Postman / Thunder Client

**Steps:**
1. Create new request
2. Set method (GET/POST)
3. Paste URL
4. Add headers (if needed):
   ```
   Content-Type: application/json
   ```
5. Add body (for POST):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com"
   }
   ```
6. Send request ✅

## 🎯 Best Practices

### Error Handling

```javascript
async function callAPI() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        // Check HTTP status
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('API Error:', error);
        // Handle error gracefully (show user-friendly message)
    }
}
```

### Loading States

```javascript
function MyComponent() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {loading ? 'Loading...' : JSON.stringify(data)}
        </div>
    );
}
```

### CORS Handling

Jika API dan frontend di domain berbeda, backend perlu set CORS headers:

```javascript
// AWS Lambda
return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',  // atau specific domain
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(data)
};
```

## 🎉 Selamat!

Anda sudah memahami cara mengintegrasikan frontend dengan serverless backends!

## 📊 Key Takeaways

- Serverless APIs diakses seperti REST API biasa (via HTTP)
- Fetch API adalah cara modern untuk HTTP requests di browser
- Error handling dan loading states penting untuk UX
- CORS headers diperlukan untuk cross-origin requests
- Testing bisa dilakukan via browser, command line, atau API clients

---

## 🔗 Complete Workshop Resources

- [Lab 1: AWS Lambda](../lab1-aws-lambda/README.md)
- [Lab 2: Vercel Deployment](../lab2-vercel/README.md)
- [Lab 3: Firebase Functions](../lab3-firebase/README.md)
- [Setup Guide](../../SETUP_GUIDE.md)
