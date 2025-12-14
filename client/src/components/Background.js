import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Very Subtle Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.5)_0%,rgba(2,6,23,1)_70%)]" />
        </div>
    );
};

export default Background;
