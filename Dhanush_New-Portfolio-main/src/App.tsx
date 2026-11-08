import React, { useState, useEffect } from 'react';
import { JackPortfolio } from './components/jack/JackPortfolio';
import { DhanushPortfolio } from './components/DhanushPortfolio';
import { Sparkles, UserCheck } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'jack' | 'dhanush'>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('view');
      if (param === 'dhanush') return 'dhanush';
    }
    return 'jack';
  });

  const toggleView = () => {
    const nextView = view === 'jack' ? 'dhanush' : 'jack';
    setView(nextView);
    const url = new URL(window.location.href);
    if (nextView === 'dhanush') {
      url.searchParams.set('view', 'dhanush');
    } else {
      url.searchParams.delete('view');
    }
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    if (view === 'jack') {
      document.title = 'Jack -- 3D Creator';
    } else {
      document.title = 'Dhanush Gopi - Full Stack AI Engineer';
    }
  }, [view]);

  return (
    <div className="relative min-h-screen bg-[#0C0C0C]">
      {/* Portfolio Selector Floating Switcher */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={toggleView}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 text-xs tracking-wider uppercase text-slate-300 hover:text-white transition-all shadow-xl cursor-pointer"
          title="Switch Portfolio View"
        >
          {view === 'jack' ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
              <span>Viewing: <strong className="text-white">Jack (3D Creator)</strong></span>
              <span className="text-cyan-400 text-[10px] pl-1 font-mono">&rarr; Switch to Dhanush</span>
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Viewing: <strong className="text-white">Dhanush Gopi</strong></span>
              <span className="text-fuchsia-400 text-[10px] pl-1 font-mono">&rarr; Switch to Jack</span>
            </>
          )}
        </button>
      </div>

      {view === 'jack' ? <JackPortfolio /> : <DhanushPortfolio />}
    </div>
  );
}
