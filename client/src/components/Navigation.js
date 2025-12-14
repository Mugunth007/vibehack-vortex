import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Send,
    Mail,
    Megaphone,
    LogOut,
    Menu,
    X,
    UserCircle,
    GraduationCap,
    BarChart3
} from 'lucide-react';
import { clearToken } from '../utils/tokenManager';
import GlassCard from './GlassCard';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(true); // Default open on desktop
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate('/');
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/console/dashboard' },
        { label: 'Audience', icon: Users, path: '/console/audience' },
        { label: 'Sender Profiles', icon: Send, path: '/console/sender-profile' },
        { label: 'Templates', icon: Mail, path: '/console/templates' },
        { label: 'Campaigns', icon: Megaphone, path: '/console/campaign' },
        { label: 'Training', icon: GraduationCap, path: '/console/training' },
        { label: 'Reports', icon: BarChart3, path: '/console/reports' },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900/50 text-white md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/50`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Decoy
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Security Awareness Platform</p>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                `}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-slate-800/50">
                        <GlassCard className="p-3 !bg-slate-900/40">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                    <UserCircle />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Admin User</p>
                                    <p className="text-xs text-slate-500">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                                <LogOut size={14} />
                                Sign Out
                            </button>
                        </GlassCard>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navigation;
