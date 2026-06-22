import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/experience - Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/experience - Admin
router.post('/', protect, async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    await logAction('experience_create', req, `Created experience: ${exp.role} at ${exp.company}`);
    res.status(201).json({ success: true, data: exp });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/experience/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    await logAction('experience_update', req, `Updated experience: ${exp.role} at ${exp.company}`);
    res.json({ success: true, data: exp });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/experience/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    await logAction('experience_delete', req, `Deleted experience: ${exp.role} at ${exp.company}`);
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
