import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Lock, Zap, Globe, ChevronRight, Mail, MessageSquare,
    Smartphone, Search, BarChart3, Users, Check, Play, Menu, X,
    Twitter, Linkedin, Github, Terminal
} from 'lucide-react';
import { DodoPayments } from 'dodopayments-checkout';
import Background from '../components/Background';
import GradientButton from '../components/GradientButton';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [activeHeroText, setActiveHeroText] = useState(0);
    const heroTexts = ["Phish.", "Test.", "Train."];

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hero text rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHeroText((prev) => (prev + 1) % heroTexts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Initialize Dodo Payments
    useEffect(() => {
        DodoPayments.Initialize({
            mode: 'test', // Change to 'live' for production
            onEvent: (event) => {
                console.log('Checkout event:', event);
                switch (event.event_type) {
                    case 'checkout.opened':
                        console.log('Checkout opened');
                        break;
                    case 'checkout.closed':
                        console.log('Checkout closed');
                        break;
                    case 'checkout.error':
                        console.error('Checkout error:', event.data?.message);
                        break;
                    default:
                        break;
                }
            },
        });
    }, []);

    // Dodo Payments Product IDs - Replace with your actual product IDs from dashboard
    const DODO_PRODUCTS = {
        PRO_MONTHLY: 'pdt_nT196xwd6VFmbohCtfanr', // ₹100/month subscription
    };

    // Handle plan selection
    const handlePlanClick = async (planName) => {
        if (planName === 'Starter') {
            // Free plan - go directly to signup
            navigate('/console');
        } else if (planName === 'Pro') {
            // Pro plan - open Dodo Payments checkout overlay
            try {
                // Using static payment link format with redirect
                const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${DODO_PRODUCTS.PRO_MONTHLY}?redirect_url=${encodeURIComponent(window.location.origin + '/console')}`;
                await DodoPayments.Checkout.open({
                    checkoutUrl: checkoutUrl
                });
            } catch (error) {
                console.error('Failed to open checkout:', error);
                // Fallback: redirect directly to payment link
                window.open(`https://test.checkout.dodopayments.com/buy/${DODO_PRODUCTS.PRO_MONTHLY}`, '_blank');
            }
        } else if (planName === 'Enterprise') {
            // Enterprise - contact sales
            window.location.href = 'mailto:sales@decoy.security?subject=Enterprise%20Plan%20Inquiry';
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden text-slate-300 selection:bg-cyan-500/30 font-sans">
            <Background />

            {/* Navbar */}
            <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Terminal className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                            Decoy
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Platform</button>
                        <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How it Works</button>
                        <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/console')} className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Sign In
                        </button>
                        <GradientButton onClick={() => navigate('/console')} className="px-6 py-2 h-10 text-sm">
                            Get Started
                        </GradientButton>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 container mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm text-cyan-400 text-sm font-medium mb-8 animate-fade-in-up hover:border-cyan-500/30 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        AI-Powered Security Awareness
                    </div>

                    {/* Minimalist Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight animate-fade-in-up [animation-delay:200ms]">
                        Build. Ship. <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            {heroTexts[activeHeroText]}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed">
                        The first security awareness platform that thinks like a hacker.
                        Automate phishing simulations and training with generative AI.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms] w-full sm:w-auto">
                        <GradientButton onClick={() => navigate('/console')} className="w-full sm:w-auto px-8 h-14 text-lg">
                            Start Free Trial
                        </GradientButton>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-500 animate-fade-in-up [animation-delay:800ms]">
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-500" /> SOC 2 Compliant</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-500" /> GDPR Ready</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-500" /> ISO 27001</span>
                    </div>
                </div>
            </main>

            {/* Bento Grid Section */}
            <section id="how-it-works" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Defense ecosystem</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to secure your organization in one platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
                        {/* Large Card 1: Dashboard */}
                        <GlassCard className="md:col-span-4 min-h-[300px] p-6 flex flex-col justify-between group">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Campaign Command Center</h3>
                                <p className="text-slate-400 text-sm">Real-time analytics and campaign management.</p>
                            </div>
                            <div className="mt-6 rounded-lg bg-slate-900/50 border border-slate-800 p-4 h-full relative overflow-hidden">
                                {/* Mock Chart */}
                                <div className="flex items-end justify-between h-32 gap-2 mt-4">
                                    {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-cyan-500/20 to-cyan-500/80 rounded-t-sm animate-pulse-slow" />
                                    ))}
                                </div>
                            </div>
                        </GlassCard>

                        {/* Small Card 1: Stats */}
                        <GlassCard className="md:col-span-2 min-h-[300px] p-6 flex flex-col items-center justify-center text-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                                <Shield className="w-16 h-16 text-cyan-400 relative z-10" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">99.9%</h3>
                            <p className="text-slate-400">Threat Detection Rate</p>
                        </GlassCard>

                        {/* Small Card 2: AI Gen */}
                        <GlassCard className="md:col-span-2 min-h-[300px] p-6">
                            <div className="mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white">AI Generator</h3>
                                <p className="text-slate-400 text-xs mt-2">Instantly generate realistic phishing templates.</p>
                            </div>
                            <div className="bg-slate-900/80 rounded-lg p-4 text-xs font-mono text-emerald-400 border border-slate-800">
                                {">"} Generating spear-phishing tailored to finance dept...
                                <span className="animate-blink">|</span>
                            </div>
                        </GlassCard>

                        {/* Large Card 2: Multi-channel */}
                        <GlassCard className="md:col-span-4 min-h-[300px] p-6 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-8 items-center">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">Email Phishing</h4>
                                            <p className="text-slate-500 text-sm">Advanced spoofing</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">SMS Smishing</h4>
                                            <p className="text-slate-500 text-sm">Direct to mobile</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    {/* Abstract Radar */}
                                    <div className="w-48 h-48 border border-slate-700 rounded-full flex items-center justify-center mx-auto relative animate-spin-slow-reverse">
                                        <div className="w-32 h-32 border border-slate-700/50 rounded-full"></div>
                                        <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-cyan-500 to-transparent origin-bottom animate-spin-slow"></div>
                                        <div className="absolute top-10 right-10 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Features Section (Timeline) */}
            <section id="features" className="py-24 relative z-10 bg-slate-900/50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center">How it works</h2>
                    <div className="relative space-y-20 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">

                        {[
                            { title: "Identify Targets", desc: "Our OSINT engine scans the web for exposed employee emails and optimal attack vectors.", icon: Search },
                            { title: "Launch Simulation", desc: "Deploy AI-generated campaigns across email, SMS, and voice simultaneously.", icon: Zap },
                            { title: "Analyze & Train", desc: "Real-time reporting on who clicked. Auto-enroll vulnerable users in micro-training.", icon: BarChart3 }
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors group-hover:border-cyan-500 group-hover:bg-cyan-500/20">
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                </div>
                                <GlassCard className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8">
                                    <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </GlassCard>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Testimonials (Infinite Scroll) */}
            <section className="py-24 overflow-hidden mask-linear-fade">
                <div className="container mx-auto px-6 mb-12 text-center">
                    <p className="text-sm font-semibold tracking-wide text-cyan-500 uppercase">Trusted by security teams at</p>
                </div>
                <div className="flex gap-8 w-max animate-marquee">
                    {[1, 2, 3, 4, 1, 2, 3, 4].map((i) => (
                        <GlassCard key={`${i}-a`} className="w-80 shrink-0 p-6" hoverEffect={false}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800" />
                                <div>
                                    <div className="w-24 h-3 bg-slate-800 rounded mb-1" />
                                    <div className="w-16 h-2 bg-slate-800/50 rounded" />
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">"Decoy has completely transformed how we handle security training. The AI campaigns are indistinguishable from real attacks."</p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Transparent Pricing</h2>
                        <div className="inline-flex bg-slate-900 p-1 rounded-lg border border-slate-800 mt-4">
                            <button className="px-6 py-2 rounded-md bg-slate-800 text-white text-sm font-medium shadow-sm">Monthly</button>
                            <button className="px-6 py-2 rounded-md text-slate-400 text-sm font-medium hover:text-white">Annually <span className="text-cyan-500 text-xs ml-1">-20%</span></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { name: "Starter", price: "₹0", desc: "For small teams and testing.", features: ["Up to 50 users", "Email campaigns only", "Basic Analytics"], buttonText: "Get Started Free" },
                            { name: "Pro", price: "₹100", desc: "For growing organizations.", features: ["Up to 500 users", "Email & SMS campaigns", "Advanced Reporting", "Priority Support"], popular: true, buttonText: "Subscribe Now" },
                            { name: "Enterprise", price: "Custom", desc: "For large scale security.", features: ["Unlimited users", "All attack vectors", "Dedicated Success Manager", "API Access"], buttonText: "Contact Sales" }
                        ].map((plan, i) => (
                            <GlassCard key={i} className={`p-8 flex flex-col ${plan.popular ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : ''}`} hoverEffect={true}>
                                {plan.popular && <div className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">RECOMMENDED</div>}
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold text-white mb-2">{plan.price} <span className="text-lg text-slate-500 font-normal">/mo</span></div>
                                <p className="text-slate-400 mb-8">{plan.desc}</p>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-cyan-500 shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <GradientButton
                                    variant={plan.popular ? 'primary' : 'ghost'}
                                    className="w-full h-12 py-3 text-base mt-auto"
                                    onClick={() => handlePlanClick(plan.name)}
                                >
                                    {plan.buttonText}
                                </GradientButton>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <Terminal className="text-white w-4 h-4" />
                                </div>
                                <span className="text-xl font-bold text-white">Decoy</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6">
                                Empowering organizations to build human firewalls through AI-driven simulation and training.
                            </p>
                            <div className="flex gap-4">
                                {[Twitter, Github, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors"><Icon className="w-5 h-5" /></a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Changelog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                            </ul>
                        </div>

                        <div className="col-span-1">
                            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Enter your email" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 w-full" />
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-4 py-2 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-900 pt-8 text-center text-slate-600 text-sm">
                        <p>&copy; {new Date().getFullYear()} Decoy Security Inc. Built with ❤️ for security teams.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
