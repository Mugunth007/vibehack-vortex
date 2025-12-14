// AI Routes
import express from 'express';
import { generateEmail } from '../controllers/aiController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Generate phishing email using AI
router.post('/generate-email', generateEmail);

export default router;
