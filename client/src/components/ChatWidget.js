import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { axiosInstance } from '../services/axiosInstance';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey there! I'm Shiro, your security assistant! 🎮 How can I help you learn about Decoy today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Build history for context (exclude the initial greeting)
            const history = messages.slice(1).map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await axiosInstance.post('/api/chat', {
                message: userMessage,
                history
            });

            if (response.data.success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.data.data.message
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "Oops! Something went wrong. Please try again! 😅"
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Hmm, I'm having trouble connecting. Please try again in a moment! 🔧"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl 
                    transition-all duration-300 transform hover:scale-110
                    ${isOpen
                        ? 'bg-slate-800 rotate-0'
                        : 'bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-500 animate-pulse'
                    }
                    flex items-center justify-center group`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="w-6 h-6 text-white" />
                        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
                    </div>
                )}
            </button>

            {/* Chat Panel */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] 
                    transition-all duration-300 transform origin-bottom-right
                    ${isOpen
                        ? 'scale-100 opacity-100 pointer-events-auto'
                        : 'scale-95 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 
                    border border-slate-700/50 backdrop-blur-xl bg-slate-900/95"
                    style={{ fontFamily: '"Inter", "Montserrat", sans-serif' }}>

                    {/* Header */}
                    <div className="relative p-4 bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm 
                                flex items-center justify-center border-2 border-white/30">
                                <span className="text-2xl">🎮</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Shiro</h3>
                                <p className="text-white/80 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Security Assistant
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                        ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-br-md'
                                            : 'bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/50'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800/80 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-700/50">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask Shiro anything..."
                                disabled={isLoading}
                                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3
                                    text-white text-sm placeholder-slate-500
                                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
                                    disabled:opacity-50 transition-all"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500
                                    flex items-center justify-center
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    hover:shadow-lg hover:shadow-purple-500/25 transition-all
                                    active:scale-95"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-500 mt-2">
                            Powered by Gemini AI ✨
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatWidget;
