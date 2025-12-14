import React from 'react';
import GlassCard from './GlassCard';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const StatCard = ({ label, value, change, icon: Icon, trend = 'up', data = [] }) => {
    const isPositive = trend === 'up';

    // Mock data if none provided
    const chartData = data.length > 0 ? data : [
        { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }
    ];

    return (
        <GlassCard className="relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-800/50 rounded-lg text-slate-300 group-hover:text-white transition-colors">
                    {Icon && <Icon size={20} />}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {change}
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
            </div>

            <div className="mb-1">
                <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>

            {/* Mini Sparkline Background */}
            <div className="absolute bottom-0 right-0 w-1/2 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke={isPositive ? '#10b981' : '#f43f5e'}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
};

export default StatCard;
