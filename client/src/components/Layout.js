import React from 'react';
import Navigation from './Navigation';
import Background from './Background';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen text-slate-300 font-sans">
            <Background />
            <Navigation />

            {/* Main Content Area */}
            <main className="md:ml-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-6 md:p-8 pt-20 md:pt-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
