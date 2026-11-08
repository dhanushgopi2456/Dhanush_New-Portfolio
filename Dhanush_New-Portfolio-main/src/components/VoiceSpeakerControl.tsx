import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Square, Mic, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { 
  subscribeSpeechState, 
  speakGreetingAndObjective, 
  stopSpeech, 
  VoiceSpeakerState 
} from '../utils/speechUtils';

export const VoiceSpeakerControl: React.FC<{ className?: string; compact?: boolean }> = ({ 
  className = '', 
  compact = false 
}) => {
  const [speechState, setSpeechState] = useState<VoiceSpeakerState>({
    isSpeaking: false,
    isPaused: false,
    currentText: ''
  });

  useEffect(() => {
    const unsubscribe = subscribeSpeechState((state) => {
      setSpeechState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleGreeting = () => {
    if (speechState.isSpeaking) {
      stopSpeech();
    } else {
      speakGreetingAndObjective(RESUME_DATA.personal.careerObjective);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggleGreeting}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
          speechState.isSpeaking
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse shadow-lg shadow-amber-500/20'
            : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700/80 hover:text-white'
        } ${className}`}
        title={speechState.isSpeaking ? 'Stop Voice Narration' : 'Speak Greeting & Career Objective'}
      >
        {speechState.isSpeaking ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Stop Narration</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Voice Guide</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleToggleGreeting}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-300 ${
          speechState.isSpeaking
            ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-200 border-amber-500/50 shadow-xl shadow-amber-500/20'
            : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-amber-500/40 shadow-lg shadow-blue-950/20'
        }`}
      >
        {speechState.isSpeaking ? (
          <>
            <div className="flex items-center gap-0.5 h-4">
              <span className="w-1 h-full bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-full bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-full bg-amber-400 rounded-full animate-bounce" />
            </div>
            <span>Stop Speaker</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <span className="block font-bold leading-none">Speak Objective</span>
              <span className="text-[10px] text-slate-400 font-mono leading-none mt-1">Audio Portfolio Guide</span>
            </div>
          </>
        )}
      </button>

      {/* Floating Speech Transcription Toast when speaking */}
      {speechState.isSpeaking && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 p-3 rounded-xl bg-slate-950/95 border border-amber-500/40 text-xs text-amber-200 backdrop-blur-md shadow-2xl animate-fade-in max-w-sm">
          <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Voice Speaker Active</span>
          </div>
          <p className="line-clamp-3 text-slate-300 italic font-sans">
            "{speechState.currentText}"
          </p>
        </div>
      )}
    </div>
  );
};
