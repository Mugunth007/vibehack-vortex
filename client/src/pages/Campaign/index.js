import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Megaphone, Loader2, AlertCircle, CheckCircle, Clock, Play } from 'lucide-react';
import { useGetAllCampaigns } from '../../hooks/useCampaign';
import { formatCardDate } from '../../utils/dateUtils';
import GlassCard from '../../components/GlassCard';
import GradientButton from '../../components/GradientButton';

const Campaign = () => {
    const navigate = useNavigate();
    const { getAllCampaigns, campaigns, loading, error } = useGetAllCampaigns();

    useEffect(() => {
        getAllCampaigns();
    }, [getAllCampaigns]);

    const handleStartCampaign = () => {
        navigate('/console/campaign/create');
    };

    const handleViewCampaign = (id) => {
        navigate(`/console/campaign/${id}`);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircle,
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-500/20',
                    border: 'border-emerald-500/30'
                };
            case 'ongoing':
                return {
                    icon: Play,
                    color: 'text-cyan-400',
                    bg: 'bg-cyan-500/20',
                    border: 'border-cyan-500/30'
                };
            case 'scheduled':
                return {
                    icon: Clock,
                    color: 'text-amber-400',
                    bg: 'bg-amber-500/20',
                    border: 'border-amber-500/30'
                };
            default:
                return {
                    icon: Megaphone,
                    color: 'text-slate-400',
                    bg: 'bg-slate-500/20',
                    border: 'border-slate-500/30'
                };
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">
                            Campaigns
                        </h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl">
                        Launch and manage phishing campaigns. Track their status, view details, and make informed decisions.
                    </p>
                </div>
                <GradientButton
                    onClick={handleStartCampaign}
                    icon={Plus}
                    className="w-full md:w-auto px-6 h-12"
                >
                    Start Campaign
                </GradientButton>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                        <span>Loading campaigns...</span>
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
            {!loading && !error && campaigns.length === 0 && (
                <GlassCard className="p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                        <Megaphone className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                        You haven't created any campaigns yet. Create your first campaign to get started.
                    </p>
                    <GradientButton
                        onClick={handleStartCampaign}
                        icon={Plus}
                        className="mx-auto p-4"
                    >
                        Start Your First Campaign
                    </GradientButton>
                </GlassCard>
            )}

            {/* Campaign Cards Grid */}
            {!loading && !error && campaigns.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => {
                        const statusConfig = getStatusConfig(campaign.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <GlassCard
                                key={campaign._id}
                                className="p-6 cursor-pointer group hover:border-cyan-500/30 transition-all duration-300"
                                onClick={() => handleViewCampaign(campaign._id)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                                            {campaign.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Created {formatCardDate(campaign.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.border} border`}>
                                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                    <span className={`text-sm font-medium capitalize ${statusConfig.color}`}>
                                        {campaign.status}
                                    </span>
                                </div>

                                {/* Hover indicator */}
                                <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-slate-500">Click to view details</span>
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Megaphone className="w-3 h-3 text-cyan-400" />
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Campaign;
