# CineConnect Sri Lanka - Film Sponsorship Platform

## 🎬 Project Overview

**CineConnect Sri Lanka** is a digital platform that connects **filmmakers** with **sponsors** to reduce the high cost of film production in Sri Lanka.

### Two-Sided Marketplace:
- **Filmmakers**: Create projects and find sponsors
- **Sponsors**: Discover projects and invest strategically

---

## ✨ Core Features

### 1. **Authentication System**

**Filmmaker Registration:**
- Email + Phone + Password
- Full Name
- NIC/Student ID (optional)
- Role: Director, Producer, Student, Independent
- Portfolio links (YouTube, Vimeo, IMDb)
- Google OAuth support

**Sponsor Registration:**
- Company Name + Phone + Password
- Business Registration Number (optional)
- Industry Category
- Email verification
- Google & LinkedIn OAuth support

### 2. **Filmmaker Dashboard**

- Create Film Projects with:
  - Title, Synopsis, Genre
  - Budget breakdown
  - Script summary + Pitch deck upload
  - Teaser/mood video
  - Expected audience & release platforms

- Define Sponsorship Packages:
  - 🥇 **Gold** - ₨1,000,000+ (Premium placement, product integration)
  - 🥈 **Silver** - ₨500,000 (Logo placement, mentions)
  - 🥉 **Bronze** - ₨250,000 (Logo in credits, website listing)

- Manage Sponsorships:
  - Track application status
  - View sponsor profiles
  - Chat with sponsors
  - Download agreements
  - Submit project updates

### 3. **Sponsor Dashboard**

- **Browse Projects** with filters:
  - Genre (Drama, Action, Comedy, Documentary, etc.)
  - Budget range
  - Audience type (Students, Professionals, General)

- **Project Details**:
  - View synopsis & pitch deck
  - Watch teaser video
  - See budget breakdown
  - Check filmmaker credentials
  - Review sponsorship benefits

- **Apply for Sponsorship**:
  - Choose sponsorship level
  - Submit application
  - Download agreement
  - Make payment via PayHere

- **Track Investment**:
  - Monitor project progress
  - View brand exposure metrics
  - See social media reach
  - Expected cinema/OTT exposure

### 4. **Why Sponsor Films - Marketing Page**

Benefits explained with real examples:

📢 **Brand Visibility**
- Logo in film credits (thousands of views)
- Brand placement inside the film
- Website & social media promotion
- Cinema & OTT platform exposure

🎥 **Content Marketing**
- Behind-the-scenes footage
- Use film clips for your ads
- BTS content for social media

🌍 **Cultural Impact**
- Support Sri Lankan cinema
- CSR & community building
- Be part of creative history

💰 **Cost-Effective Advertising**
- Lower cost than TV ads
- Long-term ROI (films watched for years)
- Emotional brand connection

### 5. **Communication System**

- In-app messaging between sponsors and filmmakers
- Email notifications
- Real-time notifications
- Project update tracking

### 6. **Verification & Trust**

- Admin verifies sponsor business details
- Filmmaker portfolio verification
- Rating & review system (both parties rate each other)
- Verified badges for trusted users

### 7. **Legal & Contracts**

- Downloadable sponsorship agreement templates
- NDA options
- Digital signature support
- Compliance with Sri Lankan regulations

### 8. **Analytics Dashboard**

**For Sponsors:**
- Brand reach metrics
- Engagement rates
- Social media impressions
- Cinema/OTT views
- Expected audience size

**For Filmmakers:**
- Application tracking
- Funding progress
- Viewer statistics
- Engagement metrics

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React, TypeScript, Tailwind CSS |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod validation |
| **API** | Axios, Next.js API Routes |
| **Auth** | Firebase Auth (Email, Google, LinkedIn) |
| **Database** | Firestore |
| **Storage** | Firebase Cloud Storage |
| **Payments** | PayHere (Sri Lanka) |
| **Hosting** | Vercel |
| **Real-time** | Firestore listeners |

---

## 📁 Project Structure

