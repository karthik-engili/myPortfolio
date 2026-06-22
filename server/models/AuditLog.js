import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: [
      'login', 'logout', 'login_failed',
      'project_create', 'project_update', 'project_delete',
      'skill_create', 'skill_update', 'skill_delete',
      'experience_create', 'experience_update', 'experience_delete',
      'education_create', 'education_update', 'education_delete',
      'certification_create', 'certification_update', 'certification_delete',
      'achievement_create', 'achievement_update', 'achievement_delete',
      'social_create', 'social_update', 'social_delete',
      'settings_update', 'resume_upload', 'media_upload', 'media_delete',
      'contact_delete', 'contact_read',
      'password_change',
    ],
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null,
  },
  adminUsername: {
    type: String,
    default: 'unknown',
  },
  details: {
    type: String,
    default: '',
  },
  ipAddress: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Auto-expire logs after 90 days
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export default mongoose.model('AuditLog', auditLogSchema);
