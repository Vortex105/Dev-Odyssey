import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

console.log('AUTH ROUTES LOADED');

router.get('/', (req, res) => {
	res.json({ message: 'Auth root route is working!' });
});

// Register a new user
router.post(
	'/register',
	[
		body('username')
			.isLength({ min: 3, max: 30 })
			.withMessage('Username must be between 3 and 30 characters'),
		body('email').isEmail().withMessage('Please provide a valid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			console.log('req.body:', req.body);

			const { username, email, password } = req.body;

			const existingUser = await User.findOne({
				$or: [{ email }, { username }],
			});
			console.log('existingUser:', existingUser);

			const user = new User({ username, email, password });
			await user.save();
			console.log('User saved:', user);

			const token = jwt.sign(
				{ id: user._id, username: user.username },
				// process.env.JWT_SECRET || 'fallback_secret_key',
				process.env.JWT_SECRET,
				{ expiresIn: '7d' }
			);
			console.log('Token generated');

			res.status(201).json({
				message: 'User created successfully',
				token,
				user: { id: user._id, username: user.username, email: user.email },
			});
		} catch (error) {
			console.error('Registration error:', error);
			res.status(500).json({ error: 'Server error during registration' });
		}
	}
);

// Login user
router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Please provide a valid email'),
		body('password').exists().withMessage('Password is required'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { email, password } = req.body;

			// Find user by email
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ error: 'Invalid email or password' });
			}

			// Check password
			const isMatch = await user.comparePassword(password);
			if (!isMatch) {
				return res.status(400).json({ error: 'Invalid email or password' });
			}

			// Generate JWT token
			const token = jwt.sign(
				{ id: user._id, username: user.username },
				// process.env.JWT_SECRET || 'fallback_secret_key',
				process.env.JWT_SECRET,
				{ expiresIn: '7d' }
			);

			res.json({
				message: 'Login successful',
				token,
				user: {
					id: user._id,
					username: user.username,
					email: user.email,
				},
			});
		} catch (error) {
			res.status(500).json({ error: 'Server error during login' });
		}
	}
);

export default router;