```
cineconnect-lk/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page with benefits
│   │   ├── layout.tsx                  # Root layout
│   │   ├── auth/
│   │   │   ├── login/page.tsx          # Login page
│   │   │   ├── register/page.tsx       # Registration with role selection
│   │   │   └── forgot-password/        # Password recovery
│   │   ├── sponsor/
│   │   │   ├── dashboard/page.tsx      # Main sponsor dashboard
│   │   │   ├── projects/page.tsx       # Browse film projects
│   │   │   ├── applications/page.tsx   # My sponsorships
│   │   │   ├── messages/page.tsx       # In-app messaging
│   │   │   ├── analytics/page.tsx      # ROI tracking
│   │   │   └── settings/page.tsx       # Profile settings
│   │   ├── filmmaker/
│   │   │   ├── dashboard/page.tsx      # Main filmmaker dashboard
│   │   │   ├── projects/page.tsx       # My projects
│   │   │   ├── create-project/page.tsx # New project form
│   │   │   ├── applications/page.tsx   # Sponsorship applications received
│   │   │   ├── messages/page.tsx       # Conversations with sponsors
│   │   │   └── settings/page.tsx       # Profile settings
│   │   ├── admin/
│   │   │   ├── dashboard/page.tsx      # Admin panel
│   │   │   ├── verify/page.tsx         # Verification management
│   │   │   └── reports/page.tsx        # Platform analytics
│   │   └── api/
│   │       ├── auth/register.ts        # Registration endpoint
│   │       ├── auth/login.ts           # Login endpoint
│   │       ├── projects/route.ts       # Project CRUD
│   │       ├── applications/route.ts   # Application management
│   │       ├── messages/route.ts       # Messaging API
│   │       └── payments/route.ts       # PayHere integration
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SponsorshipPackageCard.tsx
│   │   ├── ApplicationForm.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── firebase.ts                 # Firebase initialization
│   │   ├── auth.ts                     # Auth utilities
│   │   ├── db.ts                       # Database helpers
│   │   └── validation.ts               # Zod validation schemas
│   ├── types/
│   │   └── index.ts                    # All TypeScript interfaces
│   └── hooks/
│       ├── useAuth.ts                  # Authentication hook
│       ├── useProjects.ts              # Projects hook
│       ├── useApplications.ts          # Applications hook
│       └── useMessages.ts              # Messaging hook
├── public/
│   ├── images/
│   ├── icons/
│   └── logo.svg
├── .env.local                          # Environment variables (TEMPLATE)
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── next.config.ts                      # Next.js configuration
├── package.json                        # Dependencies & scripts
├── SETUP_GUIDE.md                      # This file
└── README.md                           # Project documentation
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js, React, TypeScript
- Tailwind CSS & Lucide icons
- Firebase SDK
- Form validation (Zod, React Hook Form)
- HTTP client (Axios)

### 2. Set Up Firebase

1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a new project (name: "CineConnect")
3. Enable these services:
   - Authentication (Email, Google OAuth, LinkedIn)
   - Cloud Firestore Database
   - Cloud Storage

4. Get your config from Firebase Console:
   - Click "Project Settings"
   - Copy Web SDK config

### 3. Create `.env.local` File

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Next Auth (for session management)
NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# PayHere Configuration (when ready for payments)
NEXT_PUBLIC_PAYHERE_MERCHANT_ID=YOUR_MERCHANT_ID
PAYHERE_API_KEY=YOUR_API_KEY
PAYHERE_API_SECRET=YOUR_API_SECRET
```

### 4. Run Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:3000`

### 5. Create Test Data

Once running, you can:
- Register as filmmaker at `/auth/register?role=filmmaker`
- Register as sponsor at `/auth/register?role=sponsor`
- Browse landing page at `/`
- View sponsor dashboard at `/sponsor/dashboard`
- View filmmaker dashboard at `/filmmaker/dashboard`

---

## 📊 Firestore Database Schema

### Collection: `users`
```javascript
{
  id: string (user UID),
  email: string,
  role: "sponsor" | "filmmaker" | "admin",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLogin: Timestamp
}
```

### Collection: `sponsors`
```javascript
{
  userId: string (reference to users),
  companyName: string,
  businessRegNo: string,
  phone: string,
  industryCategory: string,
  verified: boolean,
  verifiedAt: Timestamp,
  profileImage: string (URL),
  website: string,
  bio: string,
  totalInvested: number,
  createdAt: Timestamp
}
```

### Collection: `filmmakers`
```javascript
{
  userId: string (reference to users),
  fullName: string,
  nicNumber: string,
  studentId: string,
  role: "director" | "producer" | "student" | "independent",
  pastWorks: [
    { title: string, url: string, platform: string }
  ],
  verified: boolean,
  verifiedAt: Timestamp,
  profileImage: string (URL),
  bio: string,
  createdAt: Timestamp
}
```

