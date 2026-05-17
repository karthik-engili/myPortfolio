import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  techStack: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full-Stack'],
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
}, {
  timestamps: true,
});

export default mongoose.model('Project', projectSchema);
