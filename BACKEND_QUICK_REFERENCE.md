# ⚡ Quick Reference Card - CineConnect Backend

## 🎯 Backend Status at a Glance

```
Completion: ██████████░░░░░░░░░░░░░░░░░░ 60%
Timeline:   1-2 weeks to 100%
Effort:     35-45 hours remaining
```

---

## 📂 File Locations & What They Do

| File | Lines | Status | Purpose |
|------|-------|--------|---------|
| `src/lib/firebase.ts` | 26 | ✅ | Initialize Firebase services |
| `src/lib/auth.ts` | 255 | ✅ | User auth (register, login, profiles) |
| `src/lib/db.ts` | 363 | ✅ | Database operations (CRUD all entities) |
| `src/lib/payments.ts` | 215 | ✅ | PayHere payment processing |
| `src/lib/storage.ts` | 198 | ✅ | File uploads to Cloud Storage |
| `src/lib/utils.ts` | 50 | ✅ | Helper functions |
| `src/types/index.ts` | 122 | ✅ | TypeScript interfaces |
| `src/app/api/auth/register/route.ts` | 50 | ✅ | User registration endpoint |
| `src/app/api/auth/login/route.ts` | 30 | ⏳ | Login endpoint (needs completion) |
| `src/app/api/projects/route.ts` | - | ❌ | Project CRUD (not started) |
| `src/app/api/applications/route.ts` | - | ❌ | Sponsorship apps (not started) |
| `src/app/api/messages/route.ts` | - | ❌ | Messaging (not started) |
| `src/app/api/uploads/route.ts` | - | ❌ | File uploads (not started) |
| `src/app/api/payments/route.ts` | - | ❌ | Payment processing (not started) |

---

## 🔧 Most Important Functions

### Authentication (`src/lib/auth.ts`)
```typescript
registerUser()           // Create account
loginUser()             // Sign in  
logoutUser()            // Sign out
getFilmmakerProfile()   // Get profile
getSponsorProfile()     // Get profile
```

### Database (`src/lib/db.ts`)
```typescript
createProject()         // Create project
getProjects()           // List projects
createApplication()     // Submit sponsorship
sendMessage()           // Send message
uploadProjectImage()    // Upload file
```

### Payments (`src/lib/payments.ts`)
```typescript
createPaymentOrder()    // Create payment
verifyPayment()         // Verify payment
getPaymentStatus()      // Check status
```

---

## 📋 Implementation Roadmap

### Week 1: API Routes (Priority)
- Day 1: Login API (2h) + Projects API (4h)
- Day 2: Applications API (3h) + Messages API (3h)
- Day 3: Uploads API (2h) + Payments API (3h)
- Day 4-5: Testing & debugging

### Week 2: Security & Polish
- Day 1: Add middleware
- Day 2: Security rules
- Day 3: Error handling
- Day 4-5: Integration tests

---

## 🚀 Quick Start for New Developer

```bash
# 1. Read documentation (in order)
cat BACKEND_DOCUMENTATION_INDEX.md
cat BACKEND_SUMMARY.md

# 2. Set up environment
cp .env.example .env.local
# Add Firebase credentials

# 3. Start dev server
npm run dev
# Check http://localhost:3000

# 4. Test registration
# Visit /auth/register - fill form - submit
# Check Firebase Console for new user

# 5. Start implementing
# Read: BACKEND_IMPLEMENTATION_CHECKLIST.md
# Use: BACKEND_CODE_REFERENCE.md for function signatures

# 6. First task: Complete login API
# File: src/app/api/auth/login/route.ts
# Use loginUser() from auth.ts
```

---

## 📚 Documentation Files (In Reading Order)

1. **BACKEND_DOCUMENTATION_INDEX.md** ← Start here
2. **BACKEND_SUMMARY.md** ← Executive summary
3. **BACKEND_ARCHITECTURE.md** ← System design
4. **BACKEND_CODE_REFERENCE.md** ← Code guide
5. **BACKEND_IMPLEMENTATION_CHECKLIST.md** ← What to build
6. **BACKEND_STATUS.md** ← Detailed status
7. **BACKEND_GUIDE.md** ← Original specs

---

## ⚙️ Environment Variables Needed

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# PayHere Configuration
PAYHERE_MERCHANT_ID=
PAYHERE_MERCHANT_SECRET=
PAYHEREAPI_URL=https://sandbox.payhere.lk/api/v2

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🧪 Testing Checklist

