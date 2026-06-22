import express from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';
import Experience from '../models/Experience.js';
import Contact from '../models/Contact.js';
import AuditLog from '../models/AuditLog.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/dashboard - Dashboard analytics
router.get('/dashboard', protect, async (req, res) => {
  try {
    const [projects, skills, achievements, certs, experiences, contacts, recentLogs] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Achievement.countDocuments(),
      Certification.countDocuments(),
      Experience.countDocuments(),
      Contact.countDocuments(),
      AuditLog.find().sort({ createdAt: -1 }).limit(20),
    ]);
    const featuredProjects = await Project.countDocuments({ featured: true });
    res.json({
      success: true,
      data: {
        totalProjects: projects,
        featuredProjects,
        totalSkills: skills,
        totalAchievements: achievements,
        totalCertifications: certs,
        totalExperiences: experiences,
        totalMessages: contacts,
        recentActivity: recentLogs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      AuditLog.countDocuments(),
    ]);
    res.json({ success: true, data: logs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
