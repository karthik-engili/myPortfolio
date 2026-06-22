import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, 'Platform name is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
  },
  icon: {
    type: String,
    default: '',
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('SocialLink', socialLinkSchema);
