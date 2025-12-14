import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
    getSecurityMetrics,
    getCampaignTrends,
    getEmployeeRiskBreakdown,
    exportReport
} from '../controllers/reportController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/metrics', getSecurityMetrics);
router.get('/trends', getCampaignTrends);
router.get('/risk-breakdown', getEmployeeRiskBreakdown);
router.get('/export', exportReport);

export default router;
