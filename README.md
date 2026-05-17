# 🕷️ Spider-Man Portfolio — Full Stack

A **Spider-Man themed** personal portfolio website built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS**. Features a cinematic spider-web intro animation, dark/light theme toggle, scroll-triggered animations, and a full backend API for contact form submissions.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19-blue) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8)

---

## ✨ Features

- 🕸️ **Cinematic Spider-Web Intro** — Canvas-based web-shooting animation with GSAP timeline
- 🌗 **Dark / Light Theme** — Toggle between Spider-Man (dark) and Miles Morales (light) themes
- ⌨️ **Typing Effect** — Animated role cycling in the hero section
- 📊 **Animated Skill Bars** — Progress bars that fill on scroll with category tabs
- 🗂️ **Filterable Projects** — Cards with hover effects, featured badges, and detail modals
- 🏆 **Achievement Timeline** — Web-strand styled milestone timeline
- 📬 **Contact Form** — Validated form with MongoDB storage and email notifications
- 🎨 **Particle Background** — Interactive canvas particles reacting to mouse movement
- 📱 **Fully Responsive** — Mobile-first design with glassmorphism navbar
- ⚡ **Smooth Animations** — GSAP ScrollTrigger + Framer Motion throughout

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite, Tailwind CSS v3, GSAP, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Email** | Nodemailer |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
Portfolio/
├── client/          → React + Vite + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/    → All UI components
│   │   ├── context/       → Theme context provider
│   │   ├── data/          → Portfolio content data
│   │   └── App.jsx        → Main app assembly
│   └── tailwind.config.js → Spider-Man design tokens
│
└── server/          → Node.js + Express + MongoDB backend
    ├── models/      → Mongoose schemas
    ├── routes/      → API route handlers
    └── server.js    → Express server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/karthik-engili/spiderman-portfolio.git
cd spiderman-portfolio

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Setup

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run Locally

```bash
# Terminal 1 — Frontend (http://localhost:5173)
cd client
npm run dev

# Terminal 2 — Backend (http://localhost:5000)
cd server
npm run dev
```

---

## 📝 Customization

Edit `client/src/data/portfolioData.js` to update:
- Personal details (name, bio, contact info)
- Skills and proficiency levels
- Projects (title, description, tech stack, links)
- Achievements and milestones
- Social media links

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Karthik Engili**  
- GitHub: [@karthik-engili](https://github.com/karthik-engili)  
- LinkedIn: [Karthik Engili](https://www.linkedin.com/in/karthik-engili-aaa402379/)
