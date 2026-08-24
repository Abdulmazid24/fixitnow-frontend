# FixItNow Frontend - API Integration Mapping

This document maps frontend pages and UI components to their corresponding backend REST API endpoints.

---

## 1. Authentication & Profile
| Next.js Route / Component | Action / Feature | Backend API Endpoint | HTTP Method | Auth Required |
|---|---|---|---|---|
| `/auth/login` | User Login | `/api/auth/login` | `POST` | No |
| `/auth/register` | User / Technician Register | `/api/auth/register` | `POST` | No |
| Navbar & Context | Fetch Current User Profile | `/api/auth/me` | `GET` | Yes |
| `/dashboard/technician/profile` | Update Profile / Skills | `/api/auth/me` | `PATCH` | Yes |

---

## 2. Public Marketplace & Services
| Next.js Route / Component | Action / Feature | Backend API Endpoint | HTTP Method | Auth Required |
|---|---|---|---|---|
| `/` & `/services` | Fetch Service Categories | `/api/categories` | `GET` | No |
| `/` & `/services` | Browse & Search Services | `/api/services` | `GET` | No |
| `/` & `/services` | Browse Technicians | `/api/technicians` | `GET` | No |
| `/technicians/[id]` | Technician Details & Availability | `/api/technicians/:id` | `GET` | No |

---

## 3. Customer Bookings & Payments
| Next.js Route / Component | Action / Feature | Backend API Endpoint | HTTP Method | Auth Required |
|---|---|---|---|---|
| `/technicians/[id]` Modal | Create Booking Request | `/api/bookings` | `POST` | Yes (CUSTOMER) |
| `/dashboard/customer` | Customer Booking History | `/api/bookings` | `GET` | Yes (CUSTOMER) |
| `/dashboard/customer` | Cancel Booking Request | `/api/bookings/:id/cancel` | `PATCH` | Yes (CUSTOMER) |
| `/dashboard/customer/bookings/[id]/pay` | Initiate Stripe Checkout | `/api/payments/create-checkout-session` | `POST` | Yes (CUSTOMER) |
| `/dashboard/customer` Modal | Submit Service Review | `/api/reviews` | `POST` | Yes (CUSTOMER) |

---

## 4. Technician Dashboard & Availability
| Next.js Route / Component | Action / Feature | Backend API Endpoint | HTTP Method | Auth Required |
|---|---|---|---|---|
| `/dashboard/technician` | Incoming Bookings Management | `/api/technician/bookings` | `GET` | Yes (TECHNICIAN) |
| `/dashboard/technician` | Accept / Decline / Complete Booking | `/api/technician/bookings/:id/status` | `PATCH` | Yes (TECHNICIAN) |
| `/dashboard/technician/availability` | Manage Availability Slots | `/api/technician/availability` | `GET` & `POST` | Yes (TECHNICIAN) |

---

## 5. Admin Moderation
| Next.js Route / Component | Action / Feature | Backend API Endpoint | HTTP Method | Auth Required |
|---|---|---|---|---|
| `/dashboard/admin` | Platform Overview Statistics | `/api/admin/stats` | `GET` | Yes (ADMIN) |
| `/dashboard/admin/users` | User Directory & Status (Ban/Unban) | `/api/admin/users` & `/api/admin/users/:id/status` | `GET`, `PATCH` | Yes (ADMIN) |
| `/dashboard/admin/categories` | Manage Service Categories | `/api/categories` | `GET`, `POST`, `DELETE` | Yes (ADMIN) |
