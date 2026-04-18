import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Loader2, MessageSquareShare } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! How are you today? I'm the VerveDentist assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  const leadCapturedRef = useRef(leadCaptured);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    leadCapturedRef.current = leadCaptured;
  }, [leadCaptured]);

  const sendLeadSilently = async (name: string, phone: string, currentMessages: Message[]) => {
    try {
      const transcript = currentMessages.map(m => `${m.role === 'user' ? 'Lead' : 'VerveDentist'}: ${m.content}`).join('\n\n');
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, transcript })
      });
    } catch (e) {
      console.error("Failed to forward lead", e);
    }
  };

  useEffect(() => {
    // Only start the 5-minute auto-close timer AFTER the lead has provided their name and number
    if (!leadCapturedRef.current) return;

    const hasUserMessage = messages.some(m => m.role === 'user');
    if (!hasUserMessage) return;

    const timer = setTimeout(() => {
      setMessages(prev => {
        // Prevent adding multiple closing messages if they are already there
        if (prev.length > 0 && prev[prev.length - 1].content.includes("stepped away")) return prev;
        return [...prev, { role: 'model', content: "It looks like you've stepped away, so I'll close our chat for now. Have a wonderful day!" }];
      });
      // Email is already forwarded upon capture, so we just end the chat smoothly.
    }, 5 * 60 * 1000); // 5 minutes timeout

    return () => clearTimeout(timer);
  }, [messages, leadCaptured]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = (text: string) => {
    if (!voiceEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
         throw new Error("Chat API failed");
      }
      
      const data = await response.json();

      let replyText = data.replyText || "";
      
      if (data.capturedLead) {
         if (!leadCaptured) {
            setLeadCaptured(true);
            sendLeadSilently(data.capturedLead.name || "Unknown", data.capturedLead.phone || "Unknown", newMessages);
         }
      }

      setMessages(prev => [...prev, { role: 'model', content: replyText }]);
      speak(replyText);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => (prev + " " + transcript).trim());
      setIsListening(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-8 w-14 h-14 bg-accent-green hover:bg-[#86c52a] text-[#0A1F1C] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200">
          <div className="bg-[#0A1F1C] p-4 flex items-center justify-between text-[#E6F4F1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center text-[#0A1F1C]">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">Verve Assistant</h3>
                <p className="text-xs text-accent-green">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled) window.speechSynthesis.cancel();
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title={voiceEnabled ? "Mute responses" : "Read responses aloud"}
              >
                {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[15px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#0A1F1C] text-[#E6F4F1] rounded-tr-none' 
                    : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-slate-400">
                  <Loader2 size={18} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={handleMicClick}
              className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              title="Click to speak"
            >
              <Mic size={20} />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-accent-green text-slate-800"
            />
            
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-accent-green hover:bg-[#86c52a] text-[#0A1F1C] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
