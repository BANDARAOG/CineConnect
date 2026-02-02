# 🎬 CineConnect - Quick Reference Card

## ✅ YOUR WEBSITE IS RUNNING!

```
🌐 http://localhost:3000
```

Press `Ctrl+C` to stop the server.

---

## 📍 Pages to Check

| Page | URL | Status |
|------|-----|--------|
| Landing | http://localhost:3000 | ✅ Live |
| Filmmaker Register | http://localhost:3000/auth/register?role=filmmaker | ✅ Live |
| Sponsor Register | http://localhost:3000/auth/register?role=sponsor | ✅ Live |
| Login | http://localhost:3000/auth/login | ✅ Live |
| Sponsor Dashboard | http://localhost:3000/sponsor/dashboard | ✅ Live |
| Filmmaker Dashboard | http://localhost:3000/filmmaker/dashboard | ✅ Live |
| Admin Panel | http://localhost:3000/admin | ✅ Live |

---

## 🔧 Essential Setup Steps

### 1. Firebase Setup (Required)
- [ ] Go to https://firebase.google.com
- [ ] Create new project "cineconnect-lk"
- [ ] Enable: Authentication (Email/Password)
- [ ] Enable: Firestore Database
- [ ] Enable: Cloud Storage
- [ ] Get credentials from Project Settings
- [ ] Update `.env.local` with Firebase config

### 2. PayHere Setup (For Payments)
- [ ] Go to https://payhere.lk/merchant/
- [ ] Register & get merchant ID + secret
- [ ] Use sandbox credentials for testing
- [ ] Update `.env.local` with PayHere config

### 3. Start Coding!
- [ ] Implement authentication backend
- [ ] Create database operations
- [ ] Build payment processing
- [ ] Add messaging system

---

## 💻 Development Commands

```bash
# Start server (already running!)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for lint errors
npm run lint
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | 🔐 Your credentials (KEEP SECRET!) |
| `src/app/api/` | 🔌 API endpoints to build |
| `src/lib/` | 🛠️ Utility functions |
| `src/components/` | 🎨 React components |
| `src/hooks/` | 🎣 Custom React hooks |

---

## 🚀 Build Sequence

1. **Setup** (Today)
   - Firebase ✅
   - PayHere ✅
   - Environment variables ✅

2. **Week 1: Authentication**
   - User registration
   - User login
   - Password reset
   - Profile management

3. **Week 2-3: Projects**
   - Create projects
   - Browse projects
   - Search & filter
   - Track funding

4. **Week 4: Sponsorship**
   - Submit applications
   - Manage applications
   - Track status

5. **Week 5: Payments**
   - PayHere integration
   - Payment processing
   - Webhooks

6. **Week 6: Messaging**
   - Real-time chat
   - Notifications
   - Message history

7. **Week 7+: Polish**
   - Testing
   - Optimization
   - Deployment

---

## 🆘 Quick Fixes

**Server won't start?**
```bash
rm -rf .next
npm run dev
```

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Dependencies broken?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Read These

1. `LOCAL_SETUP_GUIDE.md` ← Full setup guide
2. `BACKEND_GUIDE.md` ← Backend architecture
3. `DEVELOPMENT_ROADMAP.md` ← 8-week plan with 47 tasks

---

## 🎯 Today's Goal

- ✅ Frontend is running
- ⬜ Set up Firebase
- ⬜ Set up PayHere
- ⬜ Start backend implementation

---

**Questions?** Check the documentation files or the code comments in `/src`.

**Ready to code?** Start with Firebase setup, then follow `BACKEND_GUIDE.md` for implementation examples!
