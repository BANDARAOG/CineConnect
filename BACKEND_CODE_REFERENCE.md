# 📚 Backend Code Structure & Navigation Guide

## File Organization Overview

```
cineconnect-lk/
├── src/
│   ├── lib/                          # Backend Services (Core Logic)
│   │   ├── firebase.ts              # ✅ Firebase initialization
│   │   ├── auth.ts                  # ✅ Authentication service (255 lines)
│   │   ├── db.ts                    # ✅ Database operations (363 lines)
│   │   ├── payments.ts              # ✅ PayHere integration (215 lines)
│   │   ├── storage.ts               # ✅ File upload service (198 lines)
│   │   └── utils.ts                 # ✅ Helper functions
│   │
│   ├── app/
│   │   ├── api/                     # REST API Routes (Controllers)
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts     # ⏳ Login endpoint
│   │   │   │   └── register/
│   │   │   │       └── route.ts     # ✅ Register endpoint
│   │   │   ├── projects/
│   │   │   │   └── route.ts         # ❌ Needs implementation
│   │   │   ├── applications/
│   │   │   │   └── route.ts         # ❌ Needs implementation
│   │   │   ├── messages/
│   │   │   │   └── route.ts         # ❌ Needs implementation
│   │   │   ├── payments/
│   │   │   │   └── route.ts         # ❌ Needs implementation
│   │   │   └── uploads/
│   │   │       └── route.ts         # ❌ Needs implementation
│   │   │
│   │   ├── page.tsx                 # ✅ Landing page
│   │   ├── layout.tsx               # ✅ Root layout
│   │   ├── auth/                    # UI Routes (Pages)
│   │   │   ├── login/page.tsx       # ✅ Login form
│   │   │   └── register/page.tsx    # ✅ Register form
│   │   └── [role]/
│   │       ├── dashboard/page.tsx   # ✅ Dashboard pages
│   │       └── ...
│   │
│   ├── types/
│   │   └── index.ts                 # ✅ TypeScript interfaces (100+ lines)
│   │
│   ├── hooks/
│   │   └── index.ts                 # ✅ Custom React hooks
│   │
│   └── components/                  # UI Components (empty - ready for components)
│
├── package.json                     # ✅ Dependencies installed
├── tsconfig.json                    # ✅ TypeScript config
├── next.config.ts                   # ✅ Next.js config
├── .env.local                       # ⏳ Needs Firebase credentials
└── .env.example                     # ✅ Template provided

```

---

## Key Files Explained

### 1. **firebase.ts** (26 lines) - Firebase Initialization
**Purpose:** Initialize Firebase services  
**Exports:**
- `auth` - Firebase Authentication
- `db` - Firestore Database
- `storage` - Cloud Storage
- `app` - Firebase App

**When to Use:** Import these in other services
```typescript
import { auth, db, storage } from '@/lib/firebase';
```

---

### 2. **auth.ts** (255 lines) - Authentication Service
**Purpose:** User registration, login, profile management  

**Main Functions:**
| Function | Purpose | Return |
|----------|---------|--------|
| `registerUser()` | Create new account | `{success, user, error}` |
| `loginUser()` | Sign in | `{success, user, role, error}` |
| `logoutUser()` | Sign out | `{success, error}` |
| `getCurrentUser()` | Get auth user | Firebase User \| null |
| `getFilmmakerProfile()` | Get filmmaker data | `{success, filmmaker, error}` |
| `getSponsorProfile()` | Get sponsor data | `{success, sponsor, error}` |
| `updateFilmmakerProfile()` | Update filmmaker | `{success, error}` |
| `updateSponsorProfile()` | Update sponsor | `{success, error}` |
| `resetPassword()` | Send reset email | `{success, error}` |

**Key Code:**
```typescript
// Register example
const result = await registerUser(
  'email@example.com',
  'password123',
  'John Doe',
  'filmmaker',
  { filmmakerRole: 'director', nicNumber: '123v' }
);

// Login example
const result = await loginUser('email@example.com', 'password123');
if (result.success) {
  console.log(result.user);  // Firebase User object
  console.log(result.role);  // 'filmmaker' or 'sponsor'
}
```

---

### 3. **db.ts** (363 lines) - Database Operations
**Purpose:** All Firestore CRUD operations  

**Project Operations:**
| Function | Purpose |
|----------|---------|
| `createProject()` | Create new project |
| `getProject()` | Get single project |
| `getProjects()` | List all projects with filters |
| `getFilmmakerProjects()` | Get filmmaker's projects |
| `updateProject()` | Update project |
| `deleteProject()` | Delete project |

