# 🎓 Bidyapith - Online Learning Platform

<div align="center">

![Bidyapith Logo](https://img.shields.io/badge/Bidyapith-Learning%20Platform-d72050?style=for-the-badge&logo=graduation-cap&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-bidyapith.web.app-success?style=for-the-badge)](https://bidyapith.web.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

**A modern, full-featured online course platform built with React, Firebase & MongoDB**

[🌐 Live Demo](https://bidyapith.web.app) • [⚡ Backend API](https://bidyapith-backend-og5l8aweg-prosuns-projects.vercel.app)

</div>

---

## ✨ Features

### 🏠 **Homepage (11 Sections)**

| Section          | Description                                    |
| ---------------- | ---------------------------------------------- |
| 🎠 Hero Slider   | Engaging carousel with CTA                     |
| 🔥 Top Courses   | Display top 6 rated courses                    |
| 📊 Statistics    | Animated counters (30+ Courses, 500+ Students) |
| 📂 Categories    | Browse by category                             |
| ⭐ Top Providers | Featured instructors                           |
| 📖 How It Works  | 3-step guide                                   |
| 💬 Testimonials  | Student reviews                                |
| ❓ FAQ           | Common questions                               |
| 📧 Newsletter    | Email subscription                             |
| 🎯 CTA Banner    | Call-to-action                                 |
| 🦶 Footer        | Links & social media                           |

### 📚 **Courses Page**

- ✅ **30+ Courses** across 8 categories
- 🔍 **Search** by course name
- 🏷️ **Category Filter** (Technology, Music, Art, etc.)
- 💰 **Price Filter** (Free, Under $20, $20-$50, $50+)
- 📊 **Sorting** (Price, Rating, Newest)
- 📄 **Pagination** (6 per page)
- 🎴 **Responsive Grid** (5 columns desktop)

### 🔐 **Authentication**

- 📧 Email/Password login & registration
- 🔑 Google Sign-in
- 🎮 **Demo Login Button** - Try without registration
- 🔓 Password recovery

### 📊 **Dashboard**

- 📈 Overview with stats cards
- 📊 **Charts** (Recharts) - Pie & Bar charts
- 📚 My Enrolled Courses
- ➕ Add New Course
- 📝 My Added Courses
- 💳 Payment History

### 💳 **Payments**

- 💰 Stripe integration
- 🧾 Payment history

### 🎨 **UI/UX**

- 📱 Fully responsive (Mobile-first)
- 🌙 Dark/Light theme toggle
- 💀 Skeleton loaders
- 🔔 Toast notifications
- ✨ AOS scroll animations
- 🎨 **Red Theme** (#d72050)

---

## 🛠️ Tech Stack

```
Frontend:     React 18 + Vite 6 + JavaScript
Styling:      TailwindCSS 4 + DaisyUI 5
Auth:         Firebase Authentication
Hosting:      Firebase Hosting
Charts:       Recharts
Animations:   AOS + Swiper
Icons:        React Icons
HTTP:         Fetch API
Notifications: React Hot Toast
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SkillCard.jsx
│   ├── HeroSlider.jsx
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx
│   ├── TotalSkills.jsx
│   ├── SkillDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── dashboard/
│       ├── DashboardOverview.jsx
│       ├── MyEnrolled.jsx
│       ├── AddCourse.jsx
│       └── PaymentHistory.jsx
├── layouts/             # Layout wrappers
├── provider/            # Auth context
├── services/            # API service
├── firebase/            # Firebase config
└── routes/              # Route definitions
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Firebase account
- Backend server running

### Installation

```bash
# Clone
git clone https://github.com/prosun-sajal/bidyapith.git
cd bidyapith

# Install
npm install

# Configure .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_URL=your_backend_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key

# Run
npm run dev

# Build & Deploy
npm run build
firebase deploy --only hosting
```

---

## 📸 Screenshots

| Homepage     | Courses        | Dashboard      |
| ------------ | -------------- | -------------- |
| Hero + Stats | Grid + Filters | Charts + Stats |

---

## 🔗 Links

- **Live Site:** https://bidyapith.web.app
- **Backend API:** https://bidyapith-backend-og5l8aweg-prosuns-projects.vercel.app
- **Backend Repo:** [Bidyapith-backend](../Bidyapith-backend)

---

## 👨‍💻 Author

**Prosun Sajal**

- 📧 prosunsajal123@gmail.com
- 📱 +8801911572117
- 📍 Khulna, Bangladesh

---

<div align="center">

⭐ **Star this repo if you found it helpful!**

Made with ❤️ in Bangladesh 🇧🇩

</div>
