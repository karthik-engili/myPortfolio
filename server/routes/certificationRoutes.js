import express from 'express';
import Certification from '../models/Certification.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/certifications - Public
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/certifications - Admin
router.post('/', protect, async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    await logAction('certification_create', req, `Created certification: ${cert.name}`);
    res.status(201).json({ success: true, data: cert });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/certifications/:id - Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    await logAction('certification_update', req, `Updated certification: ${cert.name}`);
    res.json({ success: true, data: cert });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/certifications/:id - Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    await logAction('certification_delete', req, `Deleted certification: ${cert.name}`);
    res.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
