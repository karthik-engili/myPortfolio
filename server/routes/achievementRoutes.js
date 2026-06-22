import express from 'express';
import Achievement from '../models/Achievement.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/achievements - Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/achievements - Admin
router.post('/', protect, async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    await logAction('achievement_create', req, `Created achievement: ${achievement.title}`);
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/achievements/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    await logAction('achievement_update', req, `Updated achievement: ${achievement.title}`);
    res.json({ success: true, data: achievement });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/achievements/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
    await logAction('achievement_delete', req, `Deleted achievement: ${achievement.title}`);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
