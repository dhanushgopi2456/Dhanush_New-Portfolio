import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Square, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { 
  subscribeSpeechState, 
  speakGreetingAndObjective, 
  stopSpeech, 
  VoiceSpeakerState 
} from '../utils/speechUtils';
import { ButtonGlare } from './ui/button-glare';

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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleGreeting}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md overflow-hidden group cursor-pointer ${
          speechState.isSpeaking
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-amber-500/25 ring-2 ring-amber-500/30'
            : 'bg-slate-900/70 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-amber-500/40'
        } ${className}`}
        title={speechState.isSpeaking ? 'Stop Voice Narration' : 'Speak Greeting & Career Objective'}
      >
        <ButtonGlare radius={12} frontColor={{ r: 1, g: 0.6, b: 0.1, a: 1 }} />
        <span className="relative z-10 flex items-center gap-1.5">
          {speechState.isSpeaking ? (
            <>
              {/* Animated Live Audio Waveform Visualizer */}
              <div className="flex items-center gap-0.5 h-3.5">
                <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.4s]" />
                <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-0.5 h-3.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
              </div>
              <span>Stop Narration</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Voice Guide</span>
            </>
          )}
        </span>
      </motion.button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleToggleGreeting}
        className={`group relative flex items-center gap-3 px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-300 shadow-xl overflow-hidden cursor-pointer ${
          speechState.isSpeaking
            ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-200 border-amber-500/60 shadow-amber-500/30 ring-2 ring-amber-500/30'
            : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-amber-500/50 shadow-black/40'
        }`}
      >
        <ButtonGlare radius={16} frontColor={{ r: 1, g: 0.6, b: 0.1, a: 1 }} />
        {speechState.isSpeaking ? (
          <>
            {/* Animated Live Audio Waveform Visualizer */}
            <div className="flex items-center gap-1 h-5">
              <span className="w-1 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.45s]" />
              <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.05s]" />
            </div>
            <div className="text-left">
              <span className="block font-extrabold leading-none">Stop Speaker</span>
              <span className="text-[10px] text-amber-300 font-mono leading-none mt-1">Live Audio Guide Active</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-md">
              <Volume2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block font-extrabold leading-none">Speak Objective</span>
              <span className="text-[10px] text-slate-400 font-mono leading-none mt-1">Audio Portfolio Guide</span>
            </div>
          </>
        )}
      </motion.button>

      {/* Floating Speech Transcription Toast with Frosted Glass */}
      <AnimatePresence>
        {speechState.isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-3 z-50 p-4 rounded-2xl bg-slate-950/95 border border-amber-500/50 text-xs text-amber-200 backdrop-blur-2xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono text-amber-400 uppercase tracking-wider font-extrabold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Voice Guide Narration</span>
            </div>
            <p className="line-clamp-3 text-slate-300 italic font-sans leading-relaxed">
              "{speechState.currentText}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
