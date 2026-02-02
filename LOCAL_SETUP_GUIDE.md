# 🚀 CineConnect - Local Setup & Development Guide

## ✅ Current Status

Your CineConnect website is now **running on localhost:3000**! 

```
✓ Next.js 16.1.1 Development Server Running
✓ Local:    http://localhost:3000
✓ Network:  http://192.168.1.103:3000
✓ Ready in 842ms
```

---

## 🌐 Access Your Application

Open your browser and navigate to:
- **Local**: `http://localhost:3000`
- **Network**: `http://192.168.1.103:3000` (access from other devices)

---

## 📋 Frontend Status - What's Already Built ✅

### Pages Available:
- **Landing Page** (`/`) - Hero, features, call-to-action
- **Filmmaker Registration** (`/auth/register?role=filmmaker`) - Sign up form
- **Sponsor Registration** (`/auth/register?role=sponsor`) - Company registration
- **Login Page** (`/auth/login`) - Authentication form
- **Sponsor Dashboard** (`/sponsor/dashboard`) - Browse projects UI
- **Filmmaker Dashboard** (`/filmmaker/dashboard`) - Project management UI
- **Admin Panel** (`/admin`) - Admin interface

### Features Implemented:
✅ Responsive design with Tailwind CSS  
✅ Role-based navigation (Filmmaker vs Sponsor)  
✅ Form validation & error handling  
✅ TypeScript for type safety  
✅ Modern React 19 with hooks  

---

## 🔧 Backend - What Needs to Be Built

The backend is **ready to be implemented** with the following components:

### 1. **Authentication System** (Priority: HIGH)
- User registration endpoints
- Login/logout functionality
- JWT token management
- Role-based access control
- Profile management

**Files to Create:**
- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/login/route.ts`
- `src/lib/auth.ts` - Auth utilities
- Middleware for protected routes

### 2. **Database Setup** (Priority: HIGH)
- Firebase Firestore integration
- Collections: users, filmmakers, sponsors, projects, applications, messages
- Database schema & validation
- Real-time listeners

**Files to Create:**
- `src/lib/db.ts` - Database operations
- `src/lib/firebase.ts` - Firebase initialization (partially done)

### 3. **Project Management API** (Priority: MEDIUM)
- Create, read, update, delete projects
- Filter & search projects
- Funding tracking
- Status management

**Endpoint:** `src/app/api/projects/route.ts`

### 4. **Sponsorship Applications** (Priority: MEDIUM)
- Submit applications
- Track application status
- Review & approval workflow
- Agreement management

**Endpoint:** `src/app/api/applications/route.ts`

### 5. **Payment Processing** (Priority: HIGH)
- PayHere integration
- Payment order creation
- Webhook handling
- Payment verification

**Files to Create:**
- `src/lib/payments.ts` - PayHere utilities
- `src/app/api/payments/route.ts` - Payment endpoints

### 6. **Messaging System** (Priority: MEDIUM)
- Real-time messaging between users
- Conversation history
- Read/unread tracking
- Notifications

**Files to Create:**
- `src/app/api/messages/route.ts`
- `src/hooks/useMessages.ts`

### 7. **File Upload & Storage** (Priority: HIGH)
- Profile image uploads
- Project document uploads (posters, budgets, scripts)
- Agreement uploads
- Cloud storage integration

**Files to Create:**
- `src/lib/storage.ts` - Firebase Storage utilities
- `src/app/api/uploads/route.ts` - Upload endpoint

---

## 📝 Configuration Files

### Environment Variables (.env.local)
✅ Created with development defaults  
⚠️ **ACTION NEEDED**: Update with your actual Firebase credentials

See section below: **"Step 1: Set Up Firebase"**

---

## 🔐 Step-by-Step Backend Setup

### Step 1: Set Up Firebase 🔥

#### Create Firebase Project:
1. Go to https://firebase.google.com
2. Click "Get Started" → "Create a project"
3. Name it: `cineconnect-lk`
4. Select your country
5. Create the project

#### Enable Required Services:

**Authentication:**
1. Go to **Build** → **Authentication**
2. Click **Get Started**
3. Enable: **Email/Password**
4. Enable: **Google** (optional, for OAuth)
5. Enable: **LinkedIn** (optional, for sponsor logins)

**Firestore Database:**
1. Go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Select **production mode**
4. Choose location: **asia-southeast1** (Singapore - closest to Sri Lanka)
5. Create

**Cloud Storage:**
1. Go to **Build** → **Storage**
2. Click **Get Started**
3. Choose location: **asia-southeast1**
4. Create

#### Get Your Credentials:
1. Go to **Project Settings** (⚙️ icon)
2. Go to **Your Apps** section
3. Click **</>** (Web)
4. Copy the Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### Update .env.local:
Edit `/Users/hirushapathum/Documents/GitHub/cineconnect-lk/.env.local` and replace:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

### Step 2: Set Up PayHere (Sri Lankan Payment Gateway) 💳

#### Create PayHere Account:
1. Go to https://www.payhere.lk/merchant/
2. Register as merchant
3. Verify your business
4. Get approved

#### Get Sandbox Credentials:
1. Dashboard → **Settings** → **API Keys**
2. Get **Merchant ID** and **Merchant Secret**
3. Copy Sandbox credentials

#### Update .env.local:
```bash
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_MERCHANT_SECRET=your_merchant_secret
PAYHERE_API_URL=https://sandbox.payhere.lk/api/v2
PAYHERE_WEBHOOK_SECRET=any_secret_key_you_choose
```

---

### Step 3: Implement Authentication Backend

#### File: `src/lib/auth.ts`
```typescript
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  role: 'filmmaker' | 'sponsor',
  additionalData: Record<string, any>
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      role,
      createdAt: new Date(),
      lastLogin: new Date()
    });

    // Store role-specific data
    if (role === 'filmmaker') {
      await setDoc(doc(db, 'filmmakers', user.uid), {
        fullName,
        ...additionalData,
        verified: false,
        createdAt: new Date()
      });
    } else {
      await setDoc(doc(db, 'sponsors', user.uid), {
        companyName: additionalData.companyName,
        ...additionalData,
        verified: false,
        createdAt: new Date()
      });
    }

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const role = userDoc.data()?.role;

    return { success: true, user, role };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
