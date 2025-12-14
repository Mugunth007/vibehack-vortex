// Training Page - Security Awareness Training Modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    BookOpen,
    Clock,
    Trophy,
    CheckCircle2,
    Play,
    BarChart3,
    Shield,
    Lock,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';
import { axiosInstance } from '../../services/axiosInstance';

const Training = () => {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [trainingsRes, statsRes] = await Promise.all([
                axiosInstance.get('/api/training'),
                axiosInstance.get('/api/training/stats')
            ]);

            if (trainingsRes.data.success) {
                setTrainings(trainingsRes.data.data);
            }
            if (statsRes.data.success) {
                setStats(statsRes.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch training data:', error);
        }
        setLoading(false);
    };

    const seedTrainings = async () => {
        try {
            await axiosInstance.post('/api/training/seed');
            fetchData();
        } catch (error) {
            console.error('Failed to seed trainings:', error);
        }
    };

    const startTraining = async (training) => {
        try {
            const response = await axiosInstance.get(`/api/training/${training._id}`);
            if (response.data.success) {
                setSelectedTraining(response.data.data.training);
                setQuizAnswers({});
                setQuizResult(null);
            }
        } catch (error) {
            console.error('Failed to load training:', error);
        }
    };

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setQuizAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const submitQuiz = async () => {
        if (Object.keys(quizAnswers).length !== selectedTraining.quiz.length) {
            alert('Please answer all questions');
            return;
        }

        setSubmitting(true);
        try {
            const response = await axiosInstance.post('/api/training/submit-quiz', {
                trainingId: selectedTraining._id,
                answers: quizAnswers
            });

            if (response.data.success) {
                setQuizResult(response.data.data);
                fetchData(); // Refresh stats
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
        }
        setSubmitting(false);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'phishing': return <AlertTriangle className="w-5 h-5" />;
            case 'password-security': return <Lock className="w-5 h-5" />;
            case 'social-engineering': return <Shield className="w-5 h-5" />;
            default: return <BookOpen className="w-5 h-5" />;
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-400 bg-green-400/10 border-green-400/30';
            case 'intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
        }
    };

    if (selectedTraining) {
        return (
            <div style={{ fontFamily: '"Inter", sans-serif' }} className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => { setSelectedTraining(null); setQuizResult(null); }}
                    className="mb-6 text-slate-400 hover:text-white flex items-center gap-2"
                >
                    ← Back to Modules
                </button>

                {/* Training Content */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">{selectedTraining.title}</h1>
                    <p className="text-slate-400 mb-6">{selectedTraining.description}</p>

                    <div
                        className="prose prose-invert prose-sm max-w-none text-slate-300"
                        dangerouslySetInnerHTML={{
                            __html: selectedTraining.content
                                .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-white mt-6 mb-3">$1</h1>')
                                .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-cyan-400 mt-5 mb-2">$1</h2>')
                                .replace(/^- \*\*(.*?)\*\*: (.*$)/gm, '<li class="mb-2"><strong class="text-white">$1:</strong> $2</li>')
                                .replace(/^- (.*$)/gm, '<li class="mb-1">$1</li>')
                                .replace(/^\d+\. (.*$)/gm, '<li class="mb-1">$1</li>')
                                .replace(/\n\n/g, '<br/><br/>')
                        }}
                    />
                </div>

                {/* Quiz Section */}
                {!quizResult ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-cyan-400" />
                            Knowledge Check
                        </h2>

                        <div className="space-y-6">
                            {selectedTraining.quiz.map((q, qIndex) => (
                                <div key={qIndex} className="bg-slate-900/50 rounded-xl p-5">
                                    <p className="text-white font-medium mb-4">
                                        {qIndex + 1}. {q.question}
                                    </p>
                                    <div className="space-y-2">
                                        {q.options.map((option, oIndex) => (
                                            <button
                                                key={oIndex}
                                                onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all
                                                    ${quizAnswers[qIndex] === oIndex
                                                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                                                        : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={submitQuiz}
                            disabled={Object.keys(quizAnswers).length !== selectedTraining.quiz.length || submitting}
                            className="mt-6 w-full py-4 rounded-xl font-semibold text-white
                                bg-gradient-to-r from-purple-600 to-cyan-600
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all flex items-center justify-center gap-2"
                        >
                            {submitting ? 'Submitting...' : 'Submit Answers'}
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
                        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center
                            ${quizResult.passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {quizResult.passed
                                ? <Trophy className="w-12 h-12 text-green-400" />
                                : <AlertTriangle className="w-12 h-12 text-red-400" />
                            }
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            {quizResult.passed ? 'Congratulations!' : 'Keep Learning!'}
                        </h2>
                        <p className="text-slate-400 mb-4">
                            You scored {quizResult.score}% ({quizResult.correctAnswers}/{quizResult.totalQuestions} correct)
                        </p>
                        <p className="text-sm text-slate-500 mb-6">
                            {quizResult.passed
                                ? 'You passed! This module has been marked as complete.'
                                : 'You need 70% to pass. Review the material and try again.'}
                        </p>

                        <button
                            onClick={() => { setSelectedTraining(null); setQuizResult(null); }}
                            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white"
                        >
                            Back to Modules
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 
                        flex items-center justify-center shadow-lg shadow-green-500/30">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Security Training</h1>
                        <p className="text-slate-400 text-sm">Complete training modules to improve security awareness</p>
                    </div>
                </div>

                {trainings.length === 0 && !loading && (
                    <button
                        onClick={seedTrainings}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Load Sample Modules
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <p className="text-slate-400 text-sm">Total Modules</p>
                        <p className="text-2xl font-bold text-white">{stats.totalModules}</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <p className="text-slate-400 text-sm">Completed</p>
                        <p className="text-2xl font-bold text-green-400">{stats.completedModules}</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <p className="text-slate-400 text-sm">Avg. Score</p>
                        <p className="text-2xl font-bold text-cyan-400">{stats.averageScore}%</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <p className="text-slate-400 text-sm">Completion</p>
                        <p className="text-2xl font-bold text-purple-400">{stats.completionRate}%</p>
                    </div>
                </div>
            )}

            {/* Training Modules */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">Loading training modules...</p>
                </div>
            ) : trainings.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-2xl">
                    <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-400 mb-2">No Training Modules</h3>
                    <p className="text-slate-500 text-sm">Click "Load Sample Modules" to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainings.map((training) => (
                        <div
                            key={training._id}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                    ${training.progress?.completed ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                    {training.progress?.completed
                                        ? <CheckCircle2 className="w-5 h-5" />
                                        : getCategoryIcon(training.category)
                                    }
                                </div>
                                <span className={`px-2 py-1 text-xs rounded border ${getDifficultyColor(training.difficulty)}`}>
                                    {training.difficulty}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2">{training.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{training.description}</p>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {training.duration} min
                                </span>
                                <span className="flex items-center gap-1">
                                    <BarChart3 className="w-4 h-4" />
                                    {training.quizCount} questions
                                </span>
                            </div>

                            {training.progress?.completed ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-green-400 text-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Completed ({training.progress.score}%)
                                    </span>
                                    <button
                                        onClick={() => startTraining(training)}
                                        className="text-cyan-400 text-sm hover:underline"
                                    >
                                        Review
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => startTraining(training)}
                                    className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 
                                        hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white text-sm
                                        flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    Start Training
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Training;
