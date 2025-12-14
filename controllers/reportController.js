import Campaign from '../models/Campaign.js';
import CampaignTracking from '../models/CampaignTracking.js';
import TrainingProgress from '../models/TrainingProgress.js';
import Training from '../models/Training.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';

// Get overall security metrics
export const getSecurityMetrics = async (req, res) => {
    try {
        const userId = req.user._id;

        // Campaign metrics
        const campaigns = await Campaign.find({ userId });
        const campaignIds = campaigns.map(c => c._id);

        const tracking = await CampaignTracking.find({ campaignId: { $in: campaignIds } });

        let totalSent = 0;
        let totalOpened = 0;
        let totalClicked = 0;
        let totalSubmitted = 0;

        tracking.forEach(t => {
            totalSent += t.totalSent || 0;
            totalOpened += t.totalOpened || 0;
            totalClicked += t.totalClicked || 0;
            totalSubmitted += t.totalSubmitted || 0;
        });

        // Training metrics
        const trainingProgress = await TrainingProgress.find({ userId });
        const completedTrainings = trainingProgress.filter(p => p.completed).length;
        const totalTrainings = await Training.countDocuments({ isActive: true });
        const avgTrainingScore = trainingProgress.length > 0
            ? Math.round(trainingProgress.reduce((sum, p) => sum + p.score, 0) / trainingProgress.length)
            : 0;

        // Calculate risk score (0-100, lower is better)
        const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;
        const submissionRate = totalClicked > 0 ? (totalSubmitted / totalClicked) * 100 : 0;
        const trainingCompletion = totalTrainings > 0 ? (completedTrainings / totalTrainings) * 100 : 0;

        // Risk score formula: higher click/submission rates = higher risk, more training = lower risk
        const riskScore = Math.max(0, Math.min(100, Math.round(
            (clickRate * 0.4) + (submissionRate * 0.4) - (trainingCompletion * 0.2)
        )));

        const riskLevel = riskScore < 25 ? 'Low' : riskScore < 50 ? 'Medium' : riskScore < 75 ? 'High' : 'Critical';

        return res.status(200).json({
            success: true,
            data: {
                campaigns: {
                    total: campaigns.length,
                    totalSent,
                    totalOpened,
                    totalClicked,
                    totalSubmitted,
                    openRate: totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0,
                    clickRate: Math.round(clickRate),
                    submissionRate: Math.round(submissionRate)
                },
                training: {
                    total: totalTrainings,
                    completed: completedTrainings,
                    averageScore: avgTrainingScore,
                    completionRate: Math.round(trainingCompletion)
                },
                risk: {
                    score: riskScore,
                    level: riskLevel
                }
            }
        });
    } catch (error) {
        console.error('Get security metrics error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get campaign performance over time
export const getCampaignTrends = async (req, res) => {
    try {
        const userId = req.user._id;
        const campaigns = await Campaign.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('audienceId', 'name');

        const campaignData = await Promise.all(campaigns.map(async (campaign) => {
            const tracking = await CampaignTracking.findOne({ campaignId: campaign._id });
            return {
                id: campaign._id,
                name: campaign.name,
                audience: campaign.audienceId?.name || 'Unknown',
                date: campaign.createdAt,
                status: campaign.status,
                metrics: {
                    sent: tracking?.totalSent || 0,
                    opened: tracking?.totalOpened || 0,
                    clicked: tracking?.totalClicked || 0,
                    submitted: tracking?.totalSubmitted || 0
                }
            };
        }));

        return res.status(200).json({
            success: true,
            data: campaignData
        });
    } catch (error) {
        console.error('Get campaign trends error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get employee risk breakdown (for organizations)
export const getEmployeeRiskBreakdown = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get all contacts from user's audiences
        const campaigns = await Campaign.find({ userId }).populate('audienceId');
        const audienceIds = [...new Set(campaigns.map(c => c.audienceId?._id).filter(Boolean))];

        const contacts = await Contact.find({ audienceId: { $in: audienceIds } });

        // For now, return mock risk distribution
        const riskDistribution = {
            low: Math.floor(contacts.length * 0.6),
            medium: Math.floor(contacts.length * 0.25),
            high: Math.floor(contacts.length * 0.1),
            critical: Math.floor(contacts.length * 0.05)
        };

        return res.status(200).json({
            success: true,
            data: {
                totalEmployees: contacts.length,
                riskDistribution
            }
        });
    } catch (error) {
        console.error('Get employee risk breakdown error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Export report data (JSON format for now)
export const exportReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('email name');

        // Compile all metrics
        const campaigns = await Campaign.find({ userId });
        const campaignIds = campaigns.map(c => c._id);
        const tracking = await CampaignTracking.find({ campaignId: { $in: campaignIds } });
        const trainingProgress = await TrainingProgress.find({ userId });

        const reportData = {
            generatedAt: new Date().toISOString(),
            generatedBy: user?.email || 'Unknown',
            summary: {
                totalCampaigns: campaigns.length,
                totalEmailsSent: tracking.reduce((sum, t) => sum + (t.totalSent || 0), 0),
                overallClickRate: '15%', // Placeholder
                trainingModulesCompleted: trainingProgress.filter(p => p.completed).length,
                averageTrainingScore: trainingProgress.length > 0
                    ? Math.round(trainingProgress.reduce((sum, p) => sum + p.score, 0) / trainingProgress.length) + '%'
                    : 'N/A'
            },
            campaigns: campaigns.map(c => ({
                name: c.name,
                status: c.status,
                createdAt: c.createdAt
            })),
            trainingProgress: trainingProgress.map(p => ({
                completed: p.completed,
                score: p.score,
                completedAt: p.completedAt
            }))
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=security-report.json');
        return res.status(200).json(reportData);
    } catch (error) {
        console.error('Export report error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
