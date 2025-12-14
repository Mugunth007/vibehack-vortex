// AI Service - Gemini API Integration for Email Generation
import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

// Initialize Gemini client
const getGeminiClient = () => {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('GEMINI_API_KEY is not configured in .env file');
            throw new Error('GEMINI_API_KEY is not configured');
        }

        console.log('AI Service - Gemini API Key configured: Yes (length: ' + apiKey.length + ')');
        genAI = new GoogleGenerativeAI(apiKey);
    }
    return genAI;
};

/**
 * Generate a phishing simulation email based on parameters
 * @param {Object} params - Email generation parameters
 * @returns {Promise<Object>} Generated email content
 */
export const generatePhishingEmail = async (params) => {
    const {
        targetAudience = 'general-employees',
        objective = 'initial-awareness',
        threatType = 'credential-harvesting',
        industry = 'general',
        tone = 'formal-corporate',
        trigger = 'none',
        callToAction = 'click-link',
        customContext = ''
    } = params;

    const systemPrompt = `You are an AI assistant specialized in creating realistic phishing simulation emails for security awareness training. Your emails should be convincing but will be used ONLY for authorized security testing and employee training.

Generate professional phishing simulation emails that:
- Are realistic enough to test employee awareness
- Include common phishing indicators that trained users should recognize
- Match the specified parameters for targeting and context
- Never include actual malicious content or real exploit code

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks) with these exact fields:
{
  "subject": "The email subject line",
  "senderName": "Suggested sender display name",
  "senderEmail": "sender@company.com",
  "htmlBody": "The full HTML email body with professional styling",
  "textBody": "Plain text version of the email",
  "redFlags": ["Array of phishing indicators for training"]
}`;

    const userPrompt = `Create a phishing simulation email with the following parameters:

**Target Audience:** ${targetAudience.replace(/-/g, ' ')}
**Campaign Objective:** ${objective.replace(/-/g, ' ')}
**Threat Type:** ${threatType.replace(/-/g, ' ')}
**Industry Context:** ${industry.replace(/-/g, ' ')}
**Email Tone:** ${tone.replace(/-/g, ' ')}
**Contextual Trigger:** ${trigger === 'none' ? 'No specific trigger' : trigger.replace(/-/g, ' ')}
**Call-to-Action Type:** ${callToAction.replace(/-/g, ' ')}

${customContext ? `**Additional Context:** ${customContext}` : ''}

Generate a realistic phishing simulation email that matches these parameters. Include appropriate urgency, authority cues, and social engineering techniques that are commonly used in real attacks. The email should be professional and believable.

IMPORTANT: Respond with ONLY the JSON object, no markdown formatting.`;

    try {
        const ai = getGeminiClient();
        const model = ai.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: systemPrompt
        });

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 4096,
            }
        });

        const responseText = result.response.text();

        // Clean the response - remove markdown code blocks if present
        let cleanedResponse = responseText.trim();
        if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse.slice(7);
        } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse.slice(3);
        }
        if (cleanedResponse.endsWith('```')) {
            cleanedResponse = cleanedResponse.slice(0, -3);
        }
        cleanedResponse = cleanedResponse.trim();

        const emailData = JSON.parse(cleanedResponse);

        return {
            success: true,
            data: {
                subject: emailData.subject || 'Security Alert: Action Required',
                senderName: emailData.senderName || 'IT Security',
                senderEmail: emailData.senderEmail || 'security@company.com',
                htmlBody: emailData.htmlBody || '',
                textBody: emailData.textBody || '',
                redFlags: emailData.redFlags || [],
                generatedAt: new Date().toISOString(),
                parameters: params
            }
        };
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw new Error(`Failed to generate email: ${error.message}`);
    }
};

export default {
    generatePhishingEmail
};
