import express from 'express';
import Admin from '../models/Admin.js';
import { generateToken, protect, setTokenCookie, clearTokenCookie } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    }).select('+password');

    if (!admin) {
      await logAction('login_failed', req, `Failed login attempt for: ${username}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (admin.isLocked()) {
      const lockMinutes = Math.ceil((admin.lockUntil - Date.now()) / 60000);
      await logAction('login_failed', req, `Account locked — ${username}`);
      return res.status(423).json({
        success: false,
        message: `Account locked. Try again in ${lockMinutes} minute(s).`,
      });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await admin.incrementLoginAttempts();
      await logAction('login_failed', req, `Wrong password for: ${username}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    await admin.updateOne({
      $set: { loginAttempts: 0, lastLogin: new Date() },
      $unset: { lockUntil: 1 },
    });

    // Generate token and set cookie
    const token = generateToken(admin._id);
    setTokenCookie(res, token);

    await logAction('login', { ...req, admin }, 'Successful login');

    res.json({
      success: true,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/logout - Admin logout
router.post('/logout', protect, async (req, res) => {
  try {
    await logAction('logout', req, 'Admin logged out');
    clearTokenCookie(res);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    clearTokenCookie(res);
    res.json({ success: true, message: 'Logged out' });
  }
});

// GET /api/auth/validate - Validate session
router.get('/validate', protect, async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

// PUT /api/auth/password - Change password
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    await logAction('password_change', req, 'Password changed');
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
