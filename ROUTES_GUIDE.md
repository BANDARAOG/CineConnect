# CineConnect Sri Lanka - Page Routes & Navigation Guide

## 🗺️ Complete Site Map

### Public Routes (No Login Required)

#### Landing Pages
| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Landing page with features & benefits | ✅ Complete |
| `/#benefits` | Why Sponsor Films section | ✅ Included |
| `/#how-it-works` | How it works explanation | ✅ Included |
| `/about` | About the platform | ⬜ To be built |
| `/contact` | Contact information | ⬜ To be built |
| `/faq` | Frequently asked questions | ⬜ To be built |

#### Authentication Routes
| Route | Purpose | Status |
|-------|---------|--------|
| `/auth/login` | User login page | ✅ Complete |
| `/auth/register` | User registration page | ✅ Complete |
| `/auth/register?role=filmmaker` | Filmmaker registration | ✅ Complete |
| `/auth/register?role=sponsor` | Sponsor registration | ✅ Complete |
| `/auth/forgot-password` | Password reset page | ⬜ Template ready |

---

### Authenticated Routes

#### Filmmaker Routes
| Route | Purpose | Access | Status |
|-------|---------|--------|--------|
| `/filmmaker/dashboard` | Main filmmaker hub | Filmmaker | ⬜ UI Template |
| `/filmmaker/projects` | My film projects | Filmmaker | ⬜ To be built |
| `/filmmaker/projects/:id` | View/edit specific project | Filmmaker | ⬜ To be built |
| `/filmmaker/create-project` | New project creation | Filmmaker | ⬜ To be built |
| `/filmmaker/applications` | Sponsorship applications received | Filmmaker | ⬜ To be built |
| `/filmmaker/messages` | Messages from sponsors | Filmmaker | ⬜ To be built |
| `/filmmaker/analytics` | Project analytics & stats | Filmmaker | ⬜ To be built |
| `/filmmaker/settings` | Profile & preferences | Filmmaker | ⬜ To be built |
| `/filmmaker/settings/profile` | Edit profile | Filmmaker | ⬜ To be built |
| `/filmmaker/settings/bank-account` | Bank details for payments | Filmmaker | ⬜ To be built |
| `/filmmaker/help` | Help & support | Filmmaker | ⬜ To be built |

#### Sponsor Routes
| Route | Purpose | Access | Status |
|-------|---------|--------|--------|
| `/sponsor/dashboard` | Main sponsor hub | Sponsor | ✅ UI Complete |
| `/sponsor/projects` | Browse all projects | Sponsor | ⬜ To be built |
| `/sponsor/projects/:id` | View project details | Sponsor | ⬜ To be built |
| `/sponsor/applications` | My sponsorships | Sponsor | ⬜ To be built |
| `/sponsor/applications/:id` | View specific sponsorship | Sponsor | ⬜ To be built |
| `/sponsor/messages` | Messages from filmmakers | Sponsor | ⬜ To be built |
| `/sponsor/analytics` | Sponsorship ROI tracking | Sponsor | ⬜ To be built |
| `/sponsor/settings` | Profile & preferences | Sponsor | ⬜ To be built |
| `/sponsor/settings/profile` | Edit company profile | Sponsor | ⬜ To be built |
| `/sponsor/settings/payment` | Payment methods | Sponsor | ⬜ To be built |

#### Admin Routes
| Route | Purpose | Access | Status |
|-------|---------|--------|--------|
| `/admin/dashboard` | Admin panel | Admin | ⬜ To be built |
| `/admin/verify/sponsors` | Verify sponsor accounts | Admin | ⬜ To be built |
| `/admin/verify/filmmakers` | Verify filmmaker accounts | Admin | ⬜ To be built |
| `/admin/disputes` | Handle disputes | Admin | ⬜ To be built |
| `/admin/reports` | Platform analytics | Admin | ⬜ To be built |
| `/admin/users` | Manage users | Admin | ⬜ To be built |
| `/admin/projects` | Manage projects | Admin | ⬜ To be built |
| `/admin/settings` | Platform settings | Admin | ⬜ To be built |

---

## 📱 Mobile Responsive Routes

All routes are responsive:
- **Mobile** (320px - 640px): Single column, hamburger menu
- **Tablet** (641px - 1024px): Two columns where applicable
- **Desktop** (1025px+): Full layout with sidebars

---

## 🔄 Navigation Flow

### User Journey - Filmmaker

```
Landing Page (/)
    ↓
Register as Filmmaker (/auth/register?role=filmmaker)
    ↓
Verify Email (automatic)
    ↓
Complete Profile (/filmmaker/settings/profile)
    ↓
Create Project (/filmmaker/create-project)
    ↓
View Applications (/filmmaker/applications)
    ↓
Accept Sponsorship & Sign Agreement
    ↓
Receive Payment
    ↓
Start Production
    ↓
Share Updates (/filmmaker/projects/:id)
    ↓
Complete Project
    ↓
Get Paid
```

### User Journey - Sponsor

```
Landing Page (/)
    ↓
Register as Sponsor (/auth/register?role=sponsor)
    ↓
Business Verification (Admin approval)
    ↓
Complete Profile (/sponsor/settings/profile)
    ↓
Browse Projects (/sponsor/projects)
    ↓
View Project Details (/sponsor/projects/:id)
    ↓
Apply for Sponsorship
    ↓
Chat with Filmmaker
    ↓
Sign Agreement
    ↓
Make Payment
    ↓
Track Project Progress (/sponsor/applications/:id)
    ↓
View Analytics & ROI (/sponsor/analytics)
```

