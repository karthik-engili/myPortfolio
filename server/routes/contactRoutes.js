import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a2e; color: #f5f5f5; border-radius: 12px;">
              <h2 style="color: #e23636; border-bottom: 2px solid #e23636; padding-bottom: 10px;">🕷️ New Contact Form Submission</h2>
              <p><strong style="color: #e23636;">Name:</strong> ${name}</p>
              <p><strong style="color: #e23636;">Email:</strong> ${email}</p>
              <p><strong style="color: #e23636;">Subject:</strong> ${subject}</p>
              <p><strong style="color: #e23636;">Message:</strong></p>
              <p style="background: #16213e; padding: 15px; border-radius: 8px; border-left: 3px solid #e23636;">${message}</p>
              <hr style="border-color: #2146c7; opacity: 0.3;" />
              <p style="font-size: 12px; color: #6c6c80;">Sent from your Portfolio website</p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
      // Don't fail the request if email fails
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

export default router;
