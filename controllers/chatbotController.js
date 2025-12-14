// Chatbot Controller
import { chat } from '../services/chatbotService.js';

/**
 * Handle chat message
 * POST /api/chat
 */
export const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Limit message length
        if (message.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Message is too long (max 1000 characters)'
            });
        }

        const result = await chat(message, history || []);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Chat Controller Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to process chat message'
        });
    }
};

export default {
    handleChat
};
