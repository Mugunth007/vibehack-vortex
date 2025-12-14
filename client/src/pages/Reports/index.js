// Reports Page - Security Analytics & Compliance
import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    PieChart,
    Download,
    Shield,
    AlertTriangle,
    TrendingUp,
    Users,
    Mail,
    Target,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { axiosInstance } from '../../services/axiosInstance';

const Reports = () => {
    const [metrics, setMetrics] = useState(null);
    const [trends, setTrends] = useState([]);
    const [riskBreakdown, setRiskBreakdown] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [metricsRes, trendsRes, riskRes] = await Promise.all([
                axiosInstance.get('/api/reports/metrics'),
                axiosInstance.get('/api/reports/trends'),
                axiosInstance.get('/api/reports/risk-breakdown')
            ]);

            if (metricsRes.data.success) setMetrics(metricsRes.data.data);
            if (trendsRes.data.success) setTrends(trendsRes.data.data);
            if (riskRes.data.success) setRiskBreakdown(riskRes.data.data);
        } catch (error) {
            console.error('Failed to fetch report data:', error);
        }
        setLoading(false);
    };

    const exportReport = async () => {
        try {
            const response = await axiosInstance.get('/api/reports/export', {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `security-report-${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Failed to export report:', error);
        }
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'Low': return 'text-green-400 bg-green-400/10';
            case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
            case 'High': return 'text-orange-400 bg-orange-400/10';
            case 'Critical': return 'text-red-400 bg-red-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-slate-400">Loading reports...</p>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 
                        flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Security Reports</h1>
                        <p className="text-slate-400 text-sm">Analytics, risk assessment, and compliance reporting</p>
                    </div>
                </div>

                <button
                    onClick={exportReport}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Risk Score Card */}
            {metrics?.risk && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Organization Risk Score</h2>
                            <p className="text-slate-400 text-sm">
                                Based on phishing susceptibility and training completion
                            </p>
                        </div>
                        <div className="text-right">
                            <div className={`text-4xl font-bold mb-1 ${getRiskColor(metrics.risk.level).split(' ')[0]}`}>
                                {metrics.risk.score}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(metrics.risk.level)}`}>
                                {metrics.risk.level} Risk
                            </span>
                        </div>
                    </div>

                    {/* Risk Bar */}
                    <div className="mt-6">
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${metrics.risk.score < 25 ? 'bg-green-500' :
                                        metrics.risk.score < 50 ? 'bg-yellow-500' :
                                            metrics.risk.score < 75 ? 'bg-orange-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${metrics.risk.score}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Low</span>
                            <span>Medium</span>
                            <span>High</span>
                            <span>Critical</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Campaign Metrics */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-cyan-400" />
                        Campaign Analytics
                    </h3>

                    {metrics?.campaigns ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm">Total Campaigns</p>
                                    <p className="text-2xl font-bold text-white">{metrics.campaigns.total}</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm">Emails Sent</p>
                                    <p className="text-2xl font-bold text-white">{metrics.campaigns.totalSent}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">Open Rate</span>
                                        <span className="text-cyan-400">{metrics.campaigns.openRate}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500" style={{ width: `${metrics.campaigns.openRate}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">Click Rate</span>
                                        <span className="text-yellow-400">{metrics.campaigns.clickRate}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500" style={{ width: `${metrics.campaigns.clickRate}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">Submission Rate</span>
                                        <span className="text-red-400">{metrics.campaigns.submissionRate}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${metrics.campaigns.submissionRate}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500">No campaign data available</p>
                    )}
                </div>

                {/* Training Metrics */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        Training Progress
                    </h3>

                    {metrics?.training ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm">Modules Completed</p>
                                    <p className="text-2xl font-bold text-green-400">
                                        {metrics.training.completed}/{metrics.training.total}
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm">Average Score</p>
                                    <p className="text-2xl font-bold text-purple-400">{metrics.training.averageScore}%</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Completion Rate</span>
                                    <span className="text-green-400">{metrics.training.completionRate}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                        style={{ width: `${metrics.training.completionRate}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500">No training data available</p>
                    )}
                </div>
            </div>

            {/* Campaign Trends */}
            {trends.length > 0 && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        Recent Campaigns
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                                    <th className="pb-3 font-medium">Campaign</th>
                                    <th className="pb-3 font-medium">Audience</th>
                                    <th className="pb-3 font-medium">Sent</th>
                                    <th className="pb-3 font-medium">Opened</th>
                                    <th className="pb-3 font-medium">Clicked</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trends.slice(0, 5).map((campaign) => (
                                    <tr key={campaign.id} className="border-b border-slate-700/50">
                                        <td className="py-3 text-white">{campaign.name}</td>
                                        <td className="py-3 text-slate-400">{campaign.audience}</td>
                                        <td className="py-3 text-slate-300">{campaign.metrics.sent}</td>
                                        <td className="py-3 text-cyan-400">{campaign.metrics.opened}</td>
                                        <td className="py-3 text-yellow-400">{campaign.metrics.clicked}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium
                                                ${campaign.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                                                    campaign.status === 'running' ? 'bg-blue-400/10 text-blue-400' :
                                                        'bg-slate-400/10 text-slate-400'}`}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Risk Distribution */}
            {riskBreakdown && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Employee Risk Distribution
                    </h3>

                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">{riskBreakdown.totalEmployees}</p>
                            <p className="text-slate-400 text-sm">Total Employees</p>
                        </div>

                        <div className="flex-1 grid grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                <p className="text-2xl font-bold text-green-400">{riskBreakdown.riskDistribution.low}</p>
                                <p className="text-green-400/70 text-sm">Low Risk</p>
                            </div>
                            <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <p className="text-2xl font-bold text-yellow-400">{riskBreakdown.riskDistribution.medium}</p>
                                <p className="text-yellow-400/70 text-sm">Medium</p>
                            </div>
                            <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <p className="text-2xl font-bold text-orange-400">{riskBreakdown.riskDistribution.high}</p>
                                <p className="text-orange-400/70 text-sm">High</p>
                            </div>
                            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                <p className="text-2xl font-bold text-red-400">{riskBreakdown.riskDistribution.critical}</p>
                                <p className="text-red-400/70 text-sm">Critical</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
