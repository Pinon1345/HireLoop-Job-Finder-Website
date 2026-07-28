# 💼 HireLoop - Full Stack Recruitment Platform

> A modern full-stack recruitment platform that connects recruiters with job seekers through secure authentication, intelligent job management, and a seamless hiring experience.

---

## 📖 Project Overview

HireLoop is a full-stack recruitment platform designed to streamline the hiring process for both recruiters and job seekers. Recruiters can create and manage job postings, while candidates can explore opportunities, apply for jobs, and track their applications. The platform features secure role-based authentication, responsive design, advanced search and filtering, and an intuitive user experience built with modern web technologies.

---

## 🚀 Live Demo & Repository

- 🌐 **Live Website:** https://your-hireloop-live-link.vercel.app/
- 💻 **GitHub Repository:** https://github.com/Pinon1345/HireLoop

---

## ✨ Key Features

- 🔐 Secure role-based authentication for Recruiters and Job Seekers
- 👤 Personalized dashboards based on user roles
- 💼 Create, update, and manage job postings
- 🔍 Advanced job search with filtering and sorting
- 📝 Easy job application system
- 💳 Secure Stripe payment integration for premium services
- 📊 Recruiter dashboard for managing applications
- 📄 Candidate dashboard for tracking job applications
- ❤️ Save favorite job opportunities
- 📱 Fully responsive design for desktop, tablet, and mobile devices
- ⚡ Fast performance with Next.js App Router
- 🎨 Clean, modern, and user-friendly interface

---

## 🛠️ Technology Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/HeroUI-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/REST_API-0055DA?style=flat-square&logo=postman&logoColor=white" />
</p>

### Database & Authentication

<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Better_Auth-000000?style=flat-square" />
</p>

### Payment

<p>
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" />
</p>

---

## 📦 Main Dependencies

### Client

- Next.js
- React
- Tailwind CSS
- HeroUI
- Framer Motion
- React Hook Form
- React Icons
- Swiper
- Axios
- Better Auth Client
- Stripe.js

### Server

- Node.js
- Express.js
- MongoDB
- Better Auth
- Stripe
- CORS
- dotenv
- Zod

---

## ⚙️ Installation Guide

### Clone the Repository

```bash
git clone https://github.com/Pinon1345/HireLoop.git
```

### Navigate to the Project Folder

```bash
cd HireLoop
```

### Install Dependencies

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file for the client and a `.env` file for the server.

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Server

```env
PORT=5000

MONGODB_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Replace the placeholder values with your own configuration before running the project.

---

## 📂 Project Structure

```text
HireLoop
│
├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── models/
│   ├── lib/
│   └── package.json
│
└── README.md
```

---

## 🎯 Future Improvements

- 🤖 AI-powered job recommendations
- 💬 Real-time recruiter and candidate messaging
- 📧 Email notifications
- 📄 Resume parsing and analysis
- 🌍 Multi-language support
- 📈 Advanced analytics dashboard
- 📅 Interview scheduling system
- 📹 Video interview integration

---

## 👨‍💻 Author

**Fourkan Bin Ilias**

- GitHub: https://github.com/Pinon1345
- LinkedIn: https://www.linkedin.com/in/fourkan-bin-ilias-6117b0347/
- Email: pinonfurkan1@gmail.com

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub. Your support is greatly appreciated!
