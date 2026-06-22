import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['award', 'certification', 'contribution', 'hackathon', 'competition', 'ranking', 'other'],
    default: 'other',
  },
  date: {
    type: String,
    default: '',
    trim: true,
  },
  icon: {
    type: String,
    default: '🏆',
  },
  supportingLink: {
    type: String,
    default: '',
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Achievement', achievementSchema);
