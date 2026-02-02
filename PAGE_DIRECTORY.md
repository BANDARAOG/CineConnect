# 🎬 CineConnect - Page Directory & Testing Guide

## 🌐 Live Website

**Base URL:** `http://localhost:3000`

---

## 📄 All Available Pages

### Public Pages (No Login Required)

#### 1. Landing Page
**URL:** `http://localhost:3000`  
**Description:** Hero section, features, benefits, call-to-action  
**Features:**
- Navigation bar with role selection
- Hero headline & subheading
- "How it works" section
- Benefits for filmmakers & sponsors
- Call-to-action buttons
- Footer with links

**Test:** ✅ Load homepage and verify all sections display correctly

---

#### 2. Filmmaker Registration
**URL:** `http://localhost:3000/auth/register?role=filmmaker`  
**Description:** Sign up form for filmmakers  
**Form Fields:**
- Full Name
- Email
- Password
- Role (Director, Producer, etc.)
- NIC / ID Number
- Portfolio URL (optional)
- Terms & Conditions checkbox
- "Already have account?" link to login

**Test:** ✅ Fill form and check validation messages

---

#### 3. Sponsor Registration
**URL:** `http://localhost:3000/auth/register?role=sponsor`  
**Description:** Sign up form for companies/sponsors  
**Form Fields:**
- Company Name
- Email
- Password
- Business Registration Number (optional)
- Industry Category
- Contact Person
- Contact Phone
- Terms & Conditions checkbox
- "Already have account?" link to login

**Test:** ✅ Fill form and check validation messages

---

#### 4. Login Page
**URL:** `http://localhost:3000/auth/login`  
**Description:** User authentication form  
**Form Fields:**
- Email
- Password
- "Remember me" checkbox
- "Forgot password?" link
- "Create account?" link to register

**Test:** ✅ Check form styling and error message display

---

### User Dashboards (Login Required - Not Yet Implemented)

#### 5. Filmmaker Dashboard
**URL:** `http://localhost:3000/filmmaker/dashboard`  
**Description:** Project management interface for filmmakers  
**Planned Features:**
- Create new project
- View my projects
- Track sponsorships
- Message sponsors
- Analytics & progress tracking

**Current Status:** UI template created ⏳ Backend needed

**Test:** ✅ Load page and verify layout structure

---

#### 6. Sponsor Dashboard
**URL:** `http://localhost:3000/sponsor/dashboard`  
**Description:** Project discovery and investment interface  
**Planned Features:**
- Browse projects with filters
- View project details
- Apply for sponsorship
- Track investments
- Message filmmakers

**Current Status:** UI template created ⏳ Backend needed

**Test:** ✅ Load page and verify layout structure

---

### Admin Interface

#### 7. Admin Panel
**URL:** `http://localhost:3000/admin`  
**Description:** Administrative dashboard  
**Planned Features:**
- User management
- Project verification
- Application review
- Payment tracking
- Platform analytics

**Current Status:** UI template created ⏳ Backend needed

**Test:** ✅ Load page and verify layout structure

---

## 🧪 Testing Checklist

### Visual Testing
- [ ] Landing page loads without errors
- [ ] All images load correctly
- [ ] Navigation links work
- [ ] Pages are responsive (test on mobile/tablet)
- [ ] Colors and fonts match design system
- [ ] Forms are aligned and properly styled

### Functional Testing (Frontend Only)
- [ ] Links navigate to correct pages
- [ ] Form inputs accept user input
- [ ] Form validation shows error messages
- [ ] Role selection works (filmmaker/sponsor)
- [ ] "Remember me" checkbox toggles
- [ ] Password field masks input

### Responsive Design Testing
**Test at these viewport sizes:**
- [ ] Mobile: 375px (iPhone SE)
- [ ] Tablet: 768px (iPad)
- [ ] Desktop: 1920px (Full HD)
- [ ] Desktop XL: 2560px (4K)

### Browser Testing
- [ ] Safari
- [ ] Chrome
- [ ] Firefox
- [ ] Edge

---

## 📊 Page Structure

### Landing Page Components
```
Header
├── Logo/Brand
├── Navigation Menu
│   ├── "Sign in"
│   ├── "Become a Filmmaker"
│   └── "Become a Sponsor"
└── Role selector

Hero Section
├── Headline
├── Subheading
└── CTA Buttons

Features Section
├── Feature 1: For Filmmakers
├── Feature 2: For Sponsors
└── Feature 3: How it works

Benefits Section
├── Filmmaker Benefits
└── Sponsor Benefits

Call-to-Action Section
├── Primary CTA
└── Secondary CTA

Footer
├── Links
├── Contact Info
└── Social Media
```

### Registration Page Components
```
Page Layout
├── Header with back button
├── Form Container
│   ├── Title
│   ├── Form Fields
│   │   ├── Text inputs
│   │   ├── Email input
│   │   ├── Password input
│   │   ├── Select dropdown
│   │   └── Checkbox
│   ├── Submit Button
│   └── Link to login
└── Footer
```

---

## 🔄 Navigation Flow

