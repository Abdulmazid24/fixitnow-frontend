# FixItNow — Your Trusted Home Service Platform 🔧

FixItNow is a modern, full-featured **Next.js 16** home services marketplace application. Customers can browse available services, inspect verified technician profiles, pick interactive date/time slots, process payments via Stripe, and leave reviews. Technicians can manage their service profile, configure working availability, and handle job bookings. Administrators oversee platform health, moderate users, and manage service categories.

---

## 🔗 Live Links & Endpoints

- **Live Frontend App:** [https://fixitnow-frontend-one.vercel.app](https://fixitnow-frontend-one.vercel.app)
- **Backend API Base URL:** [https://level2-assignment-4-eta.vercel.app/api](https://level2-assignment-4-eta.vercel.app/api)
- **API Mapping Document:** [`API_INTEGRATION.md`](./API_INTEGRATION.md)

---

## 🔑 Quick Demo Credentials (For Evaluation)

For instant testing, click the **Quick Login Credentials** buttons on the login page or use:

| Role | Email | Password | Access Rights |
|:---|:---|:---|:---|
| **Customer** | `customer@example.com` | `password123` | Book services, Pay via Stripe, View payment history, Leave reviews |
| **Technician** | `technician@example.com` | `password123` | Manage job requests (Accept/Decline/Start/Complete), Set availability, Edit profile |
| **Admin** | `admin@example.com` | `password123` | System stats, User directory & Ban/Unban moderation, Category CRUD |

---

## ✨ Key Features & Functionalities

### 🌐 1. Public Marketplace & Browsing
- **Responsive Service & Technician Grid**: Highlighting top-rated professionals, verified badges, hourly rates, and starting prices.
- **Real-Time Search & Multi-Filter**: Search by title/keyword, filter by service categories, price slider, and minimum star rating.
- **Technician Profile & Booking Wizard**: Detailed bio, skills list, client reviews, and interactive **Date Calendar & Time-Slot Picker**.

### 👤 2. Customer Experience & Payments
- **Role-Based Auth & Session Management**: Secure registration with role toggle and login with password show/hide toggle.
- **Booking Management**: Track appointments by status (`REQUESTED`, `ACCEPTED`, `PAID`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- **Stripe Payment Gateway**: Seamless integration with Stripe Checkout and dedicated `/payment/success` outcome handling.
- **Payment History Receipts**: Detailed transaction history with amount, gateway badge, transaction ID, and timestamp.
- **Interactive Review System**: Submit 1–5 star ratings and feedback after job completion.

### 🛠️ 3. Technician Workspace
- **KPI Metrics Dashboard**: Overview of total earnings, pending booking requests, active jobs, and client rating score.
- **Booking Management Table**: Handle incoming client requests with action buttons (`Accept`, `Decline`, `Start Job`, `Mark Completed`).
- **Interactive Availability Scheduler**: Configure working days and block out unavailable hours.
- **Profile Setup**: Update hourly rate, service city/location, experience years, skills, and bio.

### 🛡️ 4. Admin Control Center
- **Platform Analytics**: Total registered users, background-verified technicians, revenue handled, and booking completion rate.
- **User & Technician Directory**: Moderation table with search, role filters, and one-click **Ban / Unban** actions.
- **Category Management**: View, create, and delete service categories dynamically.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 & Shadcn UI
- **Typography:** Vercel Geist Sans & Geist Mono
- **Icons:** Lucide React
- **Notifications:** Sonner Toasts
- **Payment Gateway:** Stripe Checkout
- **Security & Route Protection:** Custom Proxy middleware with JWT token decoding & cookie role guards
- **Deployment:** Vercel

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Abdulmazid24/fixitnow-frontend.git
cd fixitnow-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
nextjs-ph/
├── app/
│   ├── page.tsx                     # Super premium Home Page
│   ├── services/page.tsx            # Service directory & search/filters
│   ├── technicians/[id]/page.tsx    # Technician profile & time-slot picker
│   ├── auth/
│   │   ├── login/page.tsx           # Login form with show/hide password
│   │   └── register/page.tsx        # Role-based registration form
│   ├── dashboard/
│   │   ├── customer/                # Customer bookings & payment history
│   │   │   └── bookings/[id]/pay/   # Stripe Checkout gateway
│   │   ├── technician/              # Technician earnings & job management
│   │   │   ├── availability/        # Weekly scheduler
│   │   │   ├── bookings/            # Dedicated job booking manager
│   │   │   └── profile/             # Profile setup form
│   │   └── admin/                   # Admin metrics & moderation
│   │       ├── users/               # Ban/Unban user directory
│   │       └── categories/          # Category CRUD
│   ├── payment/                     # Payment outcome pages (success/cancel)
│   ├── error.tsx & loading.tsx      # Global error boundaries & skeletons
│   └── layout.tsx                   # Root layout with Geist font & Sonner Toaster
├── components/                      # Shared UI & layout components
├── context/                         # AuthContext provider
├── lib/                             # Unified API client & types
├── proxy.ts                         # Route protection proxy
├── API_INTEGRATION.md               # Mandatory API integration mapping doc
└── README.md                        # Documentation
```

---

## 📄 License & Credits

Built for **Programming Hero - Level 2 Assignment 5**.  
All rights reserved © 2026 **FixItNow Platform**.
