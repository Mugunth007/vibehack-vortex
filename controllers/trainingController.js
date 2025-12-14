import Training from '../models/Training.js';
import TrainingProgress from '../models/TrainingProgress.js';

// Get all training modules
export const getAllTrainings = async (req, res) => {
    try {
        const trainings = await Training.find({ isActive: true })
            .select('title description category difficulty duration quiz')
            .lean();

        // Get user's progress for each training
        const userId = req.user._id;
        const progress = await TrainingProgress.find({ userId }).lean();
        const progressMap = {};
        progress.forEach(p => {
            progressMap[p.trainingId.toString()] = p;
        });

        const trainingsWithProgress = trainings.map(t => ({
            ...t,
            quizCount: t.quiz?.length || 0,
            progress: progressMap[t._id.toString()] || null
        }));

        return res.status(200).json({
            success: true,
            data: trainingsWithProgress
        });
    } catch (error) {
        console.error('Get trainings error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get single training module
export const getTraining = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ success: false, message: 'Training not found' });
        }

        const progress = await TrainingProgress.findOne({
            userId: req.user._id,
            trainingId: training._id
        });

        return res.status(200).json({
            success: true,
            data: { training, progress }
        });
    } catch (error) {
        console.error('Get training error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Submit quiz answers
export const submitQuiz = async (req, res) => {
    try {
        const { trainingId, answers } = req.body;
        const userId = req.user._id;

        const training = await Training.findById(trainingId);
        if (!training) {
            return res.status(404).json({ success: false, message: 'Training not found' });
        }

        // Calculate score
        let correctAnswers = 0;
        const totalQuestions = training.quiz.length;

        training.quiz.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // Update or create progress
        const progress = await TrainingProgress.findOneAndUpdate(
            { userId, trainingId },
            {
                $set: {
                    completed: score >= 70,
                    score,
                    totalQuestions,
                    correctAnswers,
                    completedAt: score >= 70 ? new Date() : undefined
                },
                $inc: { attempts: 1 }
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            success: true,
            data: {
                score,
                correctAnswers,
                totalQuestions,
                passed: score >= 70,
                progress
            }
        });
    } catch (error) {
        console.error('Submit quiz error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's training stats
export const getTrainingStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalModules = await Training.countDocuments({ isActive: true });
        const completedModules = await TrainingProgress.countDocuments({
            userId,
            completed: true
        });
        const allProgress = await TrainingProgress.find({ userId });

        const averageScore = allProgress.length > 0
            ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
            : 0;

        return res.status(200).json({
            success: true,
            data: {
                totalModules,
                completedModules,
                averageScore,
                completionRate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
            }
        });
    } catch (error) {
        console.error('Get training stats error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Seed sample training modules (admin only)
export const seedTrainings = async (req, res) => {
    try {
        const sampleTrainings = [
            {
                title: 'Identifying Phishing Emails',
                description: 'Learn to spot common phishing indicators and protect yourself from email-based attacks.',
                category: 'phishing',
                difficulty: 'beginner',
                duration: 15,
                content: `# Identifying Phishing Emails

## What is Phishing?
Phishing is a type of social engineering attack where attackers impersonate legitimate entities to steal sensitive information.

## Common Red Flags
- **Urgent language**: "Act now!" or "Your account will be suspended"
- **Suspicious sender**: Check the actual email address, not just the display name
- **Generic greetings**: "Dear Customer" instead of your name
- **Spelling/grammar errors**: Professional companies proofread their emails
- **Suspicious links**: Hover to see the actual URL before clicking

## What to Do
1. Don't click suspicious links
2. Report to IT security
3. Delete the email
4. Never share passwords via email`,
                quiz: [
                    {
                        question: 'What is a common sign of a phishing email?',
                        options: ['Professional formatting', 'Urgent call to action', 'Company logo present', 'Correct grammar'],
                        correctAnswer: 1
                    },
                    {
                        question: 'What should you do if you receive a suspicious email?',
                        options: ['Click the link to verify', 'Reply asking for more info', 'Report it to IT security', 'Forward to colleagues'],
                        correctAnswer: 2
                    },
                    {
                        question: 'Why do phishers use urgency in their messages?',
                        options: ['To be helpful', 'To pressure victims into acting without thinking', 'To meet deadlines', 'To improve response rates'],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: 'Password Security Best Practices',
                description: 'Master the art of creating and managing strong passwords.',
                category: 'password-security',
                difficulty: 'beginner',
                duration: 10,
                content: `# Password Security Best Practices

## Creating Strong Passwords
- Use at least 12 characters
- Mix uppercase, lowercase, numbers, and symbols
- Avoid personal information (birthdays, names)
- Use unique passwords for each account

## Password Managers
Consider using a password manager to:
- Generate strong passwords
- Store passwords securely
- Auto-fill login forms

## Multi-Factor Authentication (MFA)
Always enable MFA when available for an extra layer of security.`,
                quiz: [
                    {
                        question: 'What is the minimum recommended password length?',
                        options: ['6 characters', '8 characters', '12 characters', '4 characters'],
                        correctAnswer: 2
                    },
                    {
                        question: 'Should you use the same password for multiple accounts?',
                        options: ['Yes, for convenience', 'Only for important accounts', 'No, never', 'Yes, if it\'s strong'],
                        correctAnswer: 2
                    }
                ]
            },
            {
                title: 'Social Engineering Awareness',
                description: 'Understand manipulation tactics used by attackers and how to defend against them.',
                category: 'social-engineering',
                difficulty: 'intermediate',
                duration: 20,
                content: `# Social Engineering Awareness

## What is Social Engineering?
Social engineering is the psychological manipulation of people to perform actions or divulge confidential information.

## Common Techniques
- **Pretexting**: Creating a fabricated scenario
- **Baiting**: Offering something enticing
- **Tailgating**: Following authorized personnel into secure areas
- **Quid pro quo**: Offering a service in exchange for information

## Defense Strategies
1. Verify identities before sharing information
2. Be skeptical of unsolicited requests
3. Follow security procedures
4. Report suspicious behavior`,
                quiz: [
                    {
                        question: 'What is pretexting?',
                        options: ['Sending fake emails', 'Creating a fabricated scenario', 'Following someone into a building', 'Offering free gifts'],
                        correctAnswer: 1
                    },
                    {
                        question: 'What should you do when someone asks for sensitive information?',
                        options: ['Provide it immediately', 'Verify their identity first', 'Ignore them', 'Ask a colleague to do it'],
                        correctAnswer: 1
                    }
                ]
            }
        ];

        await Training.deleteMany({});
        await Training.insertMany(sampleTrainings);

        return res.status(200).json({
            success: true,
            message: `Created ${sampleTrainings.length} training modules`
        });
    } catch (error) {
        console.error('Seed trainings error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
