export const personalData = {
  name: "Karthik Engili",
  firstName: "Karthik",
  lastName: "Engili",
  tagline: "Full-Stack Developer & Tech Explorer",
  roles: [
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Explorer",
  ],
  bio: `Passionate full-stack developer with a knack for building immersive web experiences. 
  I specialize in crafting pixel-perfect frontends and robust backends that bring ideas to life. 
  With a strong foundation in the MERN stack and a love for clean code, I transform complex problems 
  into elegant, user-friendly solutions.`,
  stats: {
    projects: 25,
    experience: 3,
    clients: 15,
    commits: 1200,
  },
  email: "engilikarthik@gmail.com",
  phone: "+91 7780666025",
  location: "Hyderabad, Telangana, India",
  social: {
    github: "https://github.com/karthik-engili",
    linkedin: "https://www.linkedin.com/in/karthik-engili-aaa402379/",
    twitter: "https://x.com/karthikengili16",
  },
  resumeUrl: "#",
};

export const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90, icon: "SiReact" },
      { name: "JavaScript", level: 92, icon: "SiJavascript" },
      { name: "HTML5", level: 95, icon: "SiHtml5" },
      { name: "CSS3", level: 90, icon: "SiCss3" },
      { name: "Tailwind CSS", level: 85, icon: "SiTailwindcss" },
      { name: "Next.js", level: 75, icon: "SiNextdotjs" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88, icon: "SiNodedotjs" },
      { name: "Express.js", level: 85, icon: "SiExpress" },
      { name: "MongoDB", level: 82, icon: "SiMongodb" },
      { name: "Python", level: 78, icon: "SiPython" },
      { name: "REST APIs", level: 90, icon: "SiPostman" },
      { name: "Firebase", level: 72, icon: "SiFirebase" },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 88, icon: "SiGit" },
      { name: "VS Code", level: 92, icon: "SiVisualstudiocode" },
      { name: "Docker", level: 65, icon: "SiDocker" },
      { name: "Figma", level: 70, icon: "SiFigma" },
      { name: "Linux", level: 75, icon: "SiLinux" },
      { name: "Vercel", level: 80, icon: "SiVercel" },
    ],
  },
];

export const projectsData = [
  {
    id: 1,
    title: "SpiderTrack",
    description: "A real-time task management application with kanban boards, team collaboration features, and analytics dashboard. Built with drag-and-drop functionality.",
    image: null,
    techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "WebShop E-Commerce",
    description: "A fully responsive e-commerce platform with product filtering, cart management, Stripe payment integration, and admin dashboard.",
    image: null,
    techStack: ["React", "Express", "MongoDB", "Stripe"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Neural Blog",
    description: "A modern blogging platform with rich text editor, image uploads, comment system, and SEO optimization. Supports multiple author roles.",
    image: null,
    techStack: ["Next.js", "MongoDB", "Tailwind", "Cloudinary"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Weather Sense",
    description: "A beautiful weather application with 7-day forecasts, location-based search, interactive maps, and animated weather conditions.",
    image: null,
    techStack: ["React", "OpenWeather API", "Chart.js"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "DevConnect API",
    description: "A RESTful API for a developer social network with authentication, profile management, posts, and real-time notifications.",
    image: null,
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio V1",
    description: "My first portfolio website built with vanilla HTML, CSS, and JavaScript. Features smooth animations and a clean, minimal design.",
    image: null,
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const achievementsData = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Certified",
    description: "Earned the AWS Cloud Practitioner certification demonstrating foundational cloud knowledge.",
    date: "2025",
    type: "certification",
    icon: "🏅",
  },
  {
    id: 2,
    title: "Hackathon Winner — TechFest 2024",
    description: "First place at the university hackathon for building an AI-powered accessibility tool in 24 hours.",
    date: "2024",
    type: "award",
    icon: "🏆",
  },
  {
    id: 3,
    title: "Open Source Contributor",
    description: "Contributed to multiple open-source projects including React ecosystem libraries with 50+ merged PRs.",
    date: "2024",
    type: "contribution",
    icon: "⭐",
  },
  {
    id: 4,
    title: "Full-Stack Web Development Bootcamp",
    description: "Completed an intensive 6-month bootcamp covering MERN stack, system design, and deployment.",
    date: "2023",
    type: "certification",
    icon: "📜",
  },
  {
    id: 5,
    title: "Dean's List — Computer Science",
    description: "Recognized on the Dean's List for academic excellence with a GPA of 3.9/4.0.",
    date: "2023",
    type: "award",
    icon: "🎓",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];
