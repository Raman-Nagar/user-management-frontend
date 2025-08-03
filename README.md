# User Management Frontend (React + Vite)

This is the frontend for the User Management System built with **React (Vite + TypeScript)**.  
It supports authentication, profile management, role-based UI, and email verification.

---

## 🌐 Live URL

> [user-management-frontend-swart.vercel.app](user-management-frontend-swart.vercel.app)  

---

## ⚙️ Tech Stack

- **React 18 (Vite + TypeScript)**
- **Tailwind CSS** + **ShadCN UI** components
- **React Router v6**
- **TanStack React Query** (data fetching)
- **React Hook Form** + **Zod** (form handling & validation)
- **JWT authentication** with refresh tokens (stored in `httpOnly` cookies)
- **Email verification** via tokenized links
- **Forgot password** via tokenized links

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Raman-Nagar/user-management-frontend.git
cd user-management-frontend
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Setup Environment Variables (.env.local)

```bash
VITE_API_URL=http://localhost:5000/api
```
### 4. Start the Development Server

```bash
npm run dev
```

