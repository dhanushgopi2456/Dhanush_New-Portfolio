import React, { useState, useEffect } from 'react';
import { JackPortfolio } from './components/jack/JackPortfolio';
import { DhanushPortfolio } from './components/DhanushPortfolio';
import { Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'3d-motion' | 'cyber-luxury'>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('view');
      if (param === 'cyber-luxury') return 'cyber-luxury';
    }
    return '3d-motion';
  });

  const toggleView = () => {
    const nextView = view === '3d-motion' ? 'cyber-luxury' : '3d-motion';
    setView(nextView);
    const url = new URL(window.location.href);
    if (nextView === 'cyber-luxury') {
      url.searchParams.set('view', 'cyber-luxury');
    } else {
      url.searchParams.delete('view');
    }
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    document.title = 'Dhanush Gopi -- Full Stack & AI Engineer';
  }, [view]);

  return (
    <div className="relative min-h-screen bg-[#0C0C0C]">
      {/* Portfolio Design Style Switcher */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleView}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 text-xs tracking-wider uppercase text-slate-300 hover:text-white transition-all shadow-xl cursor-pointer"
          title="Switch Portfolio Design Theme"
        >
          {view === '3d-motion' ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
              <span>Theme: <strong className="text-white">High-Motion 3D Experience</strong></span>
              <span className="text-cyan-400 text-[10px] pl-1 font-mono">&rarr; Switch to Cyber Theme</span>
            </>
          ) : (
            <>
              <Layers className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Theme: <strong className="text-white">Cyber Luxury Experience</strong></span>
              <span className="text-fuchsia-400 text-[10px] pl-1 font-mono">&rarr; Switch to 3D Motion</span>
            </>
          )}
        </button>
      </div>

      {view === '3d-motion' ? <JackPortfolio /> : <DhanushPortfolio />}
    </div>
  );
}
