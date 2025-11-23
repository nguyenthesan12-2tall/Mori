import React, { useState } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/mpwnnwkk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                setStatus('success');
                setMessage('');
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg border border-slate-700 hover:border-emerald-500/50 transition-all group"
            >
                <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Feedback</span>
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    {/* Modal Content */}
                    <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-emerald-400" />
                            Share your thoughts
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Found a bug? Have a feature request? Let us know!
                        </p>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                                    <Send className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Thank you!</h3>
                                <p className="text-slate-400">Your feedback has been sent.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your feedback here..."
                                    className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                    required
                                />

                                {status === 'error' && (
                                    <p className="text-rose-400 text-sm">Something went wrong. Please try again.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting' || !message.trim()}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Feedback
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
