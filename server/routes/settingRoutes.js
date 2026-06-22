import express from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/settings - Public
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({
        fullName: 'Karthik Engili', firstName: 'Karthik', lastName: 'Engili',
        professionalTitle: 'Full-Stack Developer & Tech Explorer',
        roles: ['Full-Stack Developer', 'Problem Solver', 'Tech Explorer'],
        bio: 'Passionate full-stack developer with a knack for building immersive web experiences.',
        email: 'engilikarthik@gmail.com', phone: '+91 7780666025',
        location: 'Hyderabad, Telangana, India',
        heroDescription: "I craft immersive web experiences with clean code and creative design.",
        statsProjects: 25, statsExperience: 3, statsClients: 15, statsCommits: 1200,
        resumeUrl: '#',
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/settings - Admin
router.put('/', protect, async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) { settings = await Setting.create(req.body); }
    else { Object.assign(settings, req.body); await settings.save(); }
    await logAction('settings_update', req, 'Updated portfolio settings');
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
