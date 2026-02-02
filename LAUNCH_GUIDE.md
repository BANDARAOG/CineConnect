# 🚀 How to Launch CineConnect Locally

Complete guide to get CineConnect running on your localhost in minutes.

## Quick Launch (3 minutes)

### Option 1: Using Terminal Commands

```bash
# 1. Navigate to the project
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk

# 2. Install dependencies (if not done)
npm install

# 3. Start development server
npm run dev
```

**Result:** Open your browser to **http://localhost:3000**

### Option 2: Using the Startup Script

```bash
# Make the script executable
chmod +x /Users/hirushapathum/Documents/GitHub/cineconnect-lk/start.sh

# Run the script
./start.sh
```

---

## Prerequisites ✅

Before launching, verify you have:

- ✅ **Node.js 18+** installed
  - Check: `node --version`
  - Install from: https://nodejs.org/

- ✅ **npm installed**
  - Check: `npm --version`
  - Comes with Node.js

- ✅ **Project dependencies installed**
  - Done automatically when you run `npm install`

---

## Step-by-Step Launch

### Step 1: Open Terminal

**macOS:**
- Open Terminal app (Cmd + Space, type "Terminal")
- Or open VS Code's integrated terminal (View → Terminal)

**Windows:**
- Open Command Prompt or PowerShell

**Linux:**
- Open your terminal application

### Step 2: Navigate to Project

```bash
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
```

**Verify you're in the right place:**
```bash
pwd  # Should show: /Users/hirushapathum/Documents/GitHub/cineconnect-lk
ls   # Should show: src, public, package.json, etc.
```

### Step 3: Install Dependencies

```bash
npm install
```

**What it does:**
- Downloads all required packages
- Creates `node_modules` folder
- Takes 1-2 minutes
- Only need to do this once

**You should see:**
```
added 357 packages in 2m
found 0 vulnerabilities
```

### Step 4: Start Development Server

```bash
npm run dev
```

**You should see:**
```
> cineconnect-lk@0.1.0 dev
> next dev

  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in XXXms
```

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

**You should see:**
- CineConnect landing page
- Navigation bar with "Login" and "Register" buttons
- Hero section with "Connect Filmmakers with Sponsors"
- Benefits section
- How It Works section
- Footer

---

## Testing the Application

### 1. Test Landing Page
- [ ] Page loads without errors
- [ ] Navigation works
- [ ] All sections visible
- [ ] Responsive design works

### 2. Test Registration
- Click **"Register"** button
- [ ] Registration form opens
- [ ] Can select "Filmmaker" or "Sponsor"
- [ ] Form fields appear based on selection

### 3. Test Login
- Click **"Login"** button
- [ ] Login form opens
- [ ] Email and password fields visible
- [ ] Can enter credentials

### 4. Test Sponsor Dashboard
- After logging in as Sponsor:
- [ ] Dashboard loads
- [ ] Statistics cards visible
- [ ] Tabs work (Projects, Sponsorships, Messages, Analytics)
- [ ] Content changes when switching tabs

---

## Common Issues & Solutions

### Issue: "Port 3000 already in use"

**Solution 1:** Kill the process using port 3000
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2:** Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: "Next.js compilation errors"

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Pages not loading / blank page

**Solution:**
1. Check browser console (F12)
2. Check terminal for errors
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear browser cache

---

## What You Can Do Now

### Without Firebase Setup
✅ Browse landing page
✅ See registration/login pages
✅ View dashboard UI
✅ Test responsive design
✅ Check styling and layout

### With Firebase Setup
✅ Create accounts
✅ Login/logout
✅ Upload profile pictures
✅ Create projects
✅ Send messages
✅ Submit sponsorships
✅ Process payments (with PayHere)

---

## Setting Up Firebase (Optional)

To fully test the application with backend functionality:

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Create Project"
   - Name it "CineConnect"

2. **Get Firebase Credentials**
   - Go to Project Settings
   - Copy Firebase config

3. **Add to `.env.local`**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Restart dev server**
   ```bash
   npm run dev
   ```

See **DEVELOPER_CHECKLIST.md** for complete Firebase setup.

---

## Development Server Commands

