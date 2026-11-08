import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, X, CornerDownLeft, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface TerminalViewProps {
  onExitTerminal: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ onExitTerminal }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-2 text-slate-300">
          <p className="text-emerald-400 font-bold">
            Dhanush Gopi Kavala CLI Portfolio v2026.1.0
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-blue-400 font-mono font-bold">help</span> to view available interactive commands.
          </p>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-blue-400 font-bold mb-1">Available Commands:</p>
            <p><span className="text-emerald-400 font-bold">cat resume.json</span> - View complete resume JSON</p>
            <p><span className="text-emerald-400 font-bold">skills</span> - Display skill matrix & proficiency ratings</p>
            <p><span className="text-emerald-400 font-bold">projects</span> - List featured engineering projects & repos</p>
            <p><span className="text-emerald-400 font-bold">experience</span> - View internship details at Codec Tech</p>
            <p><span className="text-emerald-400 font-bold">education</span> - View CGPA (9.04) and coursework</p>
            <p><span className="text-emerald-400 font-bold">certs</span> - List verified certifications</p>
            <p><span className="text-emerald-400 font-bold">contact</span> - Show email, phone & social profiles</p>
            <p><span className="text-emerald-400 font-bold">clear</span> - Clear terminal buffer</p>
            <p><span className="text-emerald-400 font-bold">exit</span> - Switch back to visual GUI mode</p>
          </div>
        );
        break;

      case 'cat resume.json':
        outputNode = (
          <pre className="text-[11px] text-emerald-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
            {JSON.stringify(RESUME_DATA, null, 2)}
          </pre>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-blue-400 font-bold">Technical Proficiency Matrix:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESUME_DATA.skills.map((s, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-200">{s.name}</span>
                  <span className="text-emerald-400 font-bold">[{'#'.repeat(Math.floor(s.level / 10))}{'.'.repeat(10 - Math.floor(s.level / 10))}] {s.level}%</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-3 text-xs font-mono">
            {RESUME_DATA.projects.map((p, i) => (
              <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <p className="text-blue-400 font-bold">{i + 1}. {p.title} ({p.date})</p>
                <p className="text-slate-300">{p.description}</p>
                <p className="text-slate-500">Repo: {p.repoUrl}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-purple-400 font-bold">Codec Technologies Pvt. Ltd. (Jan 2026 - Mar 2026)</p>
            <p className="text-slate-300">MERN Stack Developer (Remote)</p>
            <ul className="list-disc pl-4 text-slate-400 space-y-1">
              <li>Engineered scalable MERN web apps with Tailwind CSS</li>
              <li>Designed secure RESTful APIs with JWT Auth under Agile</li>
            </ul>
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p><strong className="text-white">Sri Vasavi Engineering College:</strong> B.Tech CSE (CGPA: 9.04/10 | 82.88%)</p>
            <p><strong className="text-white">Sri Chaitanya Junior College:</strong> Intermediate (96%)</p>
            <p><strong className="text-white">Sri Shiridi Sai EM High School:</strong> Secondary (99%)</p>
          </div>
        );
        break;

      case 'certs':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-emerald-300">
            {RESUME_DATA.certifications.map((c, i) => (
              <p key={i}>• {c.title} - {c.issuer} ({c.date}) [{c.badgeCode}]</p>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p>Email: <span className="text-blue-400">{RESUME_DATA.personal.email}</span></p>
            <p>Phone: <span className="text-blue-400">{RESUME_DATA.personal.phone}</span></p>
            <p>GitHub: <span className="text-blue-400">{RESUME_DATA.personal.github}</span></p>
            <p>LinkedIn: <span className="text-blue-400">{RESUME_DATA.personal.linkedin}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onExitTerminal();
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: "{cmd}". Type <span className="text-blue-400 font-bold">help</span> for commands.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 flex flex-col font-mono text-slate-200">
      
      {/* Top Terminal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-bold text-slate-400 ml-2">
            dhanush@portfolio-2026:~
          </span>
        </div>

        <button
          onClick={onExitTerminal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Visual Mode</span>
        </button>
      </div>

      {/* Terminal Buffer */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-2">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <span>dhanush@portfolio:~$</span>
              <span className="text-white font-bold">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleCommandSubmit} className="pt-4 border-t border-slate-800 flex items-center gap-2">
        <span className="text-xs text-emerald-400 font-bold">dhanush@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help', 'skills', 'projects', 'cat resume.json'..."
          className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none placeholder:text-slate-600 font-mono"
        />
        <button type="submit" className="text-slate-500 hover:text-white">
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
