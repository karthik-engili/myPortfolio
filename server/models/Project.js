import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  images: [{
    type: String,
  }],
  techStack: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full-Stack', 'Mobile', 'DevOps', 'Other'],
    required: true,
  },
  liveUrl: {
    type: String,
    default: '#',
  },
  githubUrl: {
    type: String,
    default: '#',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'published',
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Project', projectSchema);
