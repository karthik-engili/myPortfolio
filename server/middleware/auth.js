import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-portfolio-key-change-me';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

/**
 * Generate JWT token
 */
export const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

/**
 * Auth middleware - protects admin routes
 * Checks for JWT in httpOnly cookie or Authorization header
 */
export const protect = async (req, res, next) => {
  try {
    let token = null;

    // Check httpOnly cookie first
    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }
    // Fallback to Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized — no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized — admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired — please login again' });
    }
    return res.status(401).json({ success: false, message: 'Not authorized — invalid token' });
  }
};

/**
 * Set auth cookie
 */
export const setTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
};

/**
 * Clear auth cookie
 */
export const clearTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('admin_token', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(0),
    path: '/',
  });
};
