import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { sanitizeInput } from './middleware/sanitize.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Admin from './models/Admin.js';
import Setting from './models/Setting.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting for login endpoint (brute force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];
if (process.env.CLIENT_URL) {
  // Remove trailing slash if present to avoid CORS mismatches
  const sanitizedClientUrl = process.env.CLIENT_URL.replace(/\/$/, '');
  allowedOrigins.push(sanitizedClientUrl);
}
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB connected');

      // Auto-seed Admin if database is empty
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        await Admin.create({
          username: process.env.ADMIN_USERNAME || 'admin',
          email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
          password: process.env.ADMIN_PASSWORD || 'Admin@123',
          role: 'superadmin',
        });
        console.log('✅ Auto-seeded default admin user');
      }

      // Auto-seed Setting if empty
      const settingCount = await Setting.countDocuments();
      if (settingCount === 0) {
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
        console.log('✅ Auto-seeded default settings');
      }
    } else {
      console.warn('⚠️  MONGO_URI not set — running without database');
    }
    
    app.listen(PORT, () => {
      console.log(`🕷️  Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
