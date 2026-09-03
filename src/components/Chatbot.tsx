'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const suggestedQuestions = [
  'What services does Teknox provide?',
  'What can Teknox build?',
  'I need a website or web application',
  'I need an AI solution',
  'Can you automate my business?',
  'Can you build a mobile app?'
];

const welcomeMessage: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Hi! 👋 I'm the Teknox AI assistant.\n\nI can help you learn about our services and explore what kind of technology solution might be right for your business.\n\nWhat would you like to know?`,
  timestamp: ''
};

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  // Do not show chatbot on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get a response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError('Something went wrong. Please try again or reach out directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([welcomeMessage]);
    setError(null);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 font-sans max-w-[calc(100vw-24px)]">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_4px_22px_rgba(79,70,229,0.4)] transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Open Teknox AI Assistant"
        >
          <svg
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.84-.84c.09-.54.26-1.12.51-1.68C3.766 16.71 3 14.47 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>
      )}

      {/* Modern Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[calc(100vw-24px)] sm:w-[400px] h-[500px] sm:h-[560px] max-h-[80vh] rounded-2xl border border-slate-200 dark:border-line bg-white dark:bg-panel shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-line bg-slate-50 dark:bg-ink-800">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-signal/10 border border-indigo-200 dark:border-signal/25 text-indigo-600 dark:text-signal">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-panel" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-slate-900 dark:text-star flex items-center gap-2">
                  <span>Teknox AI</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-signal/10 border border-indigo-200 dark:border-signal/20 text-[10px] font-mono text-indigo-700 dark:text-signal">
                    Consultant
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-steeldim">Solutions & Services Specialist</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Clear Conversation"
                className="p-1.5 rounded-lg text-steeldim hover:text-star hover:bg-panel transition text-xs"
                aria-label="Restart chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-steeldim hover:text-star hover:bg-panel transition"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-signal text-white rounded-br-none shadow-sm'
                        : 'bg-ink-800 border border-line text-star rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.timestamp && (
                    <span className="text-[10px] font-mono text-steeldim px-1 mt-1">{msg.timestamp}</span>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-ink-800 border border-line rounded-2xl rounded-bl-none px-4 py-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-[11px] text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Suggested Question Chips (when only welcome message is present) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-steeldim pl-1">
                  Suggested topics:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-[11px] px-2.5 py-1 rounded-lg border border-line bg-ink-800 hover:border-signal/40 hover:text-star text-steel transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Footer */}
          <div className="px-4 py-2 bg-ink-800 border-t border-line flex items-center justify-between text-[11px] font-mono text-steeldim">
            <span>Looking for scoping?</span>
            <Link
              href="/request-a-solution"
              onClick={() => setIsOpen(false)}
              className="text-signal hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Request Solution</span>
              <span>↗</span>
            </Link>
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-line bg-panel">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Teknox services, tech, solutions..."
                disabled={isLoading}
                className="w-full rounded-lg border border-line bg-ink-800 px-3.5 py-2.5 pr-11 text-xs text-star placeholder:text-steeldim outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-signal text-white transition hover:bg-signal-hover disabled:opacity-30 disabled:hover:bg-signal"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
