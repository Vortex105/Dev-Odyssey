import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const project = await Project.create(req.body);
		res.status(201).json(project);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const { status } = req.query; // get ?status= from URL
		let filter = {};

		if (status) {
			filter.status = status; // only projects with this status
		}

		const projects = await Project.find(filter);
		res.json(projects);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		// Update fields if they exist in req.body
		if (req.body.status) project.status = req.body.status;
		if (req.body.reason) project.reason = req.body.reason;

		const updatedProject = await project.save();
		res.json(updatedProject);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedProject = await Project.findByIdAndDelete(req.params.id);

		if (!deletedProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.json({ message: 'Project deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
