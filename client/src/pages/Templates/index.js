import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Upload, Sparkles } from 'lucide-react';
import ImportTemplateDialog from './ImportTemplateDialog';
import SavedTemplates from './SavedTemplates';
import AIBuilder from './AIBuilder';
import { useTemplates } from '../../hooks/useTemplates';
import GlassCard from '../../components/GlassCard';
import GradientButton from '../../components/GradientButton';

const Templates = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialView = queryParams.get('view') || 'saved';
    const [activeTab, setActiveTab] = useState(initialView);

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);

    // Import the useTemplates hook
    const { templates, loading, error, fetchTemplates, createTemplate } = useTemplates();

    useEffect(() => {
        fetchTemplates();
    }, []);

    useEffect(() => {
        const currentView = queryParams.get('view') || 'saved';
        if (currentView !== activeTab) {
            setActiveTab(currentView);
        }
    }, [location.search]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`?view=${tab}`);
    };

    const importTemplate = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleImport = async (templateName, emailSubject, htmlFile) => {
        console.log('Importing HTML template...');
        const formData = new FormData();
        formData.append('name', templateName);
        formData.append('subject', emailSubject);
        formData.append('type', 'custom');
        formData.append('file', htmlFile);

        const response = await createTemplate(formData);
        if (response.success) {
            console.log('Template imported successfully');
        } else {
            console.error('Error importing template:', response.message);
        }

        handleDialogClose();
    };

    const tabs = [
        { id: 'saved', label: 'Saved Templates', icon: Mail },
        { id: 'builder', label: 'AI Builder', icon: Sparkles },
    ];

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header - Only show for saved templates */}
            {activeTab === 'saved' && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">
                                Email Templates
                            </h1>
                        </div>
                        <p className="text-slate-400 max-w-2xl">
                            Import and manage HTML email templates. Upload your existing templates or create new ones using the AI Email builder.
                        </p>
                    </div>
                    <GradientButton
                        onClick={importTemplate}
                        icon={Upload}
                        className="w-full md:w-auto px-6 h-12"
                    >
                        Import HTML Template
                    </GradientButton>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'saved' && (
                    <SavedTemplates templates={templates} loading={loading} error={error} />
                )}
                {activeTab === 'builder' && (
                    <AIBuilder />
                )}
            </div>

            {/* Dialog for Importing Template */}
            <ImportTemplateDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onImport={handleImport}
            />
        </div>
    );
};

export default Templates;
