import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// POST /api/contact - Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email notification (optional)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT) || 587,
          secure: false,
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;padding:20px;background:#1a1a2e;color:#f5f5f5;border-radius:12px;"><h2 style="color:#e23636;">New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p style="background:#16213e;padding:15px;border-radius:8px;">${message}</p></div>`,
        });
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/contact - Admin: get all messages
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    const filter = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ],
    } : {};

    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);
    res.json({ success: true, data: messages, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/contact/:id/read - Admin: mark as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    await logAction('contact_read', req, `Marked message from ${contact.name} as read`);
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/contact/:id - Admin: delete message
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    await logAction('contact_delete', req, `Deleted message from ${contact.name}`);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