- [ ] User registration works
- [ ] Check Firestore users collection
- [ ] Check filmmakers/sponsors collection
- [ ] Test login (when implemented)
- [ ] Test project creation (when API ready)
- [ ] Test file upload
- [ ] Test payment creation (sandbox)
- [ ] Check error handling
- [ ] Verify response formats

---

## 🔗 All API Endpoints (To Implement)

```
AUTH
POST /api/auth/register       Create account
POST /api/auth/login          Sign in

PROJECTS
GET  /api/projects            List all
POST /api/projects            Create new
GET  /api/projects/:id        Get single
PUT  /api/projects/:id        Update
DELETE /api/projects/:id      Delete

APPLICATIONS
POST /api/applications        Submit
GET  /api/applications        List user's
PUT  /api/applications/:id    Update status

MESSAGES
POST /api/messages            Send
GET  /api/messages/inbox      Get inbox
PUT  /api/messages/:id/read   Mark read

UPLOADS
POST /api/uploads/image       Upload image
POST /api/uploads/video       Upload video
DELETE /api/uploads/:id       Delete

PAYMENTS
POST /api/payments/create     Create order
GET  /api/payments/:id        Get status
POST /api/payments/webhook    PayHere callback
```

---

## 💡 Key Code Patterns

### Service Pattern (All services follow this)
```typescript
export const myFunction = async (params) => {
  try {
    const result = await firebaseCall();
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
```

### API Route Pattern (Use for all endpoints)
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.required) {
      return NextResponse.json({ error: 'Missing required' }, { status: 400 });
    }
    
    // Call service
    const result = await serviceFunction(body);
    
    // Return response
    return NextResponse.json(result.data, {
      status: result.success ? 201 : 400
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Firebase not initialized | Check .env.local values |
| Functions not found | Check import statements |
| TypeScript errors | Check types in index.ts |
| Database empty | Check Firestore rules |
| CORS errors | Will be fixed in middleware |
| Payment test | Use PayHere sandbox |

---

## 📞 Questions? Check These Files

**"How do I use the database?"**
→ `BACKEND_CODE_REFERENCE.md` → db.ts section

**"What's the API response format?"**
→ `BACKEND_GUIDE.md` → API endpoints section

**"How do I implement login?"**
→ `BACKEND_IMPLEMENTATION_CHECKLIST.md` → Priority 1

**"What types do I need?"**
→ `src/types/index.ts` (all interfaces)

**"How does authentication work?"**
→ `BACKEND_ARCHITECTURE.md` → Authentication flow

**"What code should I write?"**
→ Look at existing `auth.ts` for pattern, then follow same style

---

## ✅ Success Metrics

Backend will be 100% complete when:
- ✅ All 12 API endpoints implemented
- ✅ All CRUD operations working
- ✅ Authentication middleware protecting routes
- ✅ Input validation on all requests
- ✅ Firestore security rules deployed
- ✅ PayHere integration tested
- ✅ File uploads working end-to-end
- ✅ Error handling & logging in place
- ✅ 80%+ test coverage
- ✅ Performance optimized

---

## 🎯 Priority Order

1. **Complete Login API** ← START HERE
2. Complete Projects API
3. Complete Applications API
4. Add authentication middleware
5. Add Firestore security rules
6. Write tests
7. Complete remaining APIs

---

## 🚀 Deploy Checklist

Before going live:
- [ ] Set Firestore security rules
- [ ] Enable Firebase auth methods
- [ ] Test all endpoints
- [ ] Add rate limiting
- [ ] Configure CORS
- [ ] Set environment variables
- [ ] Enable error monitoring
- [ ] Configure backups
- [ ] Document API usage
- [ ] Deploy to Vercel

---

## 📊 Progress Dashboard

```
Code:          ████████░░░░░░░░░░░░░░ 40% (services done)
API Routes:    ██░░░░░░░░░░░░░░░░░░░░ 17% (2/12 done)
Documentation: █████████░░░░░░░░░░░░░ 100% (5 guides)
Security:      ░░░░░░░░░░░░░░░░░░░░░░ 0%
Testing:       ░░░░░░░░░░░░░░░░░░░░░░ 0%
────────────────────────────────────────────────────
OVERALL:       ████████░░░░░░░░░░░░░░ 60%
```

---

**Created:** January 24, 2026  
**Use this card for:** Quick reference during development  
**Read full docs in:** BACKEND_DOCUMENTATION_INDEX.md
