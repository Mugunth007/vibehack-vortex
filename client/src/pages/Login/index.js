import React from 'react';
import { useLogin } from '../../hooks/useLogin';
import Background from '../../components/Background';
import GlassCard from '../../components/GlassCard';
import GradientButton from '../../components/GradientButton';
import { Shield, User, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { handleSubmit, loading, error } = useLogin();
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-slate-300">
            <Background />

            <div className="relative z-10 w-full max-w-md px-6">
                <GlassCard className="p-8 md:p-10 !bg-slate-900/40 border-slate-700/50">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6 group">
                            <Shield className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 tracking-tight">
                            Vortex
                        </h1>
                        <p className="text-slate-400">
                            Enter your credentials to access the console
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2 animate-fade-in-up">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                    <User size={18} />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoFocus
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 text-white placeholder-slate-600 transition-all duration-200 outline-none"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 text-white placeholder-slate-600 transition-all duration-200 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <GradientButton
                                type="submit"
                                isLoading={loading}
                                className="w-full h-12 text-base shadow-xl shadow-cyan-500/10"
                            >
                                Sign In
                            </GradientButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft size={14} /> Back to Home
                        </button>
                    </div>
                </GlassCard>

                <p className="border-t border-slate-800/50 mt-8 pt-6 text-center text-xs text-slate-600">
                    &copy; {new Date().getFullYear()} CloudSec Network. Secure Access Restricted.
                </p>
            </div>
        </div>
    );
}