### Available npm scripts:

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run TypeScript type checking
npm run type-check

# Run ESLint for code quality
npm run lint
```

---

## Project Structure Overview

```
cineconnect-lk/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── auth/
│   │   │   ├── register/page.tsx # Registration page
│   │   │   └── login/page.tsx    # Login page
│   │   ├── sponsor/
│   │   │   └── dashboard/page.tsx # Sponsor dashboard
│   │   ├── filmmaker/
│   │   │   └── dashboard/page.tsx # Filmmaker dashboard
│   │   └── api/                   # API routes
│   ├── lib/                       # Backend services
│   ├── hooks/                     # Custom React hooks
│   └── types/                     # TypeScript types
├── public/                        # Static files
├── package.json                   # Dependencies
└── .env.example                   # Environment template
```

---

## Browser DevTools

### Check for Errors:
1. Press **F12** (or Cmd+Option+I on Mac)
2. Go to **Console** tab
3. Look for red error messages
4. Check **Network** tab for failed requests

### Useful Tips:
- **Elements** tab: Inspect HTML structure
- **Styles** tab: Check CSS (Tailwind classes)
- **Console** tab: View JavaScript errors
- **Network** tab: Monitor API calls

---

## Next Steps After Launch

1. ✅ **Verify it's running**
   - See the landing page at http://localhost:3000

2. ✅ **Test the UI**
   - Click through pages
   - Check responsive design
   - Test navigation

3. ✅ **Set up Firebase** (if needed)
   - Follow DEVELOPER_CHECKLIST.md
   - Add credentials to .env.local

4. ✅ **Test API endpoints** (with Postman)
   - Install Postman from postman.com
   - Test API routes from ROUTES_GUIDE.md

5. ✅ **Start developing**
   - Make changes to src/
   - Changes auto-refresh
   - Check src/lib/ for backend functions

---

## Stopping the Server

To stop the development server:

```bash
# Press Ctrl+C in the terminal
# Or
Cmd+C on Mac
Ctrl+C on Windows/Linux
```

The server will stop and you can run it again with `npm run dev`.

---

## Useful Documentation

Read these while the server is running:

- **[README.md](./README.md)** - Project overview
- **[BACKEND_GUIDE.md](./BACKEND_GUIDE.md)** - API documentation
- **[ROUTES_GUIDE.md](./ROUTES_GUIDE.md)** - All endpoints
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Navigation guide

---

## Performance Tips

### Optimize Development Experience:

1. **Use VS Code** - Best Next.js integration
2. **Install extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Thunder Client (for API testing)

3. **Enable Fast Refresh:**
   - Already enabled in Next.js
   - Changes save and reload automatically

4. **Use browser DevTools:**
   - React Developer Tools extension
   - Next.js DevTools

---

## Troubleshooting Checklist

- [ ] Node.js 18+ installed
- [ ] npm install completed without errors
- [ ] .env.local created (if using Firebase)
- [ ] Port 3000 not in use
- [ ] No TypeScript errors in terminal
- [ ] Browser shows no errors (F12 → Console)
- [ ] Page loads at http://localhost:3000
- [ ] Navigation works
- [ ] Responsive design works

---

## Getting Help

If you encounter issues:

1. **Check terminal** - Look for error messages
2. **Check browser console** - F12 → Console tab
3. **Read documentation** - DEVELOPER_CHECKLIST.md
4. **Check GitHub issues** - Similar problems solved
5. **Create new issue** - With full error message

---

## Success Indicators ✅

You know it's working when you see:

✅ Server running message in terminal
✅ No errors in browser console
✅ Landing page loads and looks good
✅ Navigation buttons work
✅ Responsive design works on mobile view
✅ All sections display properly

---

## Commands Quick Reference

```bash
# Install and run (first time)
npm install
npm run dev

# Just run (after first time)
npm run dev

# Stop server
Ctrl+C (or Cmd+C on Mac)

# Kill port if needed
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Build for production
npm run build
npm run start
```

---

**🎉 Ready to Launch!**

Run these commands in terminal:
```bash
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
npm install
npm run dev
```

Then open: **http://localhost:3000**

---

**Questions?** Check [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) for all guides.
