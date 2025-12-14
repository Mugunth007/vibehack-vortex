import mongoose from 'mongoose';

const trainingProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    attempts: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

// Compound index to ensure unique progress per user per training
trainingProgressSchema.index({ userId: 1, trainingId: 1 }, { unique: true });

const TrainingProgress = mongoose.model('TrainingProgress', trainingProgressSchema);

export default TrainingProgress;
