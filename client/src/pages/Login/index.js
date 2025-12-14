import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Terminal, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { handleSubmit, loading, error } = useLogin();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 flex font-['Inter']">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20" />
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                            <Terminal className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-white">Decoy</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Security Awareness<br />Training Platform
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md">
                        Protect your organization with AI-powered phishing simulations and employee training.
                    </p>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                            <Terminal className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Decoy</span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Sign in</h1>
                        <p className="text-slate-500">Enter your credentials to continue</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Username</label>
                            <input
                                name="username"
                                type="text"
                                required
                                autoFocus
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 pr-12 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back Link */}
                    <button
                        onClick={() => navigate('/')}
                        className="mt-8 text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                        ← Back to home
                    </button>

                    {/* Footer */}
                    <p className="mt-12 text-xs text-slate-600">
                        © {new Date().getFullYear()} Decoy Security
                    </p>
                </div>
            </div>
        </div>
    );
}
