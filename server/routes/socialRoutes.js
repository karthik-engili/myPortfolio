import express from 'express';
import SocialLink from '../models/SocialLink.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/social - Public
router.get('/', async (req, res) => {
  try {
    const links = await SocialLink.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/social/all - Admin: get all including inactive
router.get('/all', protect, async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ displayOrder: 1 });
    res.json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/social - Admin
router.post('/', protect, async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);
    await logAction('social_create', req, `Created social link: ${link.platform}`);
    res.status(201).json({ success: true, data: link });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/social/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!link) return res.status(404).json({ success: false, message: 'Social link not found' });
    await logAction('social_update', req, `Updated social link: ${link.platform}`);
    res.json({ success: true, data: link });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/social/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ success: false, message: 'Social link not found' });
    await logAction('social_delete', req, `Deleted social link: ${link.platform}`);
    res.json({ success: true, message: 'Social link deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
