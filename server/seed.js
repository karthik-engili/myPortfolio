import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Setting from './models/Setting.js';
import Skill from './models/Skill.js';
import Achievement from './models/Achievement.js';
import SocialLink from './models/SocialLink.js';
import Project from './models/Project.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');

    // --- Seed Admin ---
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!existingAdmin) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'superadmin',
      });
      console.log('✅ Admin account created');
    } else {
      console.log('ℹ️  Admin account already exists');
    }

    // --- Seed Settings ---
    const existingSettings = await Setting.findOne();
    if (!existingSettings) {
      await Setting.create({
        fullName: 'Karthik Engili', firstName: 'Karthik', lastName: 'Engili',
        professionalTitle: 'Full-Stack Developer & Tech Explorer',
        roles: ['Full-Stack Developer', 'Problem Solver', 'Tech Explorer'],
        bio: `Passionate full-stack developer with a knack for building immersive web experiences. I specialize in crafting pixel-perfect frontends and robust backends that bring ideas to life. With a strong foundation in the MERN stack and a love for clean code, I transform complex problems into elegant, user-friendly solutions.`,
        email: 'engilikarthik@gmail.com', phone: '+91 7780666025',
        location: 'Hyderabad, Telangana, India',
        heroDescription: "I craft immersive web experiences with clean code and creative design. Let's build something spectacular together.",
        statsProjects: 25, statsExperience: 3, statsClients: 15, statsCommits: 1200,
      });
      console.log('✅ Settings seeded');
    }

    // --- Seed Skills ---
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const skills = [
        { name: 'React.js', category: 'Frontend', icon: 'SiReact', proficiency: 90, displayOrder: 1 },
        { name: 'JavaScript', category: 'Frontend', icon: 'SiJavascript', proficiency: 92, displayOrder: 2 },
        { name: 'HTML5', category: 'Frontend', icon: 'SiHtml5', proficiency: 95, displayOrder: 3 },
        { name: 'CSS3', category: 'Frontend', icon: 'SiCss3', proficiency: 90, displayOrder: 4 },
        { name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', proficiency: 85, displayOrder: 5 },
        { name: 'Next.js', category: 'Frontend', icon: 'SiNextdotjs', proficiency: 75, displayOrder: 6 },
        { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', proficiency: 88, displayOrder: 1 },
        { name: 'Express.js', category: 'Backend', icon: 'SiExpress', proficiency: 85, displayOrder: 2 },
        { name: 'MongoDB', category: 'Backend', icon: 'SiMongodb', proficiency: 82, displayOrder: 3 },
        { name: 'Python', category: 'Backend', icon: 'SiPython', proficiency: 78, displayOrder: 4 },
        { name: 'REST APIs', category: 'Backend', icon: 'SiPostman', proficiency: 90, displayOrder: 5 },
        { name: 'Firebase', category: 'Backend', icon: 'SiFirebase', proficiency: 72, displayOrder: 6 },
        { name: 'Git & GitHub', category: 'Tools & Others', icon: 'SiGit', proficiency: 88, displayOrder: 1 },
        { name: 'VS Code', category: 'Tools & Others', icon: 'SiVisualstudiocode', proficiency: 92, displayOrder: 2 },
        { name: 'Docker', category: 'Tools & Others', icon: 'SiDocker', proficiency: 65, displayOrder: 3 },
        { name: 'Figma', category: 'Tools & Others', icon: 'SiFigma', proficiency: 70, displayOrder: 4 },
        { name: 'Linux', category: 'Tools & Others', icon: 'SiLinux', proficiency: 75, displayOrder: 5 },
        { name: 'Vercel', category: 'Tools & Others', icon: 'SiVercel', proficiency: 80, displayOrder: 6 },
      ];
      await Skill.insertMany(skills);
      console.log('✅ Skills seeded');
    }

    // --- Seed Achievements ---
    const achieveCount = await Achievement.countDocuments();
    if (achieveCount === 0) {
      const achievements = [
        { title: 'AWS Cloud Practitioner Certified', description: 'Earned the AWS Cloud Practitioner certification demonstrating foundational cloud knowledge.', date: '2025', category: 'certification', icon: '🏅', displayOrder: 1 },
        { title: 'Hackathon Winner — TechFest 2024', description: 'First place at the university hackathon for building an AI-powered accessibility tool in 24 hours.', date: '2024', category: 'award', icon: '🏆', displayOrder: 2 },
        { title: 'Open Source Contributor', description: 'Contributed to multiple open-source projects including React ecosystem libraries with 50+ merged PRs.', date: '2024', category: 'contribution', icon: '⭐', displayOrder: 3 },
        { title: 'Full-Stack Web Development Bootcamp', description: 'Completed an intensive 6-month bootcamp covering MERN stack, system design, and deployment.', date: '2023', category: 'certification', icon: '📜', displayOrder: 4 },
        { title: "Dean's List — Computer Science", description: 'Recognized on the Dean\'s List for academic excellence with a GPA of 3.9/4.0.', date: '2023', category: 'award', icon: '🎓', displayOrder: 5 },
      ];
      await Achievement.insertMany(achievements);
      console.log('✅ Achievements seeded');
    }

    // --- Seed Social Links ---
    const socialCount = await SocialLink.countDocuments();
    if (socialCount === 0) {
      const links = [
        { platform: 'GitHub', url: 'https://github.com/karthik-engili', icon: 'FiGithub', displayOrder: 1 },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/karthik-engili-aaa402379/', icon: 'FiLinkedin', displayOrder: 2 },
        { platform: 'Twitter', url: 'https://x.com/karthikengili16', icon: 'FiTwitter', displayOrder: 3 },
      ];
      await SocialLink.insertMany(links);
      console.log('✅ Social links seeded');
    }

    // --- Seed Projects ---
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projects = [
        { title: 'SpiderTrack', description: 'A real-time task management application with kanban boards, team collaboration features, and analytics dashboard.', techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'], category: 'Full-Stack', featured: true },
        { title: 'WebShop E-Commerce', description: 'A fully responsive e-commerce platform with product filtering, cart management, Stripe payment integration.', techStack: ['React', 'Express', 'MongoDB', 'Stripe'], category: 'Full-Stack', featured: true },
        { title: 'Neural Blog', description: 'A modern blogging platform with rich text editor, image uploads, comment system, and SEO optimization.', techStack: ['Next.js', 'MongoDB', 'Tailwind', 'Cloudinary'], category: 'Full-Stack', featured: true },
        { title: 'Weather Sense', description: 'A beautiful weather application with 7-day forecasts, location-based search, and animated weather conditions.', techStack: ['React', 'OpenWeather API', 'Chart.js'], category: 'Frontend', featured: false },
        { title: 'DevConnect API', description: 'A RESTful API for a developer social network with authentication, profile management, and notifications.', techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'], category: 'Backend', featured: false },
        { title: 'Portfolio V1', description: 'My first portfolio website built with vanilla HTML, CSS, and JavaScript with smooth animations.', techStack: ['HTML', 'CSS', 'JavaScript'], category: 'Frontend', featured: false },
      ];
      await Project.insertMany(projects);
      console.log('✅ Projects seeded');
    }

    console.log('\n🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
