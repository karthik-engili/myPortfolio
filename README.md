# 🕷️ Spider-Man Portfolio — Full Stack MERN Application

A **Spider-Man themed** personal portfolio website built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS v3**.

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19-blue) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-darkgreen) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8)

---

## 🌐 Live URLs

| Service | URL | Platform |
|---------|-----|----------|
| 🖥️ **Frontend** | [my-portfolio-dusky-xi-92.vercel.app](https://my-portfolio-dusky-xi-92.vercel.app) | Vercel |
| ⚙️ **Backend API** | [myportfolio-backend-w45n.onrender.com](https://myportfolio-backend-w45n.onrender.com) | Render |
| 🗄️ **Database** | MongoDB Atlas (`portfolio` database) | Atlas |
| 📦 **Source Code** | [github.com/karthik-engili/myPortfolio](https://github.com/karthik-engili/myPortfolio) | GitHub |

---

## 📁 Project Structure

```
Portfolio/
├── client/       → React frontend (see client/README.md for details)
├── server/       → Express backend (see server/README.md for details)
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Git

### Clone & Install

```bash
git clone https://github.com/karthik-engili/myPortfolio.git
cd myPortfolio

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Configure Environment

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Run Locally

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd client
npm run dev
```

---

## 🌍 Deployment

### Frontend → Vercel

- Import GitHub repo on [vercel.com](https://vercel.com)
- Set **Root Directory** to `client`
- Add env var: `VITE_API_URL` = your Render backend URL

### Backend → Render

- Create **Web Service** on [render.com](https://render.com)
- Connect GitHub repo
- Set **Root Directory** to `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- Add env vars: `MONGO_URI`, `PORT`, `CLIENT_URL`

### Push Updates (auto-redeploy)

```bash
git add -A
git commit -m "your change description"
git push origin main
```

---

## 🧰 Git Commands Used

```bash
# Initial setup
git init
git add -A
git commit -m "feat: Spider-Man themed portfolio - MERN stack + Tailwind CSS"
git remote add origin https://github.com/karthik-engili/myPortfolio.git
git branch -M main
git push -u origin main

# Subsequent updates
git add -A
git commit -m "feat: add production deployment support (Vercel + Render)"
git push origin main
```

---

## 👨‍💻 Author

**Karthik Engili**
- 🌐 Portfolio: [my-portfolio-dusky-xi-92.vercel.app](https://my-portfolio-dusky-xi-92.vercel.app)
- 🐙 GitHub: [@karthik-engili](https://github.com/karthik-engili)
- 💼 LinkedIn: [Karthik Engili](https://www.linkedin.com/in/karthik-engili-aaa402379/)
- 🐦 X: [@karthikengili16](https://x.com/karthikengili16)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
