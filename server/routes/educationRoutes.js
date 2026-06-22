import express from 'express';
import Education from '../models/Education.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/education - Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/education - Admin
router.post('/', protect, async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    await logAction('education_create', req, `Created education: ${edu.degree} at ${edu.institution}`);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/education/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
    await logAction('education_update', req, `Updated education: ${edu.degree} at ${edu.institution}`);
    res.json({ success: true, data: edu });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/education/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
    await logAction('education_delete', req, `Deleted education: ${edu.degree} at ${edu.institution}`);
    res.json({ success: true, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
