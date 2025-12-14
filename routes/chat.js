// Chat Routes - No auth required for public access
import express from 'express';
import { handleChat } from '../controllers/chatbotController.js';

const router = express.Router();

// Chat endpoint - no auth middleware (accessible to all visitors)
router.post('/', handleChat);

export default router;
