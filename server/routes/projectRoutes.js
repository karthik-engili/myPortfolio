import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
