import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
    getAllTrainings,
    getTraining,
    submitQuiz,
    getTrainingStats,
    seedTrainings
} from '../controllers/trainingController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Training routes
router.get('/', getAllTrainings);
router.get('/stats', getTrainingStats);
router.get('/:id', getTraining);
router.post('/submit-quiz', submitQuiz);
router.post('/seed', seedTrainings);

export default router;
