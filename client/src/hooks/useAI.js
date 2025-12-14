import { useState } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const useAI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedEmail, setGeneratedEmail] = useState(null);

    /**
     * Generate a phishing simulation email using AI
     * @param {Object} params - Email generation parameters
     */
    const generateEmail = async (params) => {
        setLoading(true);
        setError(null);
        setGeneratedEmail(null);

        try {
            const response = await axiosInstance.post('/api/ai/generate-email', params);

            if (response.data.success) {
                setGeneratedEmail(response.data.data);
                return { success: true, data: response.data.data };
            } else {
                const errorMessage = response.data.message || 'Failed to generate email';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Clear the generated email and error state
     */
    const clearEmail = () => {
        setGeneratedEmail(null);
        setError(null);
    };

    return {
        loading,
        error,
        generatedEmail,
        generateEmail,
        clearEmail
    };
};

export default useAI;
