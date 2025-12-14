import React from 'react';

const GlassCard = ({ children, className, hoverEffect = true, ...props }) => {
    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl border border-slate-800/60
                bg-slate-950/40 backdrop-blur-xl
                ${hoverEffect ? 'hover:border-slate-700/80 hover:bg-slate-900/50 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300' : ''}
                ${className || ''}
            `}
            {...props}
        >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
