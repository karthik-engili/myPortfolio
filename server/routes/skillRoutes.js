import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/skills - Public: get all skills grouped by category
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      const cat = acc.find(c => c.category === skill.category);
      const skillObj = { name: skill.name, level: skill.proficiency, icon: skill.icon, _id: skill._id };
      if (cat) {
        cat.skills.push(skillObj);
      } else {
        acc.push({ category: skill.category, skills: [skillObj] });
      }
      return acc;
    }, []);
    res.json({ success: true, data: grouped });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/skills/all - Admin: get all skills flat
router.get('/all', protect, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, displayOrder: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/skills - Admin: create skill
router.post('/', protect, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    await logAction('skill_create', req, `Created skill: ${skill.name}`);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/skills/:id - Admin: update skill
router.put('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    await logAction('skill_update', req, `Updated skill: ${skill.name}`);
    res.json({ success: true, data: skill });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/skills/:id - Admin: delete skill
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    await logAction('skill_delete', req, `Deleted skill: ${skill.name}`);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
