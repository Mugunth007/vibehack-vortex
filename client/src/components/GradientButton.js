import React from 'react';
import { Loader2 } from 'lucide-react';

const GradientButton = ({
    children,
    isLoading,
    icon: Icon,
    className,
    ...props
}) => {
    return (
        <button
            className={`btn-gradient flex items-center justify-center gap-2 ${className || ''}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {!isLoading && Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
};

export default GradientButton;
