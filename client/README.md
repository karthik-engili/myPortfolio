# 🕷️ Portfolio — Frontend (Client)

The React frontend for the Spider-Man themed portfolio website. Built with **React 19**, **Vite**, **Tailwind CSS v3**, **GSAP**, and **Framer Motion**.

**Live URL**: [my-portfolio-dusky-xi-92.vercel.app](https://my-portfolio-dusky-xi-92.vercel.app)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | v3 | Utility-first CSS framework |
| GSAP | 3.15 | Timeline & scroll-triggered animations |
| Framer Motion | 12 | Component transitions & layout animations |
| React Icons | 5.6 | Icon library (Simple Icons, Heroicons, VS Code) |
| React Toastify | 11 | Toast notifications for form feedback |

---

## 📁 File Structure

```
client/
├── public/                    → Static assets
├── src/
│   ├── components/
│   │   ├── SpiderWebIntro.jsx       → Cinematic canvas-based spider-web intro animation
│   │   │                               Uses HTML5 Canvas + GSAP timeline sequencing
│   │   │                               Draws web strands radiating from center
│   │   │                               Shows "WELCOME TO MY WEB" text, then fades out
│   │   │
│   │   ├── ParticleBackground.jsx   → Interactive canvas particle network
│   │   │                               Floating particles with web-like connections
│   │   │                               Reacts to mouse movement
│   │   │
│   │   ├── Navbar.jsx               → Sticky glassmorphism navigation bar
│   │   │                               Active section tracking on scroll
│   │   │                               Hide-on-scroll-down, show-on-scroll-up
│   │   │                               Responsive mobile drawer menu
│   │   │                               Integrates ThemeToggle component
│   │   │
│   │   ├── HeroSection.jsx          → Main hero/landing section
│   │   │                               GSAP entrance animations
│   │   │                               Typing effect cycling through roles
│   │   │                               SVG web-pattern background
│   │   │                               Gradient text for name
│   │   │                               Social links + CTA buttons
│   │   │
│   │   ├── AboutSection.jsx         → About me section
│   │   │                               GSAP scroll-triggered reveal animations
│   │   │                               Count-up stat animations (projects, years, etc.)
│   │   │                               Glassmorphism stat cards
│   │   │
│   │   ├── SkillsSection.jsx        → Skills showcase section
│   │   │                               3 category tabs: Frontend / Backend / Tools
│   │   │                               Animated progress bars that fill on scroll
│   │   │                               Technology icons from react-icons
│   │   │
│   │   ├── ProjectsSection.jsx      → Projects portfolio section
│   │   │                               Filter tabs: All / Full-Stack / Frontend / Backend
│   │   │                               Animated cards with hover overlays
│   │   │                               Featured project badges
│   │   │                               Detail modal with AnimatePresence
│   │   │
│   │   ├── AchievementsSection.jsx   → Achievements timeline
│   │   │                               Alternating cards on desktop
│   │   │                               Web-strand center line with glowing nodes
│   │   │                               GSAP scroll-triggered reveals
│   │   │
│   │   ├── ContactSection.jsx       → Contact form section
│   │   │                               Form validation (name, email, subject, message)
│   │   │                               Submits to backend API: POST /api/contact
│   │   │                               Uses VITE_API_URL env var for production
│   │   │                               Loading spinner + toast notifications
│   │   │                               Contact info cards + social links
│   │   │
│   │   ├── Footer.jsx               → Footer with spider logo, social links, copyright
│   │   │
│   │   └── ThemeToggle.jsx          → Dark/light theme toggle switch
│   │                                   Sun/moon icons with smooth slider animation
│   │
│   ├── context/
│   │   └── ThemeContext.jsx          → React Context for theme management
│   │                                   Provides isDark state + toggleTheme function
│   │                                   Persists preference in localStorage
│   │                                   Applies 'dark' class to <html> root
│   │
│   ├── data/
│   │   └── portfolioData.js          → All portfolio content in one file
│   │                                   personalData: name, bio, contact, social links
│   │                                   skillsData: categories with skill names + levels
│   │                                   projectsData: projects with tech stack + links
│   │                                   achievementsData: milestones with dates + types
│   │                                   navLinks: navigation menu items
│   │
│   ├── App.jsx                       → Main app component
│   │                                   Intro animation gate (shows/hides intro)
│   │                                   Assembles all sections in order
│   │                                   Wraps with ThemeProvider + ToastContainer
│   │
│   ├── main.jsx                      → React entry point (renders App into #root)
│   │
│   └── index.css                     → Global styles
│                                       CSS custom properties for theming (dark/light)
│                                       Tailwind @layer components (section-container, etc.)
│                                       Custom keyframe animations
│                                       Spider-Man decorative utilities
│
├── index.html                → HTML entry point
│                                SEO meta tags (title, description, author)
│                                Spider-Man SVG favicon
│                                Dark theme color (#0a0a0f)
│
├── tailwind.config.js        → Tailwind configuration
│                                Custom colors: spidey-red, spidey-blue, spidey-dark
│                                Custom fonts: Bebas Neue (headings), Poppins (body), Fira Code (mono)
│                                Custom animations: float, pulse-glow, web-swing, slide-up
│                                Dark mode: class-based
│
├── vite.config.js            → Vite configuration
│                                React plugin
│                                Dev proxy: /api → http://localhost:5000
│
├── postcss.config.js         → PostCSS config (Tailwind + Autoprefixer)
├── eslint.config.js          → ESLint config
└── package.json              → Dependencies & scripts
```

---

## 🚀 Commands

### Install Dependencies

```bash
cd client
npm install
```

### Development Server

```bash
npm run dev
```

Starts the Vite dev server at **http://localhost:5173** with hot module replacement.

API requests to `/api/*` are automatically proxied to the Express backend at `http://localhost:5000` (configured in `vite.config.js`).

### Production Build

```bash
npm run build
```

Outputs optimized production files to `client/dist/`.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

### Lint

```bash
npm run lint
```

Runs ESLint to check for code issues.

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Only in production | Backend API URL (e.g., `https://myportfolio-backend-w45n.onrender.com`) |

> **Note:** Vite env vars prefixed with `VITE_` are baked into the build at compile time. You must **redeploy** after changing them.

In development, the Vite proxy handles API routing automatically — no `VITE_API_URL` needed.

---

## 🎨 Theming

The app uses CSS custom properties for theming, defined in `index.css`:

| Property | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--bg-primary` | `#0a0a0f` | `#f5f5f5` |
| `--bg-secondary` | `#111118` | `#eaeaea` |
| `--accent-red` | `#e23636` | `#e23636` |
| `--text-primary` | `#ffffff` | `#1a1a2e` |

Toggle is managed by `ThemeContext.jsx` which adds/removes the `dark` class on the `<html>` element.

---

## 📝 Customization

Edit **`src/data/portfolioData.js`** to update all content:

```javascript
// Personal details
export const personalData = {
  name: "Your Name",
  tagline: "Your Tagline",
  roles: ["Role 1", "Role 2", "Role 3"],
  email: "your@email.com",
  location: "Your City",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};

// Skills — each with name, level (0-100), and icon reference
export const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90, icon: "SiReact" },
      // ...
    ],
  },
];

// Projects — each with title, description, tech stack, links
export const projectsData = [ /* ... */ ];

// Achievements — milestones with dates and types
export const achievementsData = [ /* ... */ ];
```

---

## 🌍 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `karthik-engili/myPortfolio` from GitHub
3. Set **Root Directory** to `client`
4. Framework: **Vite** (auto-detected)
5. Add env var: `VITE_API_URL` = `https://myportfolio-backend-w45n.onrender.com`
6. Click **Deploy**

Auto-redeploys on every `git push origin main`.
