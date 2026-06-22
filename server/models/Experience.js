import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  companyLogo: {
    type: String,
    default: null,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Experience', experienceSchema);
