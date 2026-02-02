# 🏗️ CineConnect Backend Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                         │
│  Landing Page │ Auth Pages │ Filmmaker Dashboard │ Sponsor Dash │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP Requests (JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                           │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/auth/register       Register user                    │
│  POST /api/auth/login          Login user                       │
│  GET  /api/auth/logout         Logout user                      │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/projects            Create project                   │
│  GET  /api/projects            List projects                    │
│  GET  /api/projects/:id        Get project                      │
│  PUT  /api/projects/:id        Update project                   │
│  DELETE /api/projects/:id      Delete project                   │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/applications        Submit sponsorship               │
│  GET  /api/applications        List applications                │
│  PUT  /api/applications/:id    Update status                    │
│  DELETE /api/applications/:id  Withdraw                         │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/messages            Send message                     │
│  GET  /api/messages/inbox      Get inbox                        │
│  PUT  /api/messages/:id/read   Mark as read                     │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/uploads/image       Upload image                     │
│  POST /api/uploads/video       Upload video                     │
│  DELETE /api/uploads/:id       Delete file                      │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/payments/create     Create payment                   │
│  GET  /api/payments/status     Check payment                    │
│  POST /api/payments/webhook    PayHere callback                 │
└────────────┬──────────────┬────────────────┬────────────────────┘
             │              │                │
    ┌────────▼───┐  ┌──────▼──┐   ┌───────▼────┐
    │ Database   │  │ Storage  │   │ Payments   │
    │ Service    │  │ Service  │   │ Service    │
    │ (db.ts)    │  │(storage) │   │(payments)  │
    └────────┬───┘  └──────┬──┘   └───────┬────┘
             │             │              │
             │             │              │
    ┌────────▼──────────────▼──────────────▼────────┐
    │         Firebase Services (Google Cloud)      │
    ├────────────────────────────────────────────────┤
    │                                                │
    │  ┌──────────────────────────────────────────┐ │
    │  │ Firebase Authentication                  │ │
    │  │ • Email/Password                         │ │
    │  │ • Session Management                     │ │
    │  │ • Token Generation                       │ │
    │  └──────────────────────────────────────────┘ │
    │                                                │
    │  ┌──────────────────────────────────────────┐ │
    │  │ Firestore Database (NoSQL)               │ │
    │  │ Collections:                             │ │
    │  │ • users                                  │ │
    │  │ • filmmakers                             │ │
    │  │ • sponsors                               │ │
    │  │ • projects                               │ │
    │  │ • applications                           │ │
    │  │ • messages                               │ │
    │  │ • reviews                                │ │
    │  └──────────────────────────────────────────┘ │
    │                                                │
    │  ┌──────────────────────────────────────────┐ │
    │  │ Cloud Storage                            │ │
    │  │ • Project Images                         │ │
    │  │ • Teaser Videos                          │ │
    │  │ • Documents/Agreements                   │ │
    │  │ • User Profiles                          │ │
    │  └──────────────────────────────────────────┘ │
    │                                                │
    └────────────────────────────────────────────────┘

             ┌──────────────────────────┐
             │   PayHere Integration    │
             │ (Sri Lankan Payments)    │
             │                          │
             │ • Payment Creation       │
             │ • Payment Verification   │
             │ • Webhook Callbacks      │
             │ • Status Tracking        │
             └──────────────────────────┘
```

---

## Data Flow Diagram

### 1. User Registration Flow
```
User Form (Register)
        │
        ▼
  /api/auth/register
        │
        ├─► Firebase Auth (Create User)
        │   
        ├─► Firestore (Create User Doc)
        │
        ├─► Firestore (Create Role-Specific Doc)
        │   └─► filmmakers OR sponsors
        │
        └─► Return Success (User UID, Role)
```

### 2. Project Creation Flow
```
Filmmaker Form (Create Project)
        │
        ▼
  /api/projects [POST]
        │
        ├─► Validate Input
        │
        ├─► Create Project Document
        │   └─► Firestore: projects collection
        │
        ├─► Upload Images (if any)
        │   └─► Cloud Storage: projects/{projectId}/images/
        │
        ├─► Create Analytics Record
        │   └─► Firestore: analytics collection
        │
        └─► Return Project ID & URL
```

### 3. Sponsorship Application Flow
```
Sponsor Form (Apply to Project)
        │
        ▼
  /api/applications [POST]
        │
        ├─► Validate Input
        │
        ├─► Create Application Document
        │   └─► Firestore: applications collection
        │
        ├─► Notify Filmmaker (pending)
        │   └─► Create Message in inbox
        │
        ├─► Redirect to Payment
        │   └─► /api/payments/create
        │
        └─► Return Application ID
```

### 4. Payment Processing Flow
```
Sponsor Payment Form
        │
        ▼
  /api/payments/create
        │
        ├─► Validate Payment Data
        │
        ├─► Call PayHere API
        │   └─► Get Payment URL
        │
        ├─► Create Payment Record
        │   └─► Firestore: payments collection
        │
        └─► Return Payment URL to Redirect
                │
                ▼
        Sponsor → PayHere Gateway
                │
                ▼ (After Payment)
        PayHere → Webhook
                │
                ▼
        /api/payments/webhook
                │
                ├─► Verify Signature
                │
                ├─► Update Payment Status
                │
                ├─► Update Application Status
                │   └─► Mark as "accepted"
                │
                ├─► Update Project Funding
                │
                └─► Send Confirmation Emails
```

### 5. Message Flow
```
User A (Form)
        │
        ▼
  /api/messages [POST]
        │
        ├─► Create Message Document
        │   └─► Firestore: messages collection
        │
        ├─► Update Inbox Index
        │   └─► Firestore: user conversations
        │
        ├─► Send Notification (future)
        │   └─► Email or Push Notification
        │
        └─► Return Success
                │
                ▼
        User B (Listens to messages)
                │
                ▼
        /api/messages/inbox [GET]
                │
                ├─► Query Firestore
                │   └─► Get unread messages
                │
                └─► Return Message List
```

---

## Service Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    API ROUTES (Controllers)                 │
│  auth/ │ projects/ │ applications/ │ messages/ │ payments/  │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌─────────────┐ ┌──────────────┐ ┌──────────────┐
│  auth.ts    │ │  db.ts       │ │ payments.ts  │
│  Service    │ │  Service     │ │ Service      │
│             │ │              │ │              │
│ • register  │ │ • Projects   │ │ • Create     │
│ • login     │ │ • Apps       │ │ • Verify     │
│ • logout    │ │ • Messages   │ │ • Webhook    │
│ • sessions  │ │ • Analytics  │ │ • Status     │
└──────┬──────┘ └──────┬───────┘ └──────┬───────┘
       │                │              │
       │                │              │
       └────────────────┼──────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
  ┌──────────┐  ┌──────────────┐  ┌──────────────┐
  │firebase  │  │storage.ts    │  │utils.ts      │
  │.ts       │  │Service       │  │Helpers       │
  │          │  │              │  │              │
  │ • auth   │  │ • upload     │  │ • errors     │
  │ • db     │  │ • delete     │  │ • formats    │
  │ • storage│  │ • validate   │  │ • generate   │
  └────────┬─┘  └──────┬───────┘  └──────┬───────┘
           │           │                │
           └───────────┼────────────────┘
                       │
                       ▼
            ┌────────────────────────┐
            │  External Services     │
            ├────────────────────────┤
            │ • Firebase (Auth, DB)  │
            │ • PayHere (Payments)   │
            │ • Google Cloud         │
            └────────────────────────┘
```

---

## Database Schema (Firestore)

### users collection
```json
{
  "id": "user_uid",
  "email": "user@example.com",
  "role": "filmmaker|sponsor|admin",
  "createdAt": "2026-01-24T...",
  "updatedAt": "2026-01-24T...",
  "lastLogin": "2026-01-24T..."
}
```

### filmmakers collection
```json
{
  "userId": "user_uid",
  "fullName": "John Director",
  "nicNumber": "123456789v",
  "role": "director|producer|student|independent",
  "pastWorks": ["url1", "url2"],
  "verified": false,
  "profileImage": "gs://...",
  "bio": "Bio text",
  "createdAt": "2026-01-24T..."
}
```

### sponsors collection
```json
{
  "userId": "user_uid",
  "companyName": "ABC Company",
  "businessRegNo": "BR123456",
  "phone": "+94-71-123-4567",
  "industryCategory": "Technology|Finance|...",
  "verified": false,
  "profileImage": "gs://...",
  "website": "https://example.com",
  "bio": "About company",
  "totalInvested": 5000000,
  "createdAt": "2026-01-24T..."
}
```

### projects collection
```json
{
  "filmmakerIds": ["uid1", "uid2"],
  "title": "My Film",
  "synopsis": "Story description",
  "genre": "drama|comedy|action|...",
  "budget": 5000000,
  "sponsorshipNeeded": 3000000,
  "currentFunding": 1500000,
  "status": "draft|active|funded|in_production|completed",
  "scriptSummary": "Script outline",
  "expectedAudience": "Cinema audiences",
  "releasePlatforms": ["Cinema", "YouTube", "OTT"],
  "expectedReleaseDate": "2026-12-31T...",
  "sponsorshipPackages": [
    {
      "id": "pkg_gold",
      "name": "gold|silver|bronze|custom",
      "amount": 1000000,
      "benefits": ["Logo in credits", "Product placement"],
      "logoPlacement": true,
      "productPlacement": true,
      "socialMediaMentions": 5,
      "creditSize": "Large"
    }
  ],
  "images": ["gs://...", "gs://..."],
  "createdAt": "2026-01-24T...",
  "updatedAt": "2026-01-24T..."
}
```

### applications collection
```json
{
  "projectId": "proj_123",
  "sponsorId": "sponsor_uid",
  "sponsorshipPackageId": "pkg_gold",
  "status": "pending|accepted|rejected|completed",
  "amount": 1000000,
  "applicationDate": "2026-01-24T...",
  "responseDate": "2026-01-25T...",
  "agreementUrl": "gs://...",
  "paymentStatus": "pending|completed|failed",
  "paymentId": "payhere_id"
}
```

### messages collection
```json
{
  "fromUserId": "user_uid_1",
  "toUserId": "user_uid_2",
  "projectId": "proj_123",
  "subject": "Regarding sponsorship",
  "content": "Message content",
  "attachments": ["url1"],
  "isRead": false,
  "createdAt": "2026-01-24T...",
  "updatedAt": "2026-01-24T..."
}
```

### reviews collection
```json
{
  "fromUserId": "user_uid_1",
  "toUserId": "user_uid_2",
  "projectId": "proj_123",
  "rating": 5,
  "comment": "Great experience working together!",
  "createdAt": "2026-01-24T..."
}
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    User Registration                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  POST /api/auth/register
            │  {
            │    email,
            │    password,
            │    fullName,
            │    role: 'filmmaker'|'sponsor',
            │    additionalData
            │  }
            │
            │  ✅ Validation
            │  ✅ Create Firebase User
            │  ✅ Create Firestore Documents
            │  ✅ Return User UID
            └──────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │    User Login        │
            │  (Browser Storage)   │
            │  Store: uid, email   │
            │  Store: auth token   │
            └──────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Authenticated       │
            │  Requests            │
            │  (With JWT Token)    │
            └──────────────────────┘
```

---

**Created:** January 24, 2026  
**Format:** Markdown + ASCII Diagrams  
**Last Updated:** January 24, 2026
