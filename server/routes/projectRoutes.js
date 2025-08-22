const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middleware/authMiddleware');

// Upload a new project
router.post('/upload', authenticateToken, async (req, res) => {
  try {
    const { title, description, image, demo, repo } = req.body;

    const newProject = new Project({ title, description, image, demo, repo });
    await newProject.save();

    res.status(201).json({ message: 'Project uploaded successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading project', error: err.message });
  }
});

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

// Delete a project (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
});

module.exports = router;
