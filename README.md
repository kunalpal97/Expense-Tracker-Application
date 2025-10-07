# 💰 Expense Tracker – Full Stack Application

A **modern and responsive Expense Tracker** built using the **MERN stack (MongoDB, Express, React, Node.js)** with clean architecture, authentication, analytics, and deployment on **Vercel (frontend)** and **Render (backend)**.

This application helps users manage their finances by tracking income and expenses, visualizing spending patterns, and maintaining better financial discipline.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Features](#-features)
- [Frontend Details](#-frontend-details)
- [Backend Details](#-backend-details)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Security & Improvements](#-security--improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧾 Overview

Expense Tracker is a **full-stack web application** that enables users to:
- Register and log in securely.
- Add, edit, delete, and view transactions.
- Get real-time balance summaries.
- View category-wise expense analytics via charts.
- Enjoy a clean, responsive UI optimized for all devices.

Built with **React + Node.js + MongoDB**, this app follows scalable production-ready architecture and is fully open-source.

---

## ⚙️ Tech Stack

| Category | Technology Used |
|-----------|-----------------|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide React |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose) |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **State Management** | React Context API |
| **Deployment** | Frontend → Vercel, Backend → Render |
| **Version Control** | Git & GitHub |

---

## 🧠 Features

### 🔐 Authentication
- Secure signup and login with JWT tokens.
- Auth-protected routes on both frontend & backend.
- Context API for persistent authentication state.

### 💸 Expense Management
- Add income and expense transactions.
- Edit or delete existing records.
- Auto-updating balance summary.

### 📊 Analytics
- Beautiful Pie Chart showing category-wise spending.
- Responsive and animated charts using Recharts.
- Tooltip + Legend for clarity.

### 🎨 UI/UX Highlights
- Responsive design for mobile and desktop.
- Smooth animations with Framer Motion.
- Minimalistic dashboard layout with an animated sidebar.
- Logout button anchored at the bottom on small screens.

---

## 🖥️ Frontend Details

**Framework & Libraries:**
- React (Vite) for fast development and build.
- Tailwind CSS for styling.
- Framer Motion for animations.
- Recharts for data visualization.
- Lucide React for icons.

### 📁 Folder Structure

```
client/
│
├── src/
│   ├── api/
│   │   └── transaction.js            → Handles API requests
│   ├── components/
│   │   ├── Header.jsx                → Top navigation bar
│   │   ├── Sidebar.jsx               → Sidebar navigation (responsive)
│   │   ├── TransactionForm.jsx       → Add/Edit transaction form
│   │   ├── ProtectedRoute.jsx        → Route protection
│   │   └── Layout.jsx                → Wrapper for routes
│   ├── context/
│   │   └── AuthContext.jsx           → Authentication logic
│   ├── layouts/
│   │   └── DashboardLayout.jsx       → Combines sidebar + main dashboard
│   ├── pages/
│   │   ├── Home.jsx                  → Dashboard overview
│   │   ├── Transactions.jsx          → Manage transactions
│   │   ├── AnalyticsPage.jsx         → Analytics and charts
│   │   ├── Profile.jsx               → Profile + logout
│   │   ├── Login.jsx                 → Login form
│   │   └── Signup.jsx                → Signup form
│   ├── App.jsx                       → Routing setup
│   ├── main.jsx                      → App entry point
│   └── index.css / App.css           → Styles
│
├── .env                              → Environment variables
├── vite.config.js                    → Vite configuration
├── tailwind.config.js                → Tailwind settings
├── vercel.json                       → Vercel deployment config
└── package.json                      → Frontend dependencies
```

---

## ⚙️ Backend Details

**Framework & Libraries:**
- Express.js for server and routing.
- MongoDB with Mongoose for database management.
- JWT + bcryptjs for authentication and password hashing.
- dotenv, cors, and morgan for configuration and logging.

### 📁 Folder Structure

```
server/
│
├── src/
│   ├── config/             → MongoDB connection
│   ├── controllers/        → Auth & transaction logic
│   ├── middleware/         → JWT auth middleware
│   ├── models/             → User & Transaction schemas
│   ├── routes/             → API route handlers
│   ├── utils/              → Helper utilities (if any)
│   ├── index.js            → Main server entry point
│
├── .env                    → Environment variables
├── package.json            → Dependencies
└── package-lock.json
```

---

## 🚀 Getting Started

### 🔹 Clone Repository
```bash
git clone https://github.com/kunalpal97/Expense-Tracker-Application.git
cd Expense-Tracker-Application
```

### 🔹 Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 🔹 Setup Backend
```bash
cd server
npm install
npm start
```

**Default URLs:**
- Backend → `http://localhost:5000`
- Frontend → `http://localhost:5173`

---

## 🌍 Environment Variables

### Frontend (`client/.env`)
```
VITE_API_URL=https://your-backend-server.com/api
```

### Backend (`server/.env`)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 🧾 API Documentation

### 🔑 Authentication Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and return JWT |

### 💰 Transaction Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/transactions` | Add new transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/summary` | Get summary of income, expense & balance |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

---

## 🔒 Security & Improvements

- Passwords are hashed using **bcryptjs**.
- Tokens verified via **JWT middleware**.
- **CORS** enabled for cross-origin requests.

**Recommendations:**
- Add pagination for large transaction lists.
- Implement rate-limiting for login.
- Add email verification and password reset.

---

## 🧑‍💻 Contributing

Contributions are welcome!  
Follow these steps:

1. **Fork** the repo  
2. **Create a feature branch** → `feature/new-feature`  
3. **Commit** your changes  
4. **Submit a Pull Request**

---

## 🧾 License

This project is licensed under the **MIT License** — feel free to modify and share with attribution.

---

## 👨‍💻 Author

**Kunal Pal**  
*Full Stack Developer | React · Node.js · TypeScript*  

🌐 **GitHub:** [kunalpal97](https://github.com/kunalpal97)  
📧 **Email:** strive007boy@gmail.com  

> “Track your expenses. Visualize your growth. Stay financially ahead.”  
> — *Expense Tracker by Kunal Pal*

