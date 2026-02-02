# Developer Setup Checklist ✅

Complete this checklist to get CineConnect running locally and ready for development.

## Phase 1: Prerequisites (15 minutes)

- [ ] Install Node.js 18+ ([nodejs.org](https://nodejs.org))
- [ ] Install npm or yarn (comes with Node.js)
- [ ] Install Git ([git-scm.com](https://git-scm.com))
- [ ] Create Firebase account ([firebase.google.com](https://firebase.google.com))
- [ ] Create PayHere account ([payhere.lk](https://www.payhere.lk/merchant/)) - optional for testing
- [ ] Install a code editor (VS Code recommended)

## Phase 2: Firebase Setup (30 minutes)

### Firebase Project Creation
- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Click "Create a new project"
- [ ] Name it "CineConnect" or similar
- [ ] Accept terms and create project
- [ ] Wait for project to initialize

### Firebase Authentication Setup
- [ ] Go to **Build → Authentication**
- [ ] Click **Get started**
- [ ] Enable **Email/Password** provider
  - [ ] Enable Email Link (passwordless)
- [ ] Enable **Google** provider
  - [ ] Add email and project name
- [ ] Enable **LinkedIn** provider (optional)
  - [ ] Provide LinkedIn OAuth credentials

### Firebase Firestore Setup
- [ ] Go to **Build → Firestore Database**
- [ ] Click **Create database**
- [ ] Select **United States** region
- [ ] Start in **Production mode**
- [ ] Click **Create**
- [ ] Go to **Rules** tab
- [ ] Replace with rules from SETUP_GUIDE.md
- [ ] Click **Publish**

### Firebase Cloud Storage Setup
- [ ] Go to **Build → Storage**
- [ ] Click **Get started**
- [ ] Choose default location
- [ ] Click **Done**
- [ ] Go to **Rules** tab
- [ ] Update with appropriate rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{projectId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /agreements/{appId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
- [ ] Click **Publish**

### Get Firebase Credentials
- [ ] Go to **Project Settings** (gear icon)
- [ ] Select your web app
- [ ] Copy Firebase config:
```javascript
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```
- [ ] Save these values for `.env.local`

## Phase 3: Project Setup (20 minutes)

- [ ] Clone repository
```bash
git clone https://github.com/hirushapathum/cineconnect-lk.git
cd cineconnect-lk
```

- [ ] Install dependencies
```bash
npm install
```

- [ ] Create `.env.local` file
```bash
cp .env.example .env.local
```

- [ ] Fill in `.env.local` with Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- [ ] Add PayHere credentials (optional):
```env
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_MERCHANT_SECRET=your_merchant_secret
```

- [ ] Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```
- [ ] Add to `.env.local`:
```env
NEXTAUTH_SECRET=generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Phase 4: Local Development (10 minutes)

- [ ] Start development server
```bash
npm run dev
```

- [ ] Verify server running:
  - [ ] Open [http://localhost:3000](http://localhost:3000)
  - [ ] See landing page
  - [ ] Navigation works
  - [ ] No console errors

- [ ] Test registration:
  - [ ] Click "Get Started" or "Register"
  - [ ] Go through registration form
  - [ ] Fill in test filmmaker data
  - [ ] Submit registration

- [ ] Test login:
  - [ ] Log out or new browser
  - [ ] Click "Login"
  - [ ] Enter test credentials
  - [ ] Verify redirect to dashboard

## Phase 5: Firebase Connection (15 minutes)

- [ ] Verify Firebase connection:
  - [ ] Open browser DevTools (F12)
  - [ ] Check console for errors
  - [ ] Look for Firebase initialization messages

- [ ] Check Firestore:
  - [ ] Go to Firebase Console → Firestore
  - [ ] Verify collections auto-created:
    - [ ] `users` (after registration)
    - [ ] `filmmakers` (after filmmaker registers)
    - [ ] `sponsors` (after sponsor registers)

- [ ] Test File Upload:
  - [ ] Go to profile settings
  - [ ] Upload profile picture
  - [ ] Verify in Firebase Storage → profiles/

## Phase 6: API Testing (20 minutes)

### Using Terminal/curl
- [ ] Test GET projects endpoint:
```bash
curl -X GET http://localhost:3000/api/projects?status=active
```

- [ ] Test POST projects (requires auth token):
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"filmmakerIds":["test"],"title":"Test","synopsis":"Test","genre":"drama","budget":1000000,"sponsorshipNeeded":500000}'
```

### Using Postman (Alternative)
- [ ] Download [Postman](https://www.postman.com/downloads/)
- [ ] Import collection from docs/postman-collection.json
- [ ] Set up environment variables
- [ ] Run requests with proper auth

- [ ] Test each endpoint:
  - [ ] GET /api/projects
  - [ ] POST /api/projects
  - [ ] GET /api/applications
  - [ ] POST /api/applications
  - [ ] GET /api/messages
  - [ ] POST /api/messages

## Phase 7: Development Environment (15 minutes)

### VS Code Extensions (Recommended)
- [ ] Install ESLint extension
- [ ] Install Prettier extension
- [ ] Install Thunder Client (API testing)
- [ ] Install Firebase Explorer
- [ ] Install Tailwind CSS IntelliSense

### VS Code Settings
- [ ] Format on save enabled
- [ ] ESLint auto-fix enabled

### Git Setup
- [ ] Initialize git (already done)
- [ ] Configure git user:
```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```
- [ ] Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

## Phase 8: Documentation Review (20 minutes)

**Read in order:**
1. [ ] README.md - Overview
2. [ ] QUICK_START.md - Quick reference
3. [ ] BACKEND_GUIDE.md - API documentation
4. [ ] BACKEND_SUMMARY.md - What was built
5. [ ] SETUP_GUIDE.md - Database schema
6. [ ] ROUTES_GUIDE.md - Endpoint details

## Phase 9: Project Structure Understanding (15 minutes)

- [ ] Review folder structure:
  - [ ] `src/app` - Pages and API routes
  - [ ] `src/lib` - Business logic and utilities
  - [ ] `src/hooks` - React hooks
  - [ ] `src/types` - TypeScript types
  - [ ] `public` - Static files

- [ ] Understand key files:
  - [ ] `src/lib/firebase.ts` - Firebase initialization
  - [ ] `src/lib/auth.ts` - Authentication (220 lines)
  - [ ] `src/lib/db.ts` - Database operations (340 lines)
  - [ ] `src/hooks/index.ts` - Custom hooks (360 lines)

## Phase 10: Ready for Development! 🚀

### Your First Task Options:
1. **Build Filmmaker Dashboard** - Create `/app/filmmaker/dashboard/page.tsx`
2. **Add Project Detail Page** - Create `/app/projects/[id]/page.tsx`
3. **Implement Messaging UI** - Create messages page with real-time updates
4. **Add Analytics** - Create analytics dashboard with charts
5. **Enhance Error Handling** - Add global error boundary

### Development Workflow:
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Commit frequently
git commit -m "describe your changes"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## 🐛 Troubleshooting

### Module not found errors
- [ ] Run `npm install` again
- [ ] Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Firebase connection errors
- [ ] Verify `.env.local` has correct values
- [ ] Check Firebase project is active
- [ ] Ensure security rules are published

### Port 3000 already in use
- [ ] Kill process: `lsof -i :3000` then `kill -9 <PID>`
- [ ] Or use different port: `npm run dev -- -p 3001`

### Build errors
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Clear Next.js cache: `rm -rf .next && npm run dev`

### Authentication issues
- [ ] Clear browser cookies/localStorage
- [ ] Check email is correct format
- [ ] Verify password is at least 6 characters

## ✅ Verification Checklist

After completing setup, verify:
- [ ] Development server runs without errors
- [ ] Landing page loads and looks good
- [ ] Can register as filmmaker
- [ ] Can register as sponsor
- [ ] Can login with registered account
- [ ] Dashboard shows after login
- [ ] Can upload profile image
- [ ] Can see projects list
- [ ] API endpoints respond correctly
- [ ] No console errors in DevTools

## 📞 Getting Help

If you encounter issues:
1. **Check Documentation** - See BACKEND_GUIDE.md or SETUP_GUIDE.md
2. **Check GitHub Issues** - Someone may have same problem
3. **Ask in Issues** - Create a new GitHub issue with details
4. **Check Firebase Docs** - For Firebase-related issues

## 🎓 Learning Paths

**Beginner:**
- Master Next.js basics: [Learn Next.js](https://nextjs.org/learn)
- Understand React: [React Docs](https://react.dev)
- Learn Tailwind: [Tailwind Docs](https://tailwindcss.com/docs)

**Intermediate:**
- Firebase Firestore: [Firestore Guide](https://firebase.google.com/docs/firestore)
- TypeScript: [TypeScript Handbook](https://www.typescriptlang.org/docs)
- API Design: Create and test new endpoints

**Advanced:**
- Implement features from DEVELOPMENT_ROADMAP.md
- Optimize performance
- Add monitoring and logging
- Set up CI/CD pipeline

---

**Congratulations! You're ready to develop on CineConnect! 🎉**

Time to Complete: **2.5-3 hours** (first time setup)
