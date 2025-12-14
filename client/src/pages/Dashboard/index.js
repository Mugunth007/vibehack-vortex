import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import { dashboardCard } from '../../data/dashboardCard';
import StatCard from '../../components/StatCard';
import GlassCard from '../../components/GlassCard';
import {
  Megaphone,
  Users,
  Mail,
  Send,
  Activity,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboardData, loading } = useDashboard();

  // Map dashboard data to stat cards
  const stats = [
    {
      label: 'Active Campaigns',
      value: dashboardData.totalCampaigns,
      change: '+12%',
      icon: Megaphone,
      trend: 'up'
    },
    {
      label: 'Total Contacts',
      value: dashboardData.totalContacts,
      change: '+5%',
      icon: Users,
      trend: 'up'
    },
    {
      label: 'Email Templates',
      value: dashboardData.totalTemplates,
      change: '0%',
      icon: Mail,
      trend: 'neutral'
    },
    {
      label: 'Sender Profiles',
      value: dashboardData.totalSenderProfiles,
      change: '+2%',
      icon: Send,
      trend: 'up'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Simulation Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Manage your phishing simulations, track employee risk scores, and orchestrate multi-channel testing campaigns.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
          />
        ))}
      </div>

      {/* Main Content Split: Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" size={20} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardCard.map((card) => (
              <GlassCard
                key={card.id}
                className="cursor-pointer group relative overflow-hidden"
                onClick={() => navigate(card.route)}
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-cyan-400" size={20} />
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {/* Render original SVG icon wrapped */}
                    <div className="w-8 h-8 fill-current [&>svg]:w-full [&>svg]:h-full">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Activity Feed / System Status - Placeholder for now */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">System Status</h2>
          <GlassCard className="h-full min-h-[300px]">
            <div className="space-y-6">
              {[
                { label: 'Email Service', status: 'Operational', color: 'bg-emerald-500' },
                { label: 'SMS Gateway', status: 'Standby', color: 'bg-yellow-500' },
                { label: 'Voice Engine', status: 'Inactive', color: 'bg-slate-600' },
                { label: 'OSINT Scraper', status: 'Idle', color: 'bg-slate-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-slate-300">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                    <span className="text-xs text-slate-400">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <h3 className="text-sm font-medium text-white mb-4">Recent Events</h3>
              <div className="space-y-4">
                <div className="flex gap-3 text-sm">
                  <div className="w-1 h-full bg-cyan-500 rounded-full" />
                  <div>
                    <p className="text-slate-300">System initialization complete</p>
                    <p className="text-xs text-slate-500">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
