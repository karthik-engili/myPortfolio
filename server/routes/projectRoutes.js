import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';
import { logAction } from '../middleware/audit.js';

const router = express.Router();

// GET /api/projects - Public: get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/projects/:id - Public: get single project
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

// POST /api/projects - Admin: create project
router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    await logAction('project_create', req, `Created project: ${project.title}`);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/projects/:id - Admin: update project
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await logAction('project_update', req, `Updated project: ${project.title}`);
    res.json({ success: true, data: project });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/projects/:id - Admin: delete project
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await logAction('project_delete', req, `Deleted project: ${project.title}`);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