**Application Operations:**
| Function | Purpose |
|----------|---------|
| `createApplication()` | Submit sponsorship app |
| `getApplication()` | Get single application |
| `getSponsorApplications()` | Get sponsor's apps |
| `getProjectApplications()` | Get project's apps |
| `updateApplicationStatus()` | Accept/reject |

**Message Operations:**
| Function | Purpose |
|----------|---------|
| `sendMessage()` | Send message |
| `getConversation()` | Get thread between users |
| `getUserInbox()` | Get all messages |
| `markMessageAsRead()` | Mark message as read |

**Key Code:**
```typescript
// Create project
const result = await createProject({
  filmmakerIds: ['uid_123'],
  title: 'My Film',
  genre: 'drama',
  budget: 5000000,
  // ... other fields
});

// Get projects with filters
const result = await getProjects({
  status: 'active',
  genre: 'drama',
  limit: 20
});

// Submit sponsorship
const result = await createApplication({
  projectId: 'proj_123',
  sponsorId: 'sponsor_456',
  sponsorshipPackageId: 'pkg_gold',
  amount: 1000000,
  paymentStatus: 'pending'
});
```

---

### 4. **payments.ts** (215 lines) - PayHere Integration
**Purpose:** Payment processing for sponsorships  

**Functions:**
| Function | Purpose |
|----------|---------|
| `createPaymentOrder()` | Create payment link |
| `verifyPayment()` | Verify payment |
| `getPaymentStatus()` | Check payment status |
| `handlePaymentWebhook()` | Process PayHere callback |

**Key Code:**
```typescript
// Create payment
const result = await createPaymentOrder({
  applicationId: 'app_123',
  amount: 1000000,
  currency: 'LKR',
  customerEmail: 'sponsor@example.com',
  customerPhone: '+94-71-123-4567',
  customerName: 'John Sponsor',
  returnUrl: 'https://cineconnect.com/payment/success',
  notifyUrl: 'https://cineconnect.com/api/payments/webhook'
});

if (result.success) {
  // Redirect to paymentUrl
  window.location.href = result.paymentUrl;
}
```

---

### 5. **storage.ts** (198 lines) - File Upload Service
**Purpose:** Upload/delete files from Firebase Cloud Storage  

**Functions:**
| Function | Purpose | Limit |
|----------|---------|-------|
| `uploadProfileImage()` | User avatar | 5MB |
| `uploadProjectImage()` | Project poster | 5MB |
| `uploadVideo()` | Teaser video | 100MB |
| `uploadDocument()` | Contract/agreement | 10MB |
| `deleteFile()` | Remove file | - |

**Key Code:**
```typescript
// Upload project image
const result = await uploadProjectImage(
  file,           // File object
  'proj_123',     // Project ID
  'poster'        // File type
);

if (result.success) {
  console.log(result.url);  // Download URL
}

// Delete file
const result = await deleteFile(result.path);
```

---

### 6. **types/index.ts** - TypeScript Interfaces
**Purpose:** Define all data structures  

**Main Types:**
- `User` - Base user interface
- `Filmmaker` - Extends User
- `Sponsor` - Extends User
- `FilmProject` - Project data
- `SponsorshipPackage` - Package options
- `SponsorshipApplication` - Application data
- `Message` - Message data
- `Review` - Review/rating
- `ProjectAnalytics` - Analytics data

**Usage:**
```typescript
import { Filmmaker, FilmProject, SponsorshipApplication } from '@/types';

const filmmaker: Filmmaker = {
  id: 'uid_123',
  email: 'director@example.com',
  role: 'director',
  fullName: 'John Director',
  // ... other properties
};
```

---

## API Routes Structure

### Auth Routes

**POST /api/auth/register**
```
Request:
{
  email: string
  password: string (min 6 chars)
  fullName: string
  role: 'filmmaker' | 'sponsor'
  additionalData: {
    filmmakerRole?: 'director' | 'producer' | 'student' | 'independent'
    nicNumber?: string
    companyName?: string (for sponsors)
    businessRegNo?: string
    phone?: string
    industryCategory?: string
  }
}

Response: 200
{
  success: true
  message: "User registered successfully"
  user: {
    uid: string
    email: string
    role: string
  }
}

Response: 400 / 500
{
  success: false
  error: string
}
```

