import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Send } from 'lucide-react';
import { useSenderProfiles } from '../../hooks/useSenderProfiles';
import ResponsiveSenderProfilesTable from '../../components/ResponsiveSenderProfilesTable';
import GradientButton from '../../components/GradientButton';

const SenderProfile = () => {
    const navigate = useNavigate();
    const { senderProfiles, loading, handleDelete } = useSenderProfiles();

    const handleCreateSenderProfile = () => {
        navigate('/console/sender-profile/create');
    };

    const handleDeleteProfile = (profileId) => {
        handleDelete(profileId);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Send className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">
                            Sender Profiles
                        </h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl">
                        Configure and manage SMTP sender profiles for your email campaigns.
                    </p>
                </div>
                <GradientButton
                    onClick={handleCreateSenderProfile}
                    icon={Plus}
                    className="w-full md:w-auto px-6 h-12"
                >
                    Setup SMTP
                </GradientButton>
            </div>

            {/* Sender Profiles Table */}
            <div className="w-full">
                <ResponsiveSenderProfilesTable
                    senderProfiles={senderProfiles}
                    loading={loading}
                    onDeleteProfile={handleDeleteProfile}
                />
            </div>
        </div>
    );
};

export default SenderProfile;