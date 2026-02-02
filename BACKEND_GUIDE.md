# CineConnect Backend Implementation Guide

## Overview

This document provides comprehensive details about the CineConnect backend architecture, services, and API endpoints.

## Architecture

### Technology Stack

- **Backend Framework**: Next.js 15+ (API Routes)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **File Storage**: Firebase Cloud Storage
- **Payments**: PayHere (Sri Lankan Payment Processor)
- **Real-time**: Firebase Realtime Listeners
- **Language**: TypeScript 5+

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── login/route.ts
│   │   ├── projects/route.ts
│   │   ├── applications/route.ts
│   │   ├── messages/route.ts
│   │   ├── uploads/route.ts
│   │   └── payments/route.ts
│   ├── page.tsx
│   ├── auth/
│   └── (user dashboards)
├── lib/
│   ├── firebase.ts          # Firebase initialization
│   ├── auth.ts              # Authentication utilities
│   ├── db.ts                # Database operations
│   ├── payments.ts          # Payment processing
│   ├── storage.ts           # File upload utilities
│   └── utils.ts             # Helper functions
├── hooks/
│   └── index.ts             # Custom React hooks
└── types/
    └── index.ts             # TypeScript interfaces
```

## Service Layers

### 1. Authentication Service (`src/lib/auth.ts`)

**Functions:**
- `registerUser()` - Create new user account with role
- `loginUser()` - Sign in with email/password
- `logoutUser()` - Sign out user
- `resetPassword()` - Send password reset email
- `getCurrentUser()` - Get current auth user
- `onAuthChange()` - Listen to auth state changes
- `getUserRole()` - Get user's role from Firestore
- `getFilmmakerProfile()` - Retrieve filmmaker document
- `getSponsorProfile()` - Retrieve sponsor document
- `updateFilmmakerProfile()` - Update filmmaker data
- `updateSponsorProfile()` - Update sponsor data

**Usage:**
```typescript
// Registration
const result = await registerUser(
  email,
  password,
  fullName,
  'filmmaker',
  { nic: '123456789v', portfolio: 'url' }
);

// Login
const result = await loginUser(email, password);
if (result.success) {
  console.log(result.user); // Firebase User object
  console.log(result.role); // 'filmmaker' or 'sponsor'
}

// Get profile
const filmmaker = await getFilmmakerProfile(uid);
```

### 2. Database Service (`src/lib/db.ts`)

#### Project Operations
- `createProject()` - Create new project
- `getProject()` - Get single project
- `getProjects()` - Get all projects with filters
- `getFilmmakerProjects()` - Get projects by filmmaker
- `updateProject()` - Update project details
- `deleteProject()` - Delete project

#### Application Operations
- `createApplication()` - Submit sponsorship application
- `getApplication()` - Get single application
- `getSponsorApplications()` - Get sponsor's applications
- `getProjectApplications()` - Get applications for project
- `updateApplicationStatus()` - Update application status

#### Message Operations
- `sendMessage()` - Send message between users
- `getConversation()` - Get messages between two users
- `getUserInbox()` - Get user's inbox
- `markMessageAsRead()` - Mark message as read

#### Review Operations
- `createReview()` - Create review for user
- `getUserReviews()` - Get reviews for user

#### Analytics
- `incrementProjectViews()` - Track project views
- `getProjectFundingProgress()` - Get funding status

**Example:**
```typescript
// Get projects by status
const result = await getProjects({
  status: 'active',
  genre: 'drama',
  limit: 20
});

// Submit sponsorship
const appResult = await createApplication({
  projectId: 'proj_123',
  sponsorId: 'sponsor_456',
  packageId: 'pkg_gold',
  amount: 1000000,
  message: 'Interested in sponsoring...'
});
```

### 3. Payment Service (`src/lib/payments.ts`)

- `createPaymentOrder()` - Create PayHere payment order
- `verifyPayment()` - Verify payment completion
- `getPaymentStatus()` - Get payment status
- `handlePaymentWebhook()` - Process PayHere webhook

**PayHere Integration:**
```typescript
const result = await createPaymentOrder({
  applicationId: 'app_123',
  amount: 1000000,
  currency: 'LKR',
  customerEmail: 'sponsor@example.com',
  customerPhone: '+94712345678',
  customerName: 'John Doe',
  returnUrl: 'https://app.com/payment/return',
  notifyUrl: 'https://app.com/api/payments/webhook'
});