```

#### File: `src/app/api/auth/register/route.ts`
```typescript
import { registerUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, role, ...additionalData } = body;

    // Validation
    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await registerUser(
      email,
      password,
      fullName,
      role,
      additionalData
    );

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'User registered successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

### Step 4: Implement Database Service

#### File: `src/lib/db.ts`
Complete implementation with all CRUD operations for:
- Projects
- Applications
- Messages
- Reviews
- User profiles

See `BACKEND_GUIDE.md` for detailed code examples.

---

### Step 5: Set Up Real-time Hooks

#### File: `src/hooks/useAuth.ts`
```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  error: null
});

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        setRole(userDoc.data()?.role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, role, loading, error: null };
}
```

---

## 📚 Recommended Implementation Order

### Week 1-2: Core Infrastructure
1. ✅ Frontend (DONE)
2. Firebase setup & configuration
3. Authentication (register/login)
4. User profiles (filmmaker/sponsor)

### Week 3-4: Project Management
5. Project CRUD operations
6. Project search & filters
7. Project funding tracking
8. Dashboard displays

### Week 5-6: Sponsorship & Applications
9. Sponsorship applications
10. Application status workflow
11. Agreement management
12. Notifications

### Week 7-8: Payments & Advanced
13. PayHere integration
14. Payment processing
15. Payment webhooks
16. Messaging system

### Week 9+: Polish & Launch
17. Testing & bug fixes
18. Performance optimization
19. Security audit
20. Deployment to production

---

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linting
```bash
npm run lint
```

---

## 📖 Important Documentation Files

Read these in order:

1. **BACKEND_GUIDE.md** - Complete backend API documentation
2. **BACKEND_SUMMARY.md** - Overview of backend architecture
3. **DEVELOPMENT_ROADMAP.md** - 47 implementation tasks
4. **ROUTES_GUIDE.md** - All 40+ application routes
5. **SETUP_GUIDE.md** - Detailed setup instructions
6. **DEVELOPER_CHECKLIST.md** - Implementation checklist

---

## 🐛 Troubleshooting

### Server not starting?
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Port 3000 already in use?
```bash
# Use a different port
PORT=3001 npm run dev
```

### Firebase credentials not working?
- Verify you copied all credentials correctly
- Check that `.env.local` is NOT in `.gitignore` for development
- Restart the dev server after updating `.env.local`

### Module not found errors?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Next Steps

1. ✅ **Frontend is running** - Open `http://localhost:3000`
2. 🔥 Set up Firebase (follow Step 1 above)
3. 💳 Set up PayHere (follow Step 2 above)
4. 🔐 Implement authentication (follow Step 3 above)
5. 📊 Build database operations (follow Step 4 above)
6. 🚀 Deploy to production

---

## 🎯 Current Status Summary

| Component | Status | Action |
|-----------|--------|--------|
| Frontend UI | ✅ Complete | Working on localhost:3000 |
| Frontend Pages | ✅ Complete | All pages built |
| Firebase Setup | ⚠️ Needed | Create project & add credentials |
| Authentication | ⚠️ In Progress | Ready to implement |
| Database | ⚠️ In Progress | Firestore schema ready |
| Payments | ⚠️ In Progress | PayHere integration ready |
| Messaging | ⚠️ In Progress | Real-time listeners ready |
| Storage | ⚠️ In Progress | Upload utilities ready |

---

**Happy coding! 🎬**

For detailed backend implementation code, refer to `BACKEND_GUIDE.md`.
