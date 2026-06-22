import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Certificate name is required'],
    trim: true,
  },
  organization: {
    type: String,
    required: [true, 'Organization is required'],
    trim: true,
  },
  issueDate: {
    type: String,
    required: [true, 'Issue date is required'],
    trim: true,
  },
  credentialUrl: {
    type: String,
    default: '',
    trim: true,
  },
  image: {
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

export default mongoose.model('Certification', certificationSchema);
