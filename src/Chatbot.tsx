import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Loader2, MessageSquareShare } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { CLIENT_CONFIG, getSystemPrompt, getPostCapturePrompt } from './clientConfig';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const captureLeadDeclaration: FunctionDeclaration = {
  name: "capture_lead",
  description: "Call this tool once the user has provided their name and phone number.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The full name of the lead" },
      phone: { type: Type.STRING, description: "The phone number of the lead" }
    },
    required: ["name", "phone"]
  }
};

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: CLIENT_CONFIG.greetingMessage }
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

    // Auto-open logic to maximize conversions
    const hasSeenChat = sessionStorage.getItem('hasSeenChat');
    let timer: number;
    if (!hasSeenChat) {
      // 4-second delay so they can absorb the hero section first
      timer = window.setTimeout(() => {
        // Only auto-open on larger screens to prevent full-screen mobile takeovers
        if (window.innerWidth > 768) {
          setIsOpen(true);
        }
      }, 4000);
    }

    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      sessionStorage.setItem('hasSeenChat', 'true');
    }
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    leadCapturedRef.current = leadCaptured;
  }, [leadCaptured]);

  const sendLeadSilently = async (name: string, phone: string, currentMessages: Message[]) => {
    try {
      const transcript = currentMessages.map(m => `${m.role === 'user' ? 'Lead' : CLIENT_CONFIG.companyName}: ${m.content}`).join('\n\n');
      
      // Send directly to formsubmit.co for fully static hosting environments (like Cloudflare Pages)
      await fetch(`https://formsubmit.co/ajax/${CLIENT_CONFIG.notificationEmail}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Urgent: New Lead - ${name}`,
          "Lead Name": name,
          "Phone Number": phone,
          "Chat Transcript": transcript
        })
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

    if (!aiClient) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I am currently disconnected. Please make sure your Gemini API key is securely configured in your AI Studio Secrets panel." }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: text };
    // Use messagesRef to guarantee we always have the latest chat history, 
    // even when triggered asynchronously by the voice API's onend event
    const currentMessages = messagesRef.current;
    const newMessages = [...currentMessages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const contents = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await aiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: leadCapturedRef.current ? getPostCapturePrompt() : getSystemPrompt(),
          // Hide the tool from Gemini once we've successfully captured the lead
          // This prevents it from ever looping or calling it twice.
          ...( !leadCapturedRef.current ? { tools: [{ functionDeclarations: [captureLeadDeclaration] }] } : {} ),
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });

      let replyText = response.text || "";
      
      // Check for function call
      if (response.functionCalls && response.functionCalls.length > 0) {
         const call = response.functionCalls.find(fc => fc.name === "capture_lead");
         
         if (call && call.args && !leadCaptured) {
            setLeadCaptured(true);
            const argMap = call.args as Record<string, any>;
            sendLeadSilently(argMap.name || "Unknown", argMap.phone || "Unknown", newMessages);
         }

         if (!replyText) {
             replyText = "Thank you so much! Our team has received your details and will be in touch with you shortly. Is there anything else I can help you with today?";
         }
      } else if (!replyText) {
          replyText = "I'm sorry, I couldn't process that.";
      }

      setMessages(prev => [...prev, { role: 'model', content: replyText }]);
      speak(replyText);
    } catch (error: any) {
      console.error("AI Error:", error);
      
      // Parse the error message so the end-user (client's customer) never sees raw JSON
      const rawError = typeof error?.message === 'string' ? error.message : JSON.stringify(error) || "Unknown error";
      let friendlyMessage = "Sorry, I'm having trouble connecting to the network right now. Please try again in a moment.";
      
      // Handle Free Tier 429 Quota Exhausted limits smoothly
      if (rawError.includes("429") || rawError.toLowerCase().includes("quota") || rawError.includes("RESOURCE_EXHAUSTED")) {
        friendlyMessage = "I am currently receiving a massive volume of messages and need a quick breather! Please wait a moment and try again.";
      } else if (rawError.includes("API key not valid") || rawError.includes("API_KEY_INVALID")) {
        // Handle misconfigured API Keys
        friendlyMessage = "The chat system is currently down for maintenance (API Configuration Error).";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        content: friendlyMessage 
      }]);
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
    
    // Stop recording when they finish their sentence
    recognition.continuous = false;
    // Show words live on the screen as they speak
    recognition.interimResults = true;
    
    let finalTranscript = '';

    recognition.onstart = () => {
      setIsListening(true);
      setInput(''); // Clear input for fresh voice message
    };
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Update input text in real-time
      setInput(finalTranscript + interimTranscript);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      // Magically auto-send the text once they stop talking to feel like a real AI agent
      if (finalTranscript.trim()) {
        handleSend(finalTranscript.trim());
      }
    };

    recognition.start();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`group fixed bottom-24 right-8 w-14 h-14 bg-accent-green hover:bg-[#86c52a] text-[#0A1F1C] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0A1F1C] text-[#E6F4F1] font-poppins font-medium text-sm whitespace-nowrap rounded-xl opacity-0 hover:hidden group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl border border-white/10 after:content-[''] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-[6px] after:border-transparent after:border-l-[#0A1F1C]">
          Click if you need help
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200">
          <div className="bg-[#0A1F1C] p-4 flex items-center justify-between text-[#E6F4F1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center text-[#0A1F1C]">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">{CLIENT_CONFIG.botName}</h3>
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
