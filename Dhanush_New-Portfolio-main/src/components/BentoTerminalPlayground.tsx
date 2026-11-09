import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Sparkles, CornerDownLeft, Play, RotateCcw } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const BentoTerminalPlayground: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'whoami',
      output: 'Dhanush Gopi Kavala — MERN & Full Stack Software Engineer | YOLOv9 Deep Learning Researcher (CGPA: 9.04)',
      timestamp: '09:30:12',
    },
    {
      command: 'metrics',
      output: '⚡ 9.04 CGPA | 900+ Problems Solved | 1 Published IEEE Paper | 6 Industry Certifications (Oracle, Azure, ServiceNow)',
      timestamp: '09:30:15',
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    audioSynth.playSuccessChime();
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });

    let result: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">Available Playground Commands:</p>
            <p>• <span className="text-amber-300 font-mono">whoami</span> — Identity, bio, and engineering specialty</p>
            <p>• <span className="text-amber-300 font-mono">cgpa</span> — Academic transcript metrics (9.04 CGPA / 82.88%)</p>
            <p>• <span className="text-amber-300 font-mono">skills</span> — Full-stack, database & AI capabilities</p>
            <p>• <span className="text-amber-300 font-mono">projects</span> — Deployed applications & live links</p>
            <p>• <span className="text-amber-300 font-mono">metrics</span> — Quantitative problem-solving telemetry</p>
            <p>• <span className="text-amber-300 font-mono">contact</span> — Reach out via email, LinkedIn, or GitHub</p>
            <p>• <span className="text-amber-300 font-mono">clear</span> — Reset terminal console buffer</p>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="space-y-1">
            <p className="text-white font-bold">{RESUME_DATA.personal.name} ({RESUME_DATA.personal.role})</p>
            <p className="text-slate-400 text-xs">{RESUME_DATA.personal.careerObjective}</p>
          </div>
        );
        break;

      case 'cgpa':
      case 'education':
        result = (
          <div className="space-y-1 text-emerald-300 font-mono text-xs">
            <p>🎓 {RESUME_DATA.education[0].institution}</p>
            <p>📚 {RESUME_DATA.education[0].degree} ({RESUME_DATA.education[0].period})</p>
            <p className="text-cyan-300 font-bold">🏆 CGPA: 9.04 / 10.0 (82.88%) — Top Academic Distinction</p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-1 font-mono text-xs text-slate-300">
            <p><span className="text-cyan-400 font-bold">Languages:</span> Java (Core & OOP), Python, JavaScript (ES6+), TypeScript</p>
            <p><span className="text-indigo-400 font-bold">Frontend:</span> React.js, Next.js, Tailwind CSS, Three.js, Motion</p>
            <p><span className="text-purple-400 font-bold">Backend:</span> Node.js, Express.js, RESTful APIs, JWT Auth</p>
            <p><span className="text-amber-400 font-bold">Databases & AI:</span> MongoDB, PostgreSQL, MySQL, PyTorch, YOLOv9</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-1.5 font-mono text-xs">
            {RESUME_DATA.projects.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-300">
                <span className="text-white font-bold">{idx + 1}. {p.title}</span>
                <span className="text-cyan-400 text-[10px]">{p.category}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'metrics':
        result = (
          <div className="space-y-1 font-mono text-xs text-amber-300">
            <p>🔥 900+ Total Algorithmic Problems Solved across Competitive Coding</p>
            <p>⚡ LeetCode: 200+ Solved (Arrays, DP, Graphs)</p>
            <p>⚡ GeeksforGeeks: 150+ Solved (DSA & Core Java)</p>
            <p>⚡ Code360 (Coding Ninjas): 100+ Solved</p>
            <p>📄 IEEE Published Research Paper on Real-Time YOLOv9 Object Detection</p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 font-mono text-xs text-cyan-300">
            <p>📧 Email: {RESUME_DATA.personal.email}</p>
            <p>📱 Phone: {RESUME_DATA.personal.phone}</p>
            <p>🔗 GitHub: {RESUME_DATA.personal.github}</p>
            <p>💼 LinkedIn: {RESUME_DATA.personal.linkedin}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        result = (
          <p className="text-rose-400 font-mono text-xs">
            bash: command not found: {trimmed}. Type <span className="text-cyan-300 font-bold">help</span> to view supported commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: trimmed, output: result, timestamp: now }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    audioSynth.playKeyClick();
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/90 rounded-2xl border border-cyan-500/30 overflow-hidden font-mono shadow-2xl relative group">
      
      {/* Top Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600" />
          <span className="ml-2 text-xs text-slate-400 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>dhanush@portfolio-sandbox: ~</span>
          </span>
        </div>

        <button
          onClick={() => {
            audioSynth.playLaserBlip();
            setHistory([]);
          }}
          title="Clear Terminal Buffer"
          className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">clear</span>
        </button>
      </div>

      {/* Terminal History Output Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed max-h-[260px] scrollbar-thin">
        {history.map((h, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-emerald-400 font-bold">dhanush@portfolio:~$</span>
              <span className="text-slate-100 font-bold">{h.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto">{h.timestamp}</span>
            </div>
            <div className="pl-4 text-slate-300 border-l border-cyan-500/20 py-0.5">
              {h.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Interactive Command Suggestion Chips */}
      <div className="px-4 py-2 bg-slate-900/40 border-t border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-1">Quick:</span>
        {['whoami', 'cgpa', 'skills', 'projects', 'metrics', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 text-[11px] font-mono transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Terminal Input Prompt */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-white/10 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs select-none">dhanush@portfolio:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'whoami', 'cgpa', 'skills', 'help'..."
          className="flex-1 bg-transparent text-slate-100 text-xs font-mono focus:outline-none placeholder:text-slate-600 caret-cyan-400"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-400/30 transition-all cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
