import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CornerDownLeft, RotateCcw, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { audioSynth } from '../utils/audioSynth';

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
  const streamContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Safely scroll internal stream without triggering outer container or window scroll jumps
  useEffect(() => {
    if (streamContainerRef.current) {
      streamContainerRef.current.scrollTop = streamContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    try { audioSynth.playSuccessChime(); } catch {}
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
    try { audioSynth.playKeyClick(); } catch {}
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="flex flex-col h-full w-full min-h-[300px] bg-slate-950/95 rounded-2xl border border-cyan-500/30 overflow-hidden font-mono shadow-2xl relative group">
      
      {/* Top Terminal Title Bar with OS Control Dots (Always Visible, Pinned to Top) */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-slate-900/95 border-b border-white/10 select-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block border border-rose-600/80 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block border border-amber-600/80 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block border border-emerald-600/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          <span className="ml-2 text-xs text-slate-300 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">dhanush@portfolio-sandbox: ~</span>
          </span>
        </div>

        <button
          onClick={() => {
            try { audioSynth.playLaserBlip(); } catch {}
            setHistory([]);
          }}
          title="Clear Terminal Buffer"
          className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 border border-white/5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>clear</span>
        </button>
      </div>

      {/* Terminal History Output Stream (Fully Flexible to fill available card height) */}
      <div 
        ref={streamContainerRef}
        className="flex-1 min-h-[140px] p-4 overflow-y-auto space-y-3 text-xs leading-relaxed scrollbar-thin select-text"
      >
        {history.map((h, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="text-emerald-400 font-bold">dhanush@portfolio:~$</span>
              <span className="text-slate-100 font-bold">{h.command}</span>
              <span className="text-[10px] text-slate-500 ml-auto font-mono">{h.timestamp}</span>
            </div>
            <div className="pl-4 text-slate-300 border-l border-cyan-500/25 py-0.5">
              {h.output}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Command Suggestion Chips */}
      <div className="shrink-0 px-4 py-2 bg-slate-900/70 border-t border-white/10 flex flex-wrap items-center gap-1.5 z-10">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mr-1">Quick:</span>
        {['whoami', 'cgpa', 'skills', 'projects', 'metrics', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 text-[11px] font-mono transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Terminal Input Prompt (Pinned to Bottom) */}
      <div className="shrink-0 px-4 py-2.5 bg-slate-950 border-t border-white/10 flex items-center gap-2 z-10">
        <span className="text-emerald-400 font-bold text-xs select-none">dhanush@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'whoami', 'cgpa', 'skills', 'help'..."
          className="flex-1 bg-transparent text-slate-100 text-xs font-mono focus:outline-none placeholder:text-slate-500 caret-cyan-400"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-400/30 transition-all cursor-pointer active:scale-95"
          title="Send Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
