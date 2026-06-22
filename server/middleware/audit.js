import AuditLog from '../models/AuditLog.js';

/**
 * Log an admin action for audit trail
 */
export const logAction = async (action, req, details = '') => {
  try {
    await AuditLog.create({
      action,
      adminId: req.admin ? req.admin._id : null,
      adminUsername: req.admin ? req.admin.username : (req.body?.username || 'unknown'),
      details,
      ipAddress: req.ip || req.connection?.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
    });
  } catch (error) {
    console.error('Audit log error:', error.message);
  }
};
