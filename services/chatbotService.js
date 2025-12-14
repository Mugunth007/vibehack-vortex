// Chatbot Service - Gemini API Integration
import { GoogleGenerativeAI } from '@google/generative-ai';

// System context about the Decoy platform
const SYSTEM_CONTEXT = `You are Shiro, a friendly and knowledgeable AI assistant for the Decoy platform. You have an anime-inspired personality - you're clever, helpful, and occasionally playful.

About Decoy:
Decoy is an AI-powered security awareness and phishing simulation platform designed to help organizations protect their employees from social engineering attacks. It provides tools to test, train, and track employee security awareness.

Key Features:
1. **Phishing Simulation**: Create realistic email phishing simulations with customizable templates
2. **SMS Campaigns**: Test mobile security awareness (Coming Soon)
3. **Voice Phishing (Vishing)**: AI-driven vishing simulations (Coming Soon)
4. **Analytics & Reporting**: Real-time dashboard, risk scoring, detailed reports
5. **Audience Management**: Contact management, bulk CSV import, group targeting
6. **AI Email Builder**: Generate phishing simulation emails using AI
7. **Template Builder**: Import custom HTML templates or use AI to generate them
8. **Sender Profiles**: Configure custom SMTP sender profiles

Your role:
- Help users understand how Decoy works
- Explain features and how to use them
- Answer questions about security awareness training
- Be friendly, helpful, and occasionally add a playful anime-style touch (but don't overdo it)
- Keep responses concise but informative
- If you don't know something specific about Decoy, be honest about it

Remember: You're Shiro, the helpful security assistant! 🎮`;

let genAI = null;

// Initialize Gemini client
const getGeminiClient = () => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is not configured in .env file');
            throw new Error('GEMINI_API_KEY is not configured');
        }

        console.log('Chatbot Service - Gemini API Key configured: Yes (length: ' + apiKey.length + ')');
        genAI = new GoogleGenerativeAI(apiKey);
    }
    return genAI;
};

/**
 * Chat with Shiro using Gemini
 * @param {string} message - User's message
 * @param {Array} history - Previous conversation history
 * @returns {Promise<Object>} Shiro's response
 */
export const chat = async (message, history = []) => {
    try {
        const ai = getGeminiClient();
        const model = ai.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: SYSTEM_CONTEXT
        });

        // Build conversation history for context
        const chatHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Start chat with history
        const chatSession = model.startChat({
            history: chatHistory,
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1024,
            }
        });

        // Send message and get response
        const result = await chatSession.sendMessage(message);
        const response = result.response.text();

        return {
            success: true,
            data: {
                message: response,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Chatbot Error:', error);
        throw new Error(`Failed to get response: ${error.message}`);
    }
};

export default {
    chat
};