```
Homepage (/)
├── Click "Sign up as Filmmaker"
│   └── /auth/register?role=filmmaker
│       ├── Click "Sign in instead"
│       │   └── /auth/login
│       │       ├── Click "Create account"
│       │       │   └── Back to /auth/register
│       │       └── Click "Forgot password?"
│       │           └── Password reset (not yet built)
│       └── Click "Sign up"
│           └── /filmmaker/dashboard (after auth)
│
├── Click "Sign up as Sponsor"
│   └── /auth/register?role=sponsor
│       └── Similar flow as filmmaker
│
├── Click "Sign in"
│   └── /auth/login
│       └── /filmmaker/dashboard or /sponsor/dashboard
│
└── Navigation Menu
    ├── "About" → Section on homepage
    ├── "How it works" → Section on homepage
    ├── "Contact" → (not yet built)
    └── "FAQ" → (not yet built)
```

---

## 🎨 Design System Used

### Colors
- **Primary Red:** #EF4444 (Action buttons, highlights)
- **Primary Blue:** #3B82F6 (Secondary actions)
- **Dark Gray:** #1F2937 (Text, headers)
- **Light Gray:** #F3F4F6 (Backgrounds)
- **Success Green:** #10B981 (Confirmations)
- **Error Red:** #EF4444 (Error messages)

### Typography
- **Headings:** Inter, Bold (24px - 48px)
- **Body:** Inter, Regular (14px - 16px)
- **Small:** Inter, Regular (12px - 14px)

### Components
- **Buttons:** 48px height, 12px padding, rounded corners
- **Inputs:** Full width, 40px height, gray border
- **Cards:** White background, subtle shadow, rounded corners
- **Spacing:** 16px grid system

---

## 🚀 Starting the Development Server

```bash
# Navigate to project
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk

# Start development server (if not already running)
npm run dev

# Open browser to
http://localhost:3000
```

---

## ⚡ Hot Reload Testing

The development server supports hot reload (changes update instantly):

1. Open `src/app/page.tsx` in editor
2. Change text in one of the headings
3. Watch the browser update automatically (no refresh needed)
4. Undo the change to restore

---

## 📸 Screenshots

When testing, capture screenshots of:
- [ ] Homepage on desktop
- [ ] Homepage on mobile
- [ ] Filmmaker registration form
- [ ] Sponsor registration form
- [ ] Login page
- [ ] Dashboard pages

These will be helpful for documenting your progress.

---

## 🐛 Common Issues While Testing

### Pages not loading?
- Check browser console for errors (F12)
- Verify development server is still running
- Try hard refresh (Cmd+Shift+R on Mac)

### Form not submitting?
- This is expected - backend not yet implemented
- Frontend validation should still work
- Check that required fields show error messages

### Styling looks wrong?
- Check that Tailwind CSS is building
- Look at browser DevTools for CSS errors
- Verify PostCSS is configured correctly

### Navigation not working?
- Check that URLs in links are correct
- Verify routes exist in `src/app/`
- Check browser console for routing errors

---

## ✅ Full Testing Checklist

### Phase 1: Visual Inspection
- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Typography is correct
- [ ] Colors match design system
- [ ] Layout is responsive

### Phase 2: Navigation
- [ ] All links work
- [ ] Back button works
- [ ] Navigation menu works
- [ ] Role-based routing works
- [ ] URL parameters work (?role=filmmaker)

### Phase 3: Forms
- [ ] All form fields are accessible
- [ ] Input accepts text/email/numbers
- [ ] Password field hides input
- [ ] Validation messages appear
- [ ] Checkboxes toggle correctly
- [ ] Dropdowns open and close

### Phase 4: Responsive Design
- [ ] Mobile layout stacks correctly
- [ ] Touch targets are large enough (48px minimum)
- [ ] Text is readable at all sizes
- [ ] No horizontal scrolling on mobile
- [ ] Tablet layout is optimized

### Phase 5: Accessibility
- [ ] Form labels exist (for screen readers)
- [ ] Color contrast is sufficient (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] No automatic redirects

---

## 📝 Test Report Template

When you've tested all pages, create a test report:

```markdown
# Test Report - [Date]

## Browser & Device
- Browser: Chrome/Safari/Firefox
- OS: macOS/Windows/iOS/Android
- Screen Size: 1920x1080 / 375x812

## Pages Tested
- [✅/❌] Landing page
- [✅/❌] Filmmaker registration
- [✅/❌] Sponsor registration
- [✅/❌] Login page
- [✅/❌] Filmmaker dashboard
- [✅/❌] Sponsor dashboard
- [✅/❌] Admin panel

## Issues Found
1. Issue #1: Description
2. Issue #2: Description

## Performance
- Page load time: X seconds
- Time to interactive: X seconds
- Lighthouse score: X/100

## Notes
- Overall experience is smooth
- No critical issues found
- Ready for backend development
```

---

## 🎯 Next Steps After Testing

Once all pages are tested and working:

1. ✅ Frontend testing complete
2. ⏳ Set up Firebase (BACKEND_GUIDE.md)
3. ⏳ Implement authentication APIs
4. ⏳ Connect forms to backend
5. ⏳ Build dashboard functionality
6. ⏳ Add payment processing
7. ⏳ Deploy to production

---

## 📚 Related Documentation

- **SETUP_COMPLETE.md** - Setup and next steps
- **QUICK_REFERENCE.md** - Quick commands
- **BACKEND_GUIDE.md** - Backend architecture
- **DEVELOPMENT_ROADMAP.md** - Implementation plan

---

**Happy Testing! 🎬**

All pages are live and ready to explore. Start with the homepage and work your way through each page methodically.
