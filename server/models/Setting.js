import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, default: 'Karthik Engili' },
  firstName: { type: String, default: 'Karthik' },
  lastName: { type: String, default: 'Engili' },
  professionalTitle: { type: String, default: 'Full-Stack Developer & Tech Explorer' },
  roles: [{ type: String }],
  bio: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  profileImage: { type: String, default: null },

  // Hero Section
  heroTagline: { type: String, default: '' },
  heroDescription: { type: String, default: '' },

  // Stats
  statsProjects: { type: Number, default: 0 },
  statsExperience: { type: Number, default: 0 },
  statsClients: { type: Number, default: 0 },
  statsCommits: { type: Number, default: 0 },

  // Resume
  resumeUrl: { type: String, default: '' },
  resumeFileName: { type: String, default: '' },
}, {
  timestamps: true,
});

export default mongoose.model('Setting', settingSchema);
