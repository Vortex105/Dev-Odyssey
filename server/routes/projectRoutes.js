import express from 'express';
import { body, validationResult, param } from 'express-validator';
import Project from '../models/Project.js';
import authenticateToken from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Validation middleware for project creation
const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be between 1 and 200 characters'),
  body('status')
    .optional()
    .isIn(['active', 'paused', 'abandoned', 'shipped'])
    .withMessage('Status must be one of: active, paused, abandoned, shipped'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Reason must not exceed 1000 characters'),
  body('repoUrl')
    .optional()
    .isURL()
    .withMessage('Repository URL must be a valid URL')
];

// Validation middleware for project update
const validateProjectUpdate = [
  body('status')
    .optional()
    .isIn(['active', 'paused', 'abandoned', 'shipped'])
    .withMessage('Status must be one of: active, paused, abandoned, shipped'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Reason must not exceed 1000 characters')
];

// Validation middleware for ObjectId
const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID')
];

// Apply authentication middleware to all project routes
router.use(authenticateToken);

router.post('/', validateProject, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Add user ID to the project before creating
    const project = await Project.create({
      ...req.body,
      userId: req.user.id // Associate project with authenticated user
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error during project creation' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status } = req.query; // get ?status= from URL
    let filter = { userId: req.user.id }; // Only return projects belonging to authenticated user

    if (status) {
      // Validate status parameter
      if (!['active', 'paused', 'abandoned', 'shipped'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status parameter' });
      }
      filter.status = status; // only projects with this status
    }

    const projects = await Project.find(filter);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error during project retrieval' });
  }
});

router.patch('/:id', validateObjectId, validateProjectUpdate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find project and ensure it belongs to the authenticated user
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields if they exist in req.body
    if (req.body.status) project.status = req.body.status;
    if (req.body.reason) project.reason = req.body.reason;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error during project update' });
  }
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find and delete project that belongs to the authenticated user
    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during project deletion' });
  }
});

export default router;
