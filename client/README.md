# 💰 Expense Tracker Application (Frontend)

A modern and responsive **Expense Tracker Dashboard** built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Recharts**.  
This project provides an elegant and smooth UI for managing personal expenses, visualizing spending trends, and maintaining financial control.

---

## 🧾 Overview

This is the **client-side (frontend)** part of the Expense Tracker Application.  
It allows users to:
- Log in and sign up securely.
- Add, edit, and delete transactions.
- View category-wise analytics and charts.
- Manage their profile and logout safely.

Built with production-quality structure and clean UI/UX design.

---

## ⚙️ Tech Stack

| Category | Technology Used |
|-----------|-----------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **State Management** | React Context API |
| **Animations** | Framer Motion |
| **Charts / Data Visualization** | Recharts |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📁 Folder Structure

```
client/
│
├── src/
│   ├── api/
│   │   ├── transaction.js          → API calls for transactions
│   │
│   ├── components/
│   │   ├── Header.jsx              → Top navbar
│   │   ├── Layout.jsx              → Layout wrapper for routes
│   │   ├── ProtectedRoute.jsx      → Route guard (authentication check)
│   │   ├── Sidebar.jsx             → Sidebar navigation (responsive)
│   │   ├── TransactionForm.jsx     → Add/Edit transaction form
│   │
│   ├── context/
│   │   └── AuthContext.jsx         → Handles login/logout & auth state
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx     → Dashboard structure combining sidebar + main content
│   │
│   ├── pages/
│   │   ├── AnalyticsPage.jsx       → Expense analytics using Pie charts
│   │   ├── Home.jsx                → Dashboard summary
│   │   ├── Login.jsx               → Login page
│   │   ├── Signup.jsx              → Signup page
│   │   ├── Profile.jsx             → User profile + logout
│   │   └── Transactions.jsx        → List and manage all transactions
│   │
│   ├── App.jsx                     → Main routing configuration
│   ├── main.jsx                    → App entry point
│   ├── index.css                   → Global Tailwind styles
│   └── App.css                     → Component-level styles
│
├── .env                            → Environment variables (API URL etc.)
├── .gitignore                      → Ignored files for Git
├── eslint.config.js                → ESLint configuration
├── index.html                      → Main HTML template
├── package.json                    → Project dependencies
├── postcss.config.js               → Tailwind/PostCSS configuration
├── tailwind.config.js              → Tailwind theme settings
├── vercel.json                     → Deployment configuration
├── vite.config.js                  → Vite configuration
└── README.md                       → Project documentation
```

---

## 🧠 Key Features

### 🔐 Authentication
- Login and signup with JWT tokens.
- Global state managed via `AuthContext`.
- Automatic redirection for protected routes.

### 🧾 Transaction Management
- Add, edit, delete transactions easily.
- Automatic updates reflected in analytics and total balance.

### 📊 Analytics & Charts
- Interactive **Pie Chart** showing category-wise spending.
- Dynamic tooltips and smooth animations.
- Responsive visualization powered by **Recharts**.

### 🎨 Clean UI/UX
- Responsive layout for all screen sizes.
- Animated sidebar and buttons using **Framer Motion**.
- Modern gradient and hover effects.

### 🧭 Sidebar Navigation
- Minimal design with icons (Lucide-react).
- Contains routes for:
  - Home
  - Transactions
  - Analytics
  - Profile
- Logout button fixed at the bottom for accessibility.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kunalpal97/Expense-Tracker-Application.git
cd Expense-Tracker-Application/client
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the `client/` folder:
```
VITE_API_URL=https://your-backend-server.com/api
```

### 4️⃣ Run the Application
```bash
npm run dev
```
Your app will be running locally at:  
👉 **http://localhost:5173**

### 5️⃣ Build for Production
```bash
npm run build
```

---

## 🧰 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the app for production |
| `npm run lint` | Runs ESLint checks |
| `npm run preview` | Previews the production build |

---

## 🧑‍💻 Contributing

Contributions are always welcome!  

If you'd like to contribute:
1. Fork the repository  
2. Create a new branch (`feature/new-feature`)  
3. Commit your changes  
4. Push and open a pull request  

---

## 🧾 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it freely with attribution.

---

## 👨‍💻 Author

**Kunal Pal**  
Full Stack Developer | React · Node.js · TypeScript  
🌐 [GitHub Profile](https://github.com/kunalpal97)  
📧 Email: strive007boy@gmail.com  

---

> “Track your expenses. Visualize your growth. Stay financially ahead.”  
> — *Expense Tracker by Kunal Pal*
