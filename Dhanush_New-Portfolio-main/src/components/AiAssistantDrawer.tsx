import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am Dhanush's AI Assistant. Ask me anything about his CGPA (9.04), MERN Stack internship at Codec Tech, YOLOv9 research paper, or technical projects!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Tell me about Dhanush's CGPA & College",
    "Explain his MERN Stack experience",
    "What is his YOLOv9 research paper about?",
    "List all 6 industry certifications"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Append user message
    const updatedMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMessages);
    if (!textToSend) setInputQuery('');
    setLoading(true);

    setTimeout(() => {
      let reply = "";
      const q = query.toLowerCase();

      if (q.includes('cgpa') || q.includes('college') || q.includes('education') || q.includes('marks')) {
        reply = `Dhanush graduated with a B.Tech in Computer Science & Engineering from Sri Vasavi Engineering College (Tadepalligudem) with a top academic CGPA of 9.04/10 (82.88%). He also scored 96% in Intermediate and 99% in Matriculation.`;
      } else if (q.includes('mern') || q.includes('codec') || q.includes('experience') || q.includes('work')) {
        reply = `Dhanush worked as a MERN Stack Developer intern at Codec Technologies Pvt. Ltd. (Jan-Mar 2026). He engineered scalable web apps using React.js, Express, Node.js, MongoDB, and Tailwind CSS with secure JWT Authentication.`;
      } else if (q.includes('yolo') || q.includes('paper') || q.includes('research') || q.includes('ai') || q.includes('vision')) {
        reply = `Dhanush published a research paper titled "Object Detection using YOLOv9" at the International Conference on Artificial Intelligence and Data Science (AIDE-2024). He built a full computer vision pipeline with PyTorch & OpenCV, deployed as a high-performance Flask web application.`;
      } else if (q.includes('cert') || q.includes('servicenow') || q.includes('azure') || q.includes('oracle') || q.includes('salesforce')) {
        reply = `Dhanush holds 6 key certifications:\n1. Salesforce Agentforce Specialist (Dec 2025)\n2. ServiceNow Certified System Administrator (CSA) (Sep 2025)\n3. ServiceNow Certified Application Developer (CAD) (Oct 2025)\n4. Oracle Cloud Infrastructure 2025 DevOps Professional (July 2025)\n5. Microsoft Azure AI Fundamentals (AI-900) (May 2024)\n6. NPTEL Data Structures & Algorithms using Java (Oct 2024)`;
      } else if (q.includes('project') || q.includes('freshmart') || q.includes('task')) {
        reply = `Dhanush built 3 major projects:\n• FreshMart: Full-Stack Grocery Web App with JWT & Admin Control\n• Team Task Manager: Collaborative Kanban Board with Role-Based Access Controls (RBAC)\n• Object Detection YOLOv9: Computer vision pipeline for real-time video/image inference`;
      } else {
        reply = `Dhanush Gopi Kavala is a Computer Science Engineer specializing in Full Stack MERN development, Java/Python DSA, REST API design, and Computer Vision. You can reach him at ${RESUME_DATA.personal.email} or ${RESUME_DATA.personal.phone}!`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setLoading(false);
    }, 550);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-2xl">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="w-full max-w-md bg-slate-900/95 border-l border-white/10 h-full flex flex-col shadow-2xl relative backdrop-blur-2xl"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-600/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Dhanush's AI Assistant</h3>
              <p className="text-xs font-mono text-purple-300">Resume & Credentials AI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-600/25'
                    : 'bg-slate-950/90 border border-white/10 text-slate-200 rounded-tl-none whitespace-pre-line shadow-lg'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-400 font-mono italic">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing resume database...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 border-t border-white/10 bg-slate-950/70 flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-purple-600/20 border border-slate-700/80 text-slate-300 text-[11px] transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-slate-950/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about MERN, YOLOv9, CGPA, projects..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </motion.div>
    </div>
  );
};
