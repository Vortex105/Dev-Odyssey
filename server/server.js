import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);

// app.post('/test', (req, res) => {
// 	res.send('Test route works');
// });

app.get('/', (req, res) => {
	res.json({ message: 'Dev Odyssey backend is running with modern import!' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
