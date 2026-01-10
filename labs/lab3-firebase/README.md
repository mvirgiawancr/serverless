# Lab 3: Firebase Functions - Event-Driven Serverless

## 🎯 Tujuan
Membuat cloud function yang otomatis triggered saat ada event (misal: data baru di database).

## ⏱️ Durasi: 25 Menit
- 5-10 menit: Demo oleh presenter
- 15-20 menit: Hands-on practice

## 📋 Prerequisites
- Google Account - [Sign up di sini](https://accounts.google.com)
- Node.js 18+ installed
- Firebase CLI: `npm install -g firebase-tools`

## 🚀 Apa yang Akan Kita Buat?
Cloud Function yang:
- Triggered saat user baru signup (Firestore onCreate)
- Otomatis kirim welcome notification
- Log activity ke console

## 📝 Step-by-Step Guide

### Step 1: Setup Firebase Project (5 menit)

1. **Buka Firebase Console:**
   - https://console.firebase.google.com
   - Klik **Add project**

2. **Create Project:**
   ```
   Project name: serverless-workshop-ubsi
   ```
   - Klik **Continue**
   - (Optional) Disable Google Analytics atau enable jika mau
   - Klik **Create project**
   - Tunggu ~30 detik sampai selesai

3. **Enable Firestore Database:**
   - Di sidebar, klik **Build → Firestore Database**
   - Klik **Create database**
   - Mode: **Start in test mode** (untuk demo)
   - Location: **asia-southeast1** (Singapore)
   - Klik **Enable**

### Step 2: Login Firebase CLI (2 menit)

```bash
# Login ke Firebase
firebase login

# Akan membuka browser untuk login
# Login dengan Google account yang sama dengan Firebase Console
```

✅ Setelah login sukses, kembali ke terminal

### Step 3: Initialize Firebase Project (3 menit)

```bash
cd labs/lab3-firebase

# Initialize Firebase
firebase init
```

**Pilihan saat init:**
```
? Which Firebase features do you want to set up?
→ Pilih: ◉ Functions (space untuk select)

? Please select an option:
→ Use an existing project

? Select a project:
→ Pilih: serverless-workshop-ubsi

? What language would you like to use?
→ JavaScript

? Do you want to use ESLint?
→ No (untuk simplicity)

? Do you want to install dependencies with npm now?
→ Yes
```

✅ Firebase project initialized!

### Step 4: Tulis Cloud Function (8 menit)

1. **Buka file `functions/index.js`**

2. **Replace semua code** dengan:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// Cloud Function: Triggered saat user baru dibuat di Firestore
exports.onUserCreated = functions
  .region('asia-southeast1')
  .firestore
  .document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId;
    const userData = snapshot.data();

    console.log(`🎉 New user created: ${userId}`);
    console.log('User data:', userData);

    // Simulate sending welcome email/notification
    const welcomeMessage = {
      to: userData.email,
      subject: 'Welcome to Our Platform!',
      body: `Hi ${userData.name}, thank you for signing up!`,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save welcome message to 'notifications' collection
    await admin.firestore().collection('notifications').add({
      userId: userId,
      type: 'welcome',
      message: welcomeMessage,
      status: 'sent',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Welcome notification sent to ${userData.email}`);

    return null;
  });

// HTTP Callable Function: Manual trigger untuk testing
exports.createUserManual = functions
  .region('asia-southeast1')
  .https.onRequest(async (req, res) => {
    const { name, email } = req.query;

    if (!name || !email) {
      res.status(400).send({ error: 'Name and email required' });
      return;
    }

    // Add user to Firestore (will trigger onUserCreated)
    const userRef = await admin.firestore().collection('users').add({
      name: name,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.send({
      success: true,
      message: 'User created! Cloud function will be triggered.',
      userId: userRef.id,
    });
  });
```

3. **Save file**

### Step 5: Deploy Functions (5 menit)

```bash
# Deploy functions ke Firebase
firebase deploy --only functions
```

**Output:**
```
✔ functions: Finished running npm script
✔ Deploy complete!

Functions:
  onUserCreated: https://asia-southeast1-...
  createUserManual: https://asia-southeast1-...cloudfunctions.net/createUserManual
```

✅ Copy URL `createUserManual` untuk testing!

### Step 6: Test Cloud Function (5 menit)

#### Option 1: Test via HTTP Request

**Buka browser atau Postman:**
```
https://asia-southeast1-YOUR-PROJECT.cloudfunctions.net/createUserManual?name=Budi&email=budi@example.com
```

✅ Response:
```json
{
  "success": true,
  "message": "User created! Cloud function will be triggered.",
  "userId": "abc123xyz"
}
```

#### Option 2: Test via Firestore Console

1. **Buka Firebase Console → Firestore Database**
2. **Klik "Start collection":**
   ```
   Collection ID: users
   ```
3. **Add document:**
   ```
   Document ID: (auto-generated)
   Fields:
     name: "Siti Nurhaliza"
     email: "siti@example.com"
   ```
4. **Klik Save**

✅ Cloud function otomatis triggered!

### Step 7: View Logs & Results (2 menit)

1. **View Function Logs:**
   ```bash
   firebase functions:log
   ```

   Atau di Firebase Console → Functions → Logs

   ✅ Anda akan lihat:
   ```
   🎉 New user created: abc123xyz
   User data: { name: 'Budi', email: 'budi@example.com' }
   ✅ Welcome notification sent to budi@example.com
   ```

2. **Check Firestore:**
   - Buka Firebase Console → Firestore
   - ✅ Collection `users` ada data baru
   - ✅ Collection `notifications` ada welcome message!

## 🎉 Selamat!

Anda baru saja membuat **event-driven serverless function**!

## 📊 How It Works

```
User Signup
    ↓
Firestore Document Created
    ↓
Cloud Function Triggered (onCreate)
    ↓
Send Welcome Notification
    ↓
Save to Notifications Collection
```

## 💰 Firebase Pricing

**Spark Plan (Free):**
- 125K function invocations/month
- 40K GB-seconds compute time
- 2M Cloud Firestore reads

**Blaze Plan (Pay-as-you-go):**
- $0.40 per million invocations
- Very cheap untuk small projects

## 🔗 Other Trigger Types

```javascript
// HTTP Trigger
exports.api = functions.https.onRequest((req, res) => {});

// Firestore onCreate
exports.onCreate = functions.firestore.document('...').onCreate((snap, ctx) => {});

// Firestore onUpdate
exports.onUpdate = functions.firestore.document('...').onUpdate((change, ctx) => {});

// Firestore onDelete
exports.onDelete = functions.firestore.document('...').onDelete((snap, ctx) => {});

// Scheduled (Cron)
exports.scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun((ctx) => {});

// Auth Trigger
exports.onUserCreate = functions.auth.user().onCreate((user) => {});
```

## ❓ Troubleshooting

**Q: Deploy failed "billing account required"?**
- A: Upgrade to Blaze plan (tetap gratis kecuali exceed quota) di Firebase Console → Upgrade

**Q: Function tidak triggered?**
- A: Check logs dengan `firebase functions:log`, pastikan document path match dengan function config

**Q: CORS error saat call HTTP function?**
- A: Add CORS headers:
  ```javascript
  res.set('Access-Control-Allow-Origin', '*');
  ```

---

**Next:** [Lab 4 - Integration & Testing](../lab4-integration/README.md)
