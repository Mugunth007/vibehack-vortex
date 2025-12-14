import React from 'react';
import { Loader2 } from 'lucide-react';

const GradientButton = ({
    children,
    isLoading,
    icon: Icon,
    className,
    variant = 'primary', // primary, ghost
    ...props
}) => {
    const baseStyles = "relative group flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110",
        ghost: "bg-slate-900/50 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-600 backdrop-blur-sm"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className || ''}`}
            disabled={isLoading}
            {...props}
        >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {!isLoading && Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
};

export default GradientButton;