**POST /api/auth/login** ⏳ *Needs implementation*
```
Request:
{
  email: string
  password: string
}

Response: 200
{
  success: true
  user: {
    uid: string
    email: string
    displayName: string
  }
  role: 'filmmaker' | 'sponsor' | 'admin'
  token: string (JWT)
}

Response: 401
{
  success: false
  error: "Invalid credentials"
}
```

---

### Projects Routes (To Implement)

**GET /api/projects**
```
Query Params:
?status=active&genre=drama&limit=20

Response: 200
{
  success: true
  projects: Array<Project>
}
```

**POST /api/projects**
```
Request:
{
  filmmakerIds: string[]
  title: string
  genre: string
  budget: number
  sponsorshipNeeded: number
  status: 'draft' | 'active'
  // ... other fields
}

Response: 201
{
  success: true
  projectId: string
}
```

---

## How Database Operations Work

### Example: Create and Retrieve a Project

**Step 1: Create Project**
```typescript
// File: src/app/api/projects/route.ts
import { createProject } from '@/lib/db';

export async function POST(request: NextRequest) {
  const projectData = await request.json();
  
  const result = await createProject(projectData);
  
  return NextResponse.json(result, {
    status: result.success ? 201 : 400
  });
}
```

**Step 2: Database Operation**
```typescript
// File: src/lib/db.ts
export const createProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true, projectId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
```

**Step 3: Firestore Storage**
```
Firestore Database
└── projects collection
    └── [docId]
        ├── filmmakerIds: ['uid1', 'uid2']
        ├── title: "My Film"
        ├── genre: "drama"
        ├── budget: 5000000
        ├── sponsorshipNeeded: 3000000
        ├── currentFunding: 0
        ├── status: "active"
        ├── createdAt: Timestamp
        └── updatedAt: Timestamp
```

---

## Error Handling Pattern

All services follow this pattern:
```typescript
export const someFunction = async (params) => {
  try {
    // Do operation
    const result = await firebaseOperation();
    
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error message:', error);
    return { 
      success: false, 
      error: {
        code: error.code,
        message: getErrorMessage(error.code)
      }
    };
  }
};
```

**Usage in API Routes:**
```typescript
if (result.success) {
  return NextResponse.json(result.data, { status: 200 });
} else {
  return NextResponse.json(result.error, { status: 400 });
}
```

---

## Environment Variables (.env.local)

```bash
# Firebase Configuration (Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cineconnect.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cineconnect-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cineconnect-abc123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...

# PayHere Configuration (Get from PayHere)
PAYHERE_MERCHANT_ID=YOUR_MERCHANT_ID
PAYHERE_MERCHANT_SECRET=YOUR_MERCHANT_SECRET
PAYHEREAPI_URL=https://sandbox.payhere.lk/api/v2

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Import Statements Cheat Sheet

```typescript
// Firebase services
import { auth, db, storage } from '@/lib/firebase';

// Auth functions
import { 
  registerUser, 
  loginUser, 
  getFilmmakerProfile 
} from '@/lib/auth';

// Database functions
import { 
  createProject, 
  getProjects, 
  createApplication 
} from '@/lib/db';

// Payment functions
import { createPaymentOrder } from '@/lib/payments';

// Storage functions
import { uploadProfileImage } from '@/lib/storage';

// Types
import { 
  User, 
  Filmmaker, 
  FilmProject, 
  SponsorshipApplication 
} from '@/types';

// Next.js utilities
import { NextRequest, NextResponse } from 'next/server';
```

---

## Testing Checklist

### 1. Test Database Operations
- [ ] Register as filmmaker in `/auth/register`
- [ ] Check Firestore `users` collection for new user doc
- [ ] Check `filmmakers` collection for filmmaker profile
- [ ] Test similar for sponsor registration

### 2. Test File Upload
- [ ] Upload profile image during registration
- [ ] Check Firebase Storage for uploaded image
- [ ] Verify URL is accessible

### 3. Test Project Operations
- [ ] Create project via frontend
- [ ] Query projects via API
- [ ] Update project
- [ ] Delete project

### 4. Test Application Operations
- [ ] Submit sponsorship application
- [ ] Check applications collection
- [ ] Update application status

### 5. Test Messaging
- [ ] Send message between users
- [ ] Query messages
- [ ] Mark as read

---

**Created:** January 24, 2026  
**Reference Guide:** Backend Code Navigation  
**Last Updated:** January 24, 2026
