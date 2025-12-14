// AIBuilder.js - AI-Powered Email Generator
import React, { useState } from 'react';
import {
    Sparkles,
    Copy,
    Save,
    AlertTriangle,
    Loader2,
    CheckCircle2,
    Mail,
    Zap
} from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import { useTemplates } from '../../hooks/useTemplates';

const AIBuilder = () => {
    const [formData, setFormData] = useState({
        targetAudience: 'general-employees',
        objective: 'initial-awareness',
        threatType: 'credential-harvesting',
        industry: 'general',
        tone: 'formal-corporate',
        trigger: 'none',
        callToAction: 'click-link',
        customContext: ''
    });

    const { loading, error, generatedEmail, generateEmail, clearEmail } = useAI();
    const { createTemplate } = useTemplates();
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const options = {
        targetAudience: [
            { value: 'it-staff', label: 'IT Staff' },
            { value: 'executives', label: 'Executives' },
            { value: 'finance', label: 'Finance Team' },
            { value: 'hr', label: 'HR Department' },
            { value: 'sales', label: 'Sales Team' },
            { value: 'general-employees', label: 'General Employees' },
            { value: 'contractors', label: 'Contractors' },
            { value: 'new-hires', label: 'New Hires' }
        ],
        objective: [
            { value: 'initial-awareness', label: 'Initial Awareness' },
            { value: 'advanced-training', label: 'Advanced Training' },
            { value: 'compliance-training', label: 'Compliance Training' },
            { value: 'incident-response', label: 'Incident Response' },
            { value: 'social-engineering', label: 'Social Engineering' },
            { value: 'data-protection', label: 'Data Protection' }
        ],
        threatType: [
            { value: 'credential-harvesting', label: 'Credential Harvesting' },
            { value: 'malware-distribution', label: 'Malware Distribution' },
            { value: 'business-email-compromise', label: 'Business Email Compromise' },
            { value: 'social-engineering', label: 'Social Engineering' },
            { value: 'data-exfiltration', label: 'Data Exfiltration' },
            { value: 'ransomware-precursor', label: 'Ransomware Precursor' }
        ],
        industry: [
            { value: 'general', label: 'General Business' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'financial-services', label: 'Financial Services' },
            { value: 'technology', label: 'Technology' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'government', label: 'Government' },
            { value: 'education', label: 'Education' },
            { value: 'retail', label: 'Retail' }
        ],
        tone: [
            { value: 'formal-corporate', label: 'Formal Corporate' },
            { value: 'urgent-time-sensitive', label: 'Urgent / Time-Sensitive' },
            { value: 'friendly-collegial', label: 'Friendly / Collegial' },
            { value: 'authoritative', label: 'Authoritative' },
            { value: 'technical', label: 'Technical' }
        ],
        trigger: [
            { value: 'none', label: 'No Specific Trigger' },
            { value: 'tax-season', label: 'Tax Season' },
            { value: 'holidays', label: 'Holiday Season' },
            { value: 'year-end', label: 'Year-End Review' },
            { value: 'system-updates', label: 'System Updates' },
            { value: 'policy-changes', label: 'Policy Changes' }
        ],
        callToAction: [
            { value: 'click-link', label: 'Click a Link' },
            { value: 'download-attachment', label: 'Download Attachment' },
            { value: 'reply-information', label: 'Reply with Information' },
            { value: 'transfer-funds', label: 'Transfer Funds' }
        ]
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (generatedEmail) {
            clearEmail();
            setCopied(false);
            setSaved(false);
        }
    };

    const handleGenerate = async () => {
        setCopied(false);
        setSaved(false);
        setSaveError(null);
        await generateEmail(formData);
    };

    const handleCopy = async () => {
        if (!generatedEmail?.htmlBody) return;
        try {
            await navigator.clipboard.writeText(generatedEmail.htmlBody);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleSaveAsTemplate = async () => {
        if (!generatedEmail) return;
        setSaveError(null);
        const htmlContent = generatedEmail.htmlBody;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const file = new File([blob], 'ai-generated-template.html', { type: 'text/html' });

        const result = await createTemplate({
            name: `AI Generated - ${generatedEmail.subject}`,
            subject: generatedEmail.subject,
            senderName: generatedEmail.senderName,
            senderEmail: generatedEmail.senderEmail,
            type: 'ai-generated',
            file: file
        });

        if (result.success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            setSaveError(result.message || 'Failed to save template');
        }
    };

    const SelectField = ({ label, field, options: opts }) => (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
            <select
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg 
                    text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 
                    focus:border-cyan-500 cursor-pointer"
            >
                {opts.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-slate-800">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 
                    flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">AI Email Builder</h1>
                    <p className="text-slate-400 text-sm">Generate realistic phishing simulation emails</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left - Configuration */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-5">Configuration</h2>

                    <div className="space-y-4">
                        <SelectField label="Target Audience" field="targetAudience" options={options.targetAudience} />
                        <SelectField label="Objective" field="objective" options={options.objective} />
                        <SelectField label="Threat Type" field="threatType" options={options.threatType} />
                        <SelectField label="Industry" field="industry" options={options.industry} />
                        <SelectField label="Tone" field="tone" options={options.tone} />
                        <SelectField label="Trigger" field="trigger" options={options.trigger} />
                        <SelectField label="Call-to-Action" field="callToAction" options={options.callToAction} />

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Additional Context (Optional)
                            </label>
                            <textarea
                                value={formData.customContext}
                                onChange={(e) => handleChange('customContext', e.target.value)}
                                placeholder="Add company-specific details..."
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg 
                                    text-white text-sm placeholder-slate-500 focus:outline-none 
                                    focus:ring-2 focus:ring-cyan-500 resize-none"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-semibold text-white
                                bg-gradient-to-r from-purple-600 to-cyan-600
                                hover:from-purple-500 hover:to-cyan-500
                                disabled:opacity-50 disabled:cursor-not-allowed
                                shadow-lg shadow-purple-500/25 transition-all duration-300 
                                flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                            ) : (
                                <><Sparkles className="w-5 h-5" /> Generate Email</>
                            )}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right - Output */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Mail className="w-5 h-5 text-cyan-400" /> Generated Email
                        </h2>
                        {generatedEmail && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white flex items-center gap-2"
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                                <button
                                    onClick={handleSaveAsTemplate}
                                    className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white flex items-center gap-2"
                                >
                                    {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                                    {saved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        )}
                    </div>

                    {generatedEmail ? (
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase mb-1">Subject</p>
                                <p className="text-white font-medium">{generatedEmail.subject}</p>
                                <p className="text-sm text-slate-400 mt-2">
                                    From: {generatedEmail.senderName} &lt;{generatedEmail.senderEmail}&gt;
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-5 max-h-[400px] overflow-y-auto">
                                <div
                                    className="prose prose-sm max-w-none text-slate-800"
                                    dangerouslySetInnerHTML={{ __html: generatedEmail.htmlBody }}
                                />
                            </div>

                            {generatedEmail.redFlags?.length > 0 && (
                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                                    <h4 className="text-amber-400 font-medium text-sm mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> Phishing Indicators
                                    </h4>
                                    <ul className="space-y-1">
                                        {generatedEmail.redFlags.map((flag, i) => (
                                            <li key={i} className="text-amber-300/80 text-sm">• {flag}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {saveError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <p className="text-red-400 text-sm">{saveError}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-4">
                                <Mail className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-slate-400 font-medium mb-1">No Email Generated</h3>
                            <p className="text-slate-500 text-sm max-w-[250px]">
                                Configure and click "Generate Email" to create a phishing simulation
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIBuilder;