// result.paymentUrl -> Redirect user here
```

### 4. Storage Service (`src/lib/storage.ts`)

- `uploadProfileImage()` - Upload user profile photo
- `uploadProjectFile()` - Upload project files (poster, budget, script)
- `uploadAgreement()` - Upload sponsorship agreement
- `getDownloadUrl()` - Get file download URL
- `deleteFile()` - Delete file

**File Limits:**
- Images: 5MB (JPEG, PNG, WebP)
- Documents: 10MB (PDF)
- Videos: 100MB (MP4, MOV)

**Usage:**
```typescript
const result = await uploadProfileImage(file, userId, 'filmmaker');
// result.url -> Download/view URL
// result.path -> Storage path for deletion
```

## API Endpoints

### Authentication

**POST /api/auth/register**
```json
Request:
{
  "email": "filmmaker@example.com",
  "password": "secure_password",
  "fullName": "John Filmmaker",
  "role": "filmmaker",
  "nic": "123456789v",
  "portfolio": "https://portfolio.com"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "user": { /* Firebase User object */ }
}
```

**POST /api/auth/login**
- Not explicitly shown but used by auth hook

### Projects

**GET /api/projects?status=active&genre=drama&limit=20**
```json
Response (200):
{
  "success": true,
  "projects": [
    {
      "id": "proj_123",
      "title": "Film Title",
      "synopsis": "...",
      "genre": "drama",
      "budget": 5000000,
      "sponsorshipNeeded": 3000000,
      "currentFunding": 1500000,
      "status": "active",
      "filmmakerIds": ["fm_1", "fm_2"],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**POST /api/projects**
```json
Request:
{
  "filmmakerIds": ["fm_123"],
  "title": "New Film Project",
  "synopsis": "Film description",
  "genre": "drama",
  "budget": 5000000,
  "sponsorshipNeeded": 3000000,
  "sponsorshipPackages": [
    {
      "name": "Gold",
      "amount": 1000000,
      "benefits": ["Logo placement", "Credits"]
    }
  ]
}

Response (201):
{
  "success": true,
  "message": "Project created",
  "projectId": "proj_123"
}
```

### Applications

**GET /api/applications?userId=sponsor_123&role=sponsor**
```json
Response (200):
{
  "success": true,
  "applications": [
    {
      "id": "app_123",
      "projectId": "proj_123",
      "sponsorId": "sponsor_123",
      "packageId": "pkg_gold",
      "amount": 1000000,
      "status": "pending",
      "paymentStatus": "unpaid",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**POST /api/applications**
```json
Request:
{
  "projectId": "proj_123",
  "sponsorId": "sponsor_123",
  "packageId": "pkg_gold",
  "amount": 1000000,
  "message": "We'd like to sponsor..."
}

Response (201):
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "app_123"
}
```

### Messages

**GET /api/messages?userId=user_123&otherUserId=user_456**
```json
Response (200):
{
  "success": true,
  "messages": [
    {
      "id": "msg_123",
      "fromUserId": "user_123",
      "toUserId": "user_456",
      "content": "Message text",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**POST /api/messages**
```json
Request:
{
  "fromUserId": "user_123",
  "toUserId": "user_456",
  "projectId": "proj_123",
  "content": "Hello, interested in your project!"
}

Response (201):
{
  "success": true,
  "message": "Message sent successfully",
  "messageId": "msg_123"
}
```

### File Upload

**POST /api/uploads** (multipart/form-data)
```
FormData:
- file: <File>
- type: "profile" | "project" | "agreement"
- userId: "user_123" (for profile)
- userRole: "filmmaker" | "sponsor" (for profile)
- projectId: "proj_123" (for project)
- fileType: "poster" | "budget" | "script" | "video" (for project)
- applicationId: "app_123" (for agreement)

Response (201):
{
  "success": true,
  "url": "https://firebaseStorage.url",
  "path": "profiles/filmmaker/user_123/filename"
}
```

### Payments

**POST /api/payments**
```json
Request:
{
  "applicationId": "app_123",
  "amount": 1000000,
  "customerEmail": "sponsor@example.com",
  "customerPhone": "+94712345678",
  "customerName": "John Doe"
}

Response (201):
{
  "success": true,
  "paymentId": "pay_12345",
  "paymentUrl": "https://sandbox.payhere.lk/pay/12345"
}
```

**GET /api/payments?paymentId=pay_12345**
```json
Response (200):
{
  "success": true,
  "status": "completed",
  "amount": 1000000,
  "currency": "LKR"
}
```

## Custom React Hooks

### useAuth()
Global authentication state management.

```typescript
const { user, role, loading, error, register, login, logout } = useAuth();

// Register
await register(email, password, name, role, additionalData);

// Login
const result = await login(email, password);

// Logout
await logout();
```

### useFilmmakerProfile(filmmakerIds)
Real-time filmmaker profile updates.

```typescript
const { profile, loading, error } = useFilmmakerProfile(['fm_123']);
```

### useSponsorProfile(sponsorId)
Real-time sponsor profile updates.

```typescript
const { profile, loading, error } = useSponsorProfile('sponsor_123');
```

### useProjects(filters)
Get projects with optional filters.

```typescript
const { projects, loading, error } = useProjects({
  status: 'active',
  genre: 'drama',
  limit: 20
});
```

### useApplications(userId, userRole)
Get user's applications with real-time updates.

```typescript
const { applications, loading, error } = useApplications('user_123', 'sponsor');
```

### useMessages(userId, otherUserId)
Get messages with real-time updates.

```typescript
const { messages, loading, error } = useMessages('user_123', 'user_456');
```

### useProjectFunding(projectId)
Get real-time project funding progress.

```typescript
const { funding, loading, error } = useProjectFunding('proj_123');
// funding.current, funding.needed, funding.percentage
```

### useNotifications(userId)
Get notifications with unread count.

```typescript
const { notifications, unreadCount, loading } = useNotifications('user_123');
```

## Firestore Database Schema

### Collections

**users**
- id: Firebase UID
- email: string
- role: 'filmmaker' | 'sponsor'
- createdAt: timestamp
- lastLogin: timestamp

**filmmakers**
- id: Firebase UID
- fullName: string
- nic: string
- role: string
- pastWorks: array
- verified: boolean
- bio: string
- averageRating: number

**sponsors**
- id: Firebase UID
- companyName: string
- businessRegNo: string
- industryCategory: string
- verified: boolean
- totalInvested: number

**projects**
- id: document ID
- filmmakerIds: array
- title: string
- synopsis: string
- genre: string
- budget: number
- sponsorshipNeeded: number
- currentFunding: number
- status: 'draft' | 'active' | 'completed'
- sponsorshipPackages: array
- views: number
- createdAt: timestamp
- updatedAt: timestamp

**applications**
- id: document ID
- projectId: string
- sponsorId: string
- packageId: string
- amount: number
- message: string
- status: 'pending' | 'approved' | 'rejected'
- paymentStatus: 'unpaid' | 'paid' | 'failed'
- paymentId: string
- agreementUrl: string
- createdAt: timestamp
- updatedAt: timestamp

**messages**
- id: document ID
- fromUserId: string
- toUserId: string
- projectId: string
- content: string
- isRead: boolean
- createdAt: timestamp
- updatedAt: timestamp

**reviews**
- id: document ID
- fromUserId: string
- toUserId: string
- rating: number (1-5)
- comment: string
- createdAt: timestamp

## Security

### Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Allow read own profile, write with auth
    match /filmmakers/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    match /sponsors/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    // Public read for projects
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     request.auth.uid in resource.data.filmmakerIds;
    }

    // Users can read/write their applications
    match /applications/{appId} {
      allow read, write: if request.auth.uid == resource.data.sponsorId ||
                           request.auth.uid == resource.data.filmmakerIds[0];
    }

    // Users can read/write their messages
    match /messages/{msgId} {
      allow read, write: if request.auth.uid == resource.data.fromUserId ||
                           request.auth.uid == resource.data.toUserId;
    }
  }
}
```

## Environment Variables

See `.env.example` for required configuration.

## Error Handling

All services return consistent response objects:

```typescript
{
  success: boolean;
  error?: string;
  data?: any;
}
```

Error messages are user-friendly and don't expose sensitive information.

## Testing

Run tests:
```bash
npm test
```

## Deployment

1. Set environment variables in Vercel
2. Deploy with `vercel deploy`
3. Configure Firebase security rules
4. Set up PayHere webhook endpoint

## Next Steps

- Implement image compression
- Add rate limiting
- Implement email notifications
- Set up monitoring and logging
- Add analytics tracking
- Implement recommendation engine