### Collection: `projects`
```javascript
{
  id: string,
  filmmakerIds: [string], // Array of filmmaker UIDs
  title: string,
  synopsis: string,
  genre: string,
  budget: number,
  sponsorshipNeeded: number,
  currentFunding: number,
  status: "draft" | "active" | "funded" | "in_production" | "completed",
  scriptSummary: string,
  pitchDeckUrl: string,
  teaserUrl: string,
  moodBoardUrl: string,
  expectedAudience: string,
  releasePlatforms: ["Cinema", "YouTube", "Netflix", ...],
  expectedReleaseDate: Timestamp,
  images: [string], // URLs
  sponsorshipPackages: [
    {
      id: string,
      name: "gold" | "silver" | "bronze" | "custom",
      amount: number,
      benefits: [string],
      logoPlacement: boolean,
      productPlacement: boolean,
      socialMediaMentions: number,
      creditSize: "small" | "medium" | "large"
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `applications`
```javascript
{
  id: string,
  projectId: string (reference),
  sponsorId: string (reference),
  sponsorshipPackageId: string,
  status: "pending" | "accepted" | "rejected" | "completed",
  amount: number,
  applicationDate: Timestamp,
  responseDate: Timestamp,
  agreementUrl: string,
  paymentStatus: "pending" | "completed" | "failed",
  paymentId: string, // PayHere transaction ID
  createdAt: Timestamp
}
```

### Collection: `messages`
```javascript
{
  id: string,
  fromUserId: string,
  toUserId: string,
  projectId: string,
  subject: string,
  content: string,
  attachments: [string], // URLs
  isRead: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `reviews`
```javascript
{
  id: string,
  fromUserId: string,
  toUserId: string,
  projectId: string,
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string,
  createdAt: Timestamp
}
```

---

## 🔐 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read their own data
    match /users/{document=**} {
      allow read: if request.auth.uid == document;
      allow write: if request.auth.uid == document;
    }
    
    // Sponsors collection
    match /sponsors/{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
    
    // Filmmakers collection
    match /filmmakers/{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
    
    // Projects collection
    match /projects/{document=**} {
      allow read: if true; // Public read
      allow create: if request.auth.uid != null;
      allow update: if request.auth.uid in resource.data.filmmakerIds;
      allow delete: if request.auth.uid in resource.data.filmmakerIds;
    }
    
    // Applications
    match /applications/{document=**} {
      allow read: if request.auth.uid == resource.data.sponsorId || 
                     request.auth.uid in get(/databases/$(database)/documents/projects/$(resource.data.projectId)).data.filmmakerIds;
      allow create: if request.auth.uid != null;
      allow update: if request.auth.uid == resource.data.sponsorId ||
                       request.auth.uid in get(/databases/$(database)/documents/projects/$(resource.data.projectId)).data.filmmakerIds;
    }
    
    // Messages
    match /messages/{document=**} {
      allow read: if request.auth.uid == resource.data.fromUserId || 
                     request.auth.uid == resource.data.toUserId;
      allow create: if request.auth.uid == resource.data.fromUserId;
    }
  }
}
```

---

## 💳 PayHere Integration

### Payment Flow:

1. **Sponsor initiates payment** in application form
2. **Create order** at `/api/payments/create`
3. **Redirect to PayHere** payment page
4. **Sponsor completes payment**
5. **PayHere webhook** confirms transaction
6. **Update application status** to "completed"
7. **Transfer payment** to filmmaker account

### PayHere API Usage:

```javascript
// Create payment
POST /api/payments/create
{
  applicationId: string,
  amount: number,
  sponsorEmail: string,
  projectTitle: string
}

// Webhook endpoint
POST /api/payments/webhook
{
  merchant_id: string,
  status_code: number,
  transaction_id: string,
  payhere_amount: number,
  order_id: string,
  custom_1: string // applicationId
}
```

---

## 📈 Future Enhancements

### Phase 2:
- Video streaming for teasers (using Vimeo API)
- Email notifications (SendGrid)
- SMS alerts (Twilio)
- Advanced search & recommendations

### Phase 3:
- Mobile app (React Native)
- Live chat support
- Analytics export (PDF/Excel)
- Blockchain transparency

### Phase 4:
- AI-powered project recommendations
- Smart contract integration
- Commission payment automation
- Multi-currency support

---

## 🧪 Testing

### Development:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
npm start
```

### Lint code:
```bash
npm run lint
```

---

## 🚢 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial CineConnect setup"
   git push origin main
   ```

2. **Import on Vercel:**
   - Visit vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

5. **Custom Domain:**
   - Go to Settings → Domains
   - Add your custom domain (e.g., cineconnect-lk.com)

---

## 📞 Support

For issues:
- Check GitHub Issues
- Review Firebase documentation
- Contact: support@cineconnect-lk.com

---

## 📄 License

MIT License - Free to use and modify

---

**Ready to revolutionize Sri Lankan cinema! 🎬🚀**
