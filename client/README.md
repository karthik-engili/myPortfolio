#  Portfolio — Frontend (Client)

The React frontend for the Spider-Man themed portfolio website.

## Tech Stack

- **React 19** — UI library
- **Vite** — Build tool & dev server
- **Tailwind CSS v3** — Utility-first CSS framework
- **GSAP + ScrollTrigger** — Complex timeline & scroll-triggered animations
- **Framer Motion** — Component transitions & layout animations
- **React Icons** — Icon library (Simple Icons, Heroicons, VS Code icons)
- **React Toastify** — Toast notifications
- **Axios** — HTTP client for API calls

## Key Components

| Component | Description |

| `SpiderWebIntro.jsx` | Canvas-based cinematic spider-web intro animation |

| `Navbar.jsx` | Sticky glassmorphism navigation with active section tracking |
| `HeroSection.jsx` | Hero with typing effect, gradient name, CTA buttons |

| `AboutSection.jsx` | Bio, contact info, animated count-up stats |

| `SkillsSection.jsx` | Category tabs with animated progress bars |

| `ProjectsSection.jsx` | Filterable project cards with detail modals |

| `AchievementsSection.jsx` | Timeline layout with web-strand connector |

| `ContactSection.jsx` | Validated contact form with API submission |

| `ParticleBackground.jsx` | Interactive canvas particle network |

| `ThemeToggle.jsx` | Dark/light theme toggle switch |

## Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment

The Vite dev server proxies `/api` requests to the Express backend at `http://localhost:5000` (configured in `vite.config.js`).

## Customization

Edit `src/data/portfolioData.js` to update all portfolio content (name, skills, projects, achievements, etc.).
