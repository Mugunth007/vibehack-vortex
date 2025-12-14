import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Zap, Globe, ChevronRight } from 'lucide-react';
import Background from '../components/Background';
import GradientButton from '../components/GradientButton';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden text-slate-300 selection:bg-cyan-500/30">
            <Background />

            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Shield className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-slow">
                            Vortex
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#features" className="hover:text-cyan-400 transition-colors">Platform</a>
                        <a href="#solutions" className="hover:text-cyan-400 transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
                    </div>
                    <button
                        onClick={() => navigate('/console')}
                        className="px-5 py-2 rounded-full text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:scale-105"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 container mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Next Gen Social Engineering Platform
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up [animation-delay:200ms]">
                    Master the Art of <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-shimmer">
                        Human Vulnerabilty
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:400ms]">
                    Simulate sophisticated multi-channel attacks. Test your organization's resilience against phishing, vishing, and smishing with AI-powered campaigns.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
                    <GradientButton
                        onClick={() => navigate('/console')}
                        className="w-full sm:w-auto h-12 px-8 text-lg"
                    >
                        Launch Console <ChevronRight className="ml-2 w-5 h-5" />
                    </GradientButton>
                    <button className="w-full sm:w-auto px-8 h-12 rounded-lg font-semibold text-white hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                        View Documentation
                    </button>
                </div>

                {/* Cyber Grid Visual */}
                <div className="mt-20 relative max-w-5xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
                    <GlassCard className="p-1 overflow-hidden !rounded-2xl border-slate-800">
                        {/* Mock UI Interface */}
                        <div className="rounded-xl bg-slate-900/80 aspect-video flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 w-full max-w-4xl relative z-10">
                                {[
                                    { title: 'Email Phishing', val: '98% Success', color: 'text-emerald-400' },
                                    { title: 'SMS Smishing', val: 'Active', color: 'text-blue-400' },
                                    { title: 'Voice Vishing', val: 'Queued', color: 'text-purple-400' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm transform transition-transform group-hover:scale-105 duration-500">
                                        <div className="h-2 w-12 bg-slate-700 rounded mb-4"></div>
                                        <h3 className="text-white font-semibold">{item.title}</h3>
                                        <p className={`text-sm ${item.color} mt-1`}>{item.val}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Decorative glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                        </div>
                    </GlassCard>
                </div>
            </main>

            {/* Features Grid */}
            <section className="py-20 bg-slate-950 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: 'Multi-Vector Attacks', desc: 'Simulate attacks across Email, SMS, and Voice calls simultaneously.' },
                            { icon: Zap, title: 'AI Automation', desc: 'Generate convincing templates and landing pages instantly with GPT-4.' },
                            { icon: Globe, title: 'OSINT Recon', desc: 'Automatically gather employee footprint data for hyper-targeted campaigns.' }
                        ].map((feat, i) => (
                            <GlassCard key={i} className="p-8 hover:bg-slate-900/80 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feat.icon className="text-cyan-400 w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feat.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