---

## 🔐 Route Protection

### Public Routes (No Auth Required)
- `/`
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/about`
- `/contact`
- `/faq`

### Filmmaker-Only Routes (Auth + filmmaker role)
- `/filmmaker/*`

### Sponsor-Only Routes (Auth + sponsor role)
- `/sponsor/*`

### Admin-Only Routes (Auth + admin role)
- `/admin/*`

---

## 📊 Dashboard Components

### Filmmaker Dashboard (/filmmaker/dashboard)
- Profile card with verification badge
- Recent projects list
- Pending applications
- Unread messages
- Quick stats (total funded, active projects)
- Quick actions (create project, view applications)

### Sponsor Dashboard (/sponsor/dashboard)
- Company profile card
- Active sponsorships list
- Recent messages
- Analytics summary
- Quick stats (total invested, ongoing projects)
- Quick actions (browse projects, view analytics)

### Admin Dashboard (/admin/dashboard)
- Platform statistics
- Pending verifications
- Dispute resolution
- User management links
- Analytics overview

---

## 🔗 API Routes (Backend)

### Authentication APIs
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Project APIs
- `GET /api/projects` - Get all projects (paginated)
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/search` - Search projects

### Application APIs
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Submit application
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id/accept` - Accept application
- `PUT /api/applications/:id/reject` - Reject application

### Message APIs
- `GET /api/messages` - Get user's messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read
- `DELETE /api/messages/:id` - Delete message

### Payment APIs
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify PayHere webhook
- `GET /api/payments/status/:orderId` - Check payment status

### User APIs
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `POST /api/users/:id/verify` - Start verification (admin)

### Analytics APIs
- `GET /api/analytics/filmmaker/:id` - Filmmaker stats
- `GET /api/analytics/sponsor/:id` - Sponsor stats
- `GET /api/analytics/project/:id` - Project stats

---

## 🎯 Redirect Rules

### After Login
- Filmmakers → `/filmmaker/dashboard`
- Sponsors → `/sponsor/dashboard`
- Admins → `/admin/dashboard`

### After Logout
- All users → `/`

### If Not Authenticated
- Any protected route → `/auth/login?redirect=/intended-route`

### If Already Authenticated
- `/auth/login` → redirect to dashboard
- `/auth/register` → redirect to dashboard

---

## 🔍 URL Parameters

### Registration
- `?role=filmmaker` - Pre-select filmmaker role
- `?role=sponsor` - Pre-select sponsor role

### Login
- `?redirect=/intended-route` - Redirect after login

### Search
- `?q=query` - Search term
- `?genre=drama` - Filter by genre
- `?budget_min=1000000` - Minimum budget
- `?budget_max=10000000` - Maximum budget
- `?sort=newest` - Sort option
- `?page=1` - Page number

---

## 📡 Query Parameters

### Projects List
```
/sponsor/projects?
  genre=drama&
  budget_min=5000000&
  budget_max=20000000&
  sort=newest&
  page=1&
  limit=20
```

### Search
```
/search?
  q=filmmaker+name&
  type=project|filmmaker|sponsor
```

### Pagination
```
?page=1&limit=20
?offset=0&limit=20
```

---

## 🎨 Navigation Components

### Main Navigation (All Pages)
- Logo/Home link
- Search bar
- Help link
- Notifications bell
- User profile dropdown
- Logout button

### Sidebar (Authenticated Users)
- Dashboard link
- Projects/Browse
- Applications
- Messages
- Analytics
- Settings
- Help
- Logout

### Breadcrumbs
Shown on all pages except home and auth
Example: `Home > Filmmaker > Projects > "The Last Kingdom"`

---

## 📦 Page Templates

### Filmmaker Project Page
```
/filmmaker/projects/:id
├── Header (project title, status)
├── Tabs: Details | Applications | Updates | Settings
├── Left Sidebar: Project info
├── Main Content: Project details
└── Right Sidebar: Sponsorship packages
```

### Sponsor Browse Projects
```
/sponsor/projects
├── Header: Browse & Filter
├── Sidebar: Filters
│   ├── Genre
│   ├── Budget range
│   ├── Audience
│   └── Status
└── Main: Projects grid
    └── Project cards
```

### Dashboard
```
/filmmaker/dashboard OR /sponsor/dashboard
├── Header: Welcome message
├── Stats Cards
├── Main Content: 
│   ├── Active projects/sponsorships
│   ├── Recent messages
│   └── Quick actions
└── Sidebar: Quick stats
```

---

## 🔄 Loading States

All routes with data loading show:
- Skeleton loaders
- Loading spinners
- Progress bars (for uploads)
- Empty states with helpful messages

---

## 📋 Status Codes

### Project Status
- `draft` - Not published
- `active` - Accepting sponsorships
- `funded` - All funding received
- `in_production` - Filming in progress
- `completed` - Project finished

### Application Status
- `pending` - Waiting for filmmaker response
- `accepted` - Approved by filmmaker
- `rejected` - Rejected by filmmaker
- `completed` - Project finished, payment done

### User Status
- `unverified` - Awaiting verification
- `verified` - Account verified
- `suspended` - Account suspended
- `active` - Actively using platform

---

## 🌐 External Links

- **Help Center**: `/help`
- **Terms**: `/terms`
- **Privacy**: `/privacy`
- **Contact**: `/contact`
- **Social Media**: Links in footer
- **Support Email**: `support@cineconnect-lk.com`

---

**Last Updated**: January 4, 2026
**Status**: Navigation structure complete, pages being built
