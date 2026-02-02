# 🎯 Backend Implementation Checklist

## Priority 1: Complete Authentication (Do First)

### Login API Route - `/api/auth/login/route.ts`
- [ ] Implement Firebase authentication with `signInWithEmailAndPassword()`
- [ ] Create JWT session token
- [ ] Set secure HTTP-only cookie
- [ ] Return user role and permissions
- [ ] Handle error cases (invalid credentials, account locked)

**Current Issue:** Template only has TODO comments

---

## Priority 2: Implement Core API Routes (This Week)

### 1. Projects API - `/api/projects/route.ts`
```
Routes to implement:
- GET /api/projects          → List all projects with filters
- POST /api/projects         → Create new project (filmmaker only)
- GET /api/projects/:id      → Get single project
- PUT /api/projects/:id      → Update project (filmmaker only)
- DELETE /api/projects/:id   → Delete project (filmmaker only)
```

**Database Functions Available:** ✅ All CRUD functions exist in `db.ts`

### 2. Applications API - `/api/applications/route.ts`
```
Routes to implement:
- POST /api/applications                    → Submit sponsorship
- GET /api/applications/sponsor             → Get sponsor's applications
- GET /api/applications/project/:id         → Get project applications
- PUT /api/applications/:id                 → Update status (filmmaker only)
- DELETE /api/applications/:id              → Withdraw application
```

**Database Functions Available:** ✅ All functions exist in `db.ts`

### 3. Messages API - `/api/messages/route.ts`
```
Routes to implement:
- POST /api/messages                        → Send message
- GET /api/messages/inbox                   → Get user's messages
- GET /api/messages/conversation/:userId    → Get thread with user
- PUT /api/messages/:id/read                → Mark as read
```

**Database Functions Available:** ✅ All functions exist in `db.ts`

### 4. Uploads API - `/api/uploads/route.ts`
```
Routes to implement:
- POST /api/uploads/image        → Upload profile/project image
- POST /api/uploads/video        → Upload teaser video
- POST /api/uploads/document     → Upload contract/agreement
- DELETE /api/uploads/:fileId    → Delete file
```

**Storage Functions Available:** ✅ All functions exist in `storage.ts`

### 5. Payments API - `/api/payments/route.ts`
```
Routes to implement:
- POST /api/payments/create              → Create payment order
- POST /api/payments/verify/:paymentId   → Verify payment
- GET /api/payments/status/:paymentId    → Check payment status
- POST /api/payments/webhook             → Handle PayHere callback
```

**Payment Functions Available:** ✅ All functions exist in `payments.ts`

---

## Priority 3: Add Middleware & Security

### Authentication Middleware
- [ ] Verify JWT token
- [ ] Attach user to request
- [ ] Return 401 if unauthorized

### Authorization Middleware  
- [ ] Check user role
- [ ] Verify resource ownership
- [ ] Return 403 if unauthorized

### Input Validation
- [ ] Email format validation
- [ ] Password strength validation
- [ ] Required fields validation
- [ ] Data type validation

### Error Handling
- [ ] Global error wrapper
- [ ] Firebase error mapping
- [ ] Consistent error response format
- [ ] Logging

---

## Firebase Setup Required

### Collections to Create
- [ ] `users` - Base user data
- [ ] `filmmakers` - Filmmaker profiles
- [ ] `sponsors` - Sponsor profiles
- [ ] `projects` - Film projects
- [ ] `applications` - Sponsorship applications
- [ ] `messages` - Direct messaging
- [ ] `reviews` - Ratings/reviews

### Security Rules
```firestore
// Example (needs customization)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // User can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## Testing Checklist

### Manual Testing
- [ ] Test registration on `/auth/register`
- [ ] Test login on `/auth/login`
- [ ] Test project creation
- [ ] Test sponsorship application
- [ ] Test file uploads
- [ ] Test payments (sandbox)

### With Postman/Insomnia
- [ ] POST /api/auth/register
- [ ] POST /api/auth/login
- [ ] POST /api/projects
- [ ] GET /api/projects
- [ ] POST /api/applications
- [ ] POST /api/messages

### Firebase Console
- [ ] Check auth users created
- [ ] Verify Firestore documents
- [ ] Check storage files uploaded
- [ ] Monitor real-time activity

---

## Environment Setup

### Required `.env.local`
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
PAYHERE_MERCHANT_ID=
PAYHERE_MERCHANT_SECRET=
```

### Firebase Project Setup
1. [ ] Create Firebase project
2. [ ] Enable Authentication (Email/Password)
3. [ ] Create Firestore database
4. [ ] Set up Cloud Storage
5. [ ] Configure security rules
6. [ ] Get credentials from Settings

### PayHere Setup
1. [ ] Register with PayHere
2. [ ] Get merchant credentials
3. [ ] Set up return/notify URLs
4. [ ] Test with sandbox

---

## Code Quality

- [ ] Add TypeScript types to all endpoints
- [ ] Add JSDoc comments
- [ ] Add error handling
- [ ] Add request validation
- [ ] Add logging

---

## Performance Optimization

- [ ] Add Firebase indexes
- [ ] Cache frequently accessed data
- [ ] Optimize queries with limits
- [ ] Add pagination to list endpoints
- [ ] Compress file uploads

---

## Estimated Timeline

| Task | Hours | Timeline |
|------|-------|----------|
| Complete API routes | 12-16 | 2-3 days |
| Add middleware | 6-8 | 1 day |
| Security rules | 4-6 | Half day |
| Testing | 8-10 | 1-2 days |
| Documentation | 4-6 | 1 day |
| **Total** | **34-46** | **1-2 weeks** |

---

## Dependencies Status

✅ All required npm packages installed:
- `firebase` - Firebase SDK
- `axios` - HTTP client  
- `next` - Next.js framework
- `typescript` - Type safety

Check with:
```bash
npm list firebase axios next typescript
```

---

## Links to Resources

- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PayHere API Docs](https://payhere.lk/api)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Cloud Storage](https://firebase.google.com/docs/storage)

---

**Created:** January 24, 2026  
**Priority:** HIGH  
**Status:** In Progress
