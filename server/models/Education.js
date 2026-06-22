import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true,
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
  },
  cgpa: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Education', educationSchema);
