// AI Controller - Handle AI-related API requests
import { generatePhishingEmail } from '../services/aiService.js';

/**
 * Generate a phishing simulation email
 * POST /api/ai/generate-email
 */
export const generateEmail = async (req, res) => {
    try {
        const {
            targetAudience,
            objective,
            threatType,
            industry,
            tone,
            trigger,
            callToAction,
            customContext
        } = req.body;

        // Validate that at least some context is provided
        if (!customContext && !targetAudience && !threatType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least target audience, threat type, or custom context'
            });
        }

        const result = await generatePhishingEmail({
            targetAudience,
            objective,
            threatType,
            industry,
            tone,
            trigger,
            callToAction,
            customContext
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error('Generate Email Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate email'
        });
    }
};

export default {
    generateEmail
};
