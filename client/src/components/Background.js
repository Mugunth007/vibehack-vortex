import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
            {/* Animated Grid */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[length:50px_50px]" />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            {/* Floating Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[100px] animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px] animate-float delay-1000" />
            <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow" />
        </div>
    );
};

export default Background;
