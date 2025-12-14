import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, AlertCircle, Loader2 } from 'lucide-react';
import { useAudience } from '../../hooks/useAudience';
import { formatCardDate } from '../../utils/dateUtils';
import GlassCard from '../../components/GlassCard';
import GradientButton from '../../components/GradientButton';

const Audience = () => {
    const navigate = useNavigate();
    const { audiences, loading, error } = useAudience();

    const handleCreateAudience = () => {
        navigate('/console/audience/create');
    };

    const handleViewAudience = (id) => {
        navigate(`/console/audience/${id}`);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Audience
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Manage your contacts and target audience for phishing campaigns.
                    </p>
                </div>
                <GradientButton
                    onClick={handleCreateAudience}
                    icon={Plus}
                    className="w-full md:w-auto px-6 h-12"
                >
                    Create Audience
                </GradientButton>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                        <span>Loading audiences...</span>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <GlassCard className="p-6 border-rose-500/30 !bg-rose-500/10">
                    <div className="flex items-center gap-3 text-rose-400">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                </GlassCard>
            )}

            {/* Empty State */}
            {!loading && !error && audiences.length === 0 && (
                <GlassCard className="p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                        <Users className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No audiences found</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                        You haven't created any audiences yet. Create your first audience to get started.
                    </p>
                    <GradientButton
                        onClick={handleCreateAudience}
                        icon={Plus}
                        className="mx-auto p-4"
                    >
                        Create Your First Audience
                    </GradientButton>
                </GlassCard>
            )}

            {/* Audience Cards Grid */}
            {!loading && !error && audiences.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {audiences.map((audience) => (
                        <GlassCard
                            key={audience._id}
                            className="p-6 cursor-pointer group hover:border-cyan-500/30 transition-all duration-300"
                            onClick={() => handleViewAudience(audience._id)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                                        {audience.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Created {formatCardDate(audience.createdAt)}
                                    </p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-3xl font-bold text-cyan-400">
                                        {audience.contactCount}
                                    </p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                                        Contacts
                                    </p>
                                </div>
                            </div>

                            {/* Hover indicator */}
                            <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-slate-500">Click to view details</span>
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <Users className="w-3 h-3 text-cyan-400" />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Audience;
