import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number,
        required: true
    }
});

const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['phishing', 'social-engineering', 'password-security', 'data-protection', 'general'],
        default: 'general'
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    content: {
        type: String,
        required: true
    },
    quiz: [quizQuestionSchema],
    duration: {
        type: Number,
        default: 10 // minutes
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Training = mongoose.model('Training', trainingSchema);

export default Training;
