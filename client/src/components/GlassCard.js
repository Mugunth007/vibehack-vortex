import React from 'react';
import { cn } from '../utils/cn'; // Note: Need to create cn utility or just use template literals if preferred, but cn is standard. I'll stick to template literals for now to minimize files, or create utils/cn.js quickly.

// I'll assume I can create the utils/cn.js helper as it's best practice with tailwind-merge
const GlassCard = ({ children, className, hoverEffect = true, ...props }) => {
    return (
        <div
            className={`glass-card p-6 rounded-xl ${hoverEffect ? 'glass-card-hover' : ''} ${className || ''}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;
