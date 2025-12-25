import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	status: {
		type: String,
		enum: ['active', 'paused', 'abandoned', 'shipped'],
		default: 'active',
	},
	reason: { type: String },
	repoUrl: { type: String },
	startedAt: { type: Date, default: Date.now },
	endedAt: { type: Date },
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}, // Associate project with user
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
