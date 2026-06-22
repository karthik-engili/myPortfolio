import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Cloud', 'Tools', 'DevOps', 'Tools & Others'],
    trim: true,
  },
  icon: {
    type: String,
    default: '',
    trim: true,
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency is required'],
    min: 0,
    max: 100,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Skill', skillSchema);
