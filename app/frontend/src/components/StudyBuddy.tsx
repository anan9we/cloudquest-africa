import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Tried in order. If one is unavailable (404) or overloaded (503), the next is used.
const MODELS = [
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
];

const SYSTEM_PROMPT =
  "You are the CloudQuest Africa AI Study Buddy helping a student prepare for the AZ-900 Azure Fundamentals exam. Explain abstract cloud computing concepts using highly relatable, real-world African analogies (e.g., comparing Azure Virtual Networks to gated estate security, Blob Storage to communal grain silos, ExpressRoute to a private matatu lane, CapEx vs OpEx to buying a generator vs paying KPLC). Keep answers concise (under 150 words), encouraging, and format with bold text for key terms.";

const callGemini = async (body: object, apiKey: string): Promise<string> => {
  let lastError = 'Unknown error';

  for (const model of MODELS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        }
      );
      const data = await response.json();

      if (response.ok) {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response (possibly blocked by safety filters).');
        return text;
      }

      lastError = data.error?.message ?? `HTTP ${response.status}`;
      // Model retired or overloaded: try the next one. Anything else (bad key, etc.): stop.
      if (response.status !== 404 && response.status !== 503 && response.status !== 429) throw new Error(lastError);      console.warn(`${model} failed (${response.status}), trying next model...`);
      } catch (e: any) {
      if (e.name === 'AbortError') {
        lastError = 'The AI took too long to respond.';
        console.warn(`${model} timed out, trying next model...`);
      } else {
        throw e;
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw new Error(lastError);
};

export const StudyBuddy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Jambo! I am your CloudQuest Africa Study Buddy. Stuck on a tough AZ-900 concept? Ask me, and I will explain it using a real-world African analogy!'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const SYSTEM_PROMPT = "You are the CloudQuest Africa AI Study Buddy ... (your persona text)";

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage = input.trim();
  setInput('');
  setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
  setIsLoading(true);

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('API key missing. Add VITE_GEMINI_API_KEY to .env and restart the dev server.');

    const history = messages
      .slice(1) // drop the greeting
      .filter(m => !m.isError)
      .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

    const aiResponse = await callGemini(
      {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      },
      apiKey
    );

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
  } catch (error: any) {
    console.error(error);
    setMessages(prev => [...prev, { role: 'model', text: `Oops! ${error.message}`, isError: true }]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl bg-purple-700 hover:bg-purple-800 text-white transition-all transform hover:scale-110 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Study Buddy"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 rounded-t-2xl flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Sparkles size={18} className="text-orange-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">AI Study Buddy</h3>
              <p className="text-[11px] text-purple-200 font-medium">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-purple-200 hover:text-white hover:bg-purple-600 p-1 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-purple-100 text-purple-700'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-700 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                {/* Simple render to handle bolding via *asterisks* if Gemini uses them */}
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-2' : ''} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="text-purple-500 animate-spin" />
                <span className="text-xs text-slate-500 font-medium">Thinking of an analogy...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-200 rounded-b-2xl shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., Explain Virtual Networks..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-slate-800 placeholder:text-slate-500"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 disabled:text-slate-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};