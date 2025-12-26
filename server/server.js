import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/auth/authRoutes.js';

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

// Security middleware
app.use(helmet()); // Add security headers

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: { error: 'Too many requests from this IP, please try again later.' },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// CORS configuration - restrict to frontend domain in production
app.use(
	cors(
		{
			origin: process.env.FRONTEND_URL,
			credentials: true,
			optionsSuccessStatus: 200,
		},
		{
			origin: 'https://devodyssey.onrender.com',
			credentials: true,
			optionsSuccessStatus: 200,
		}
	)
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/projects', projectRoutes); // Project routes

// Health check endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Dev Odyssey backend is running with enhanced security!',
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
