// Speech & MP3 Audio Utility for Dhanush Gopi Kavala Portfolio Voice Assistant

export interface VoiceSpeakerState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  activeSource?: 'mp3' | 'tts';
}

let speechListeners: Array<(state: VoiceSpeakerState) => void> = [];
let currentState: VoiceSpeakerState = {
  isSpeaking: false,
  isPaused: false,
  currentText: '',
};

let activeAudioElement: HTMLAudioElement | null = null;

function notifyListeners() {
  speechListeners.forEach((listener) => listener({ ...currentState }));
}

export function subscribeSpeechState(listener: (state: VoiceSpeakerState) => void) {
  speechListeners.push(listener);
  listener({ ...currentState });
  return () => {
    speechListeners = speechListeners.filter((l) => l !== listener);
  };
}

export function stopSpeech() {
  if (typeof window !== 'undefined') {
    // Stop Web Speech Synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Stop HTML Audio Element if playing
    if (activeAudioElement) {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement = null;
    }
    currentState = { isSpeaking: false, isPaused: false, currentText: '' };
    notifyListeners();
  }
}

/**
 * Attempts to play an MP3 audio file first. If not found or fails to load/play,
 * falls back to male Web Speech API text-to-speech.
 */
export function speakAudioOrText(
  mp3Path: string, 
  fallbackText: string, 
  onEndCallback?: () => void
) {
  if (typeof window === 'undefined') return;

  stopSpeech();

  // Try loading MP3 audio first
  const audio = new Audio(mp3Path);
  activeAudioElement = audio;

  let hasFallenBack = false;

  const doFallback = () => {
    if (hasFallenBack) return;
    hasFallenBack = true;
    activeAudioElement = null;
    speakText(fallbackText, onEndCallback);
  };

  audio.onplay = () => {
    currentState = { 
      isSpeaking: true, 
      isPaused: false, 
      currentText: fallbackText,
      activeSource: 'mp3'
    };
    notifyListeners();
  };

  audio.onended = () => {
    activeAudioElement = null;
    currentState = { isSpeaking: false, isPaused: false, currentText: '' };
    notifyListeners();
    if (onEndCallback) onEndCallback();
  };

  audio.onerror = () => {
    // MP3 file not found or couldn't be played -> fallback to TTS
    doFallback();
  };

  audio.play().catch(() => {
    // Autoplay blocked or file missing -> fallback to TTS
    doFallback();
  });
}

export function speakText(text: string, onEndCallback?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any existing speech and ensure synthesis engine is active
  if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.resume();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.98; // natural pace
  utterance.pitch = 0.95; // masculine tone
  utterance.volume = 1.0;

  const doSpeak = () => {
    // Pick specifically a male English voice if available across OS platforms
    const voices = window.speechSynthesis.getVoices();
    const maleKeywords = ['male', 'daniel', 'david', 'alex', 'guy', 'george', 'oliver', 'rishi', 'google uk english male', 'google us english'];
    
    let preferredVoice = voices.find(v => {
      if (!v.lang.startsWith('en')) return false;
      const nameLower = v.name.toLowerCase();
      return maleKeywords.some(kw => nameLower.includes(kw));
    });

    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('female') && !v.name.toLowerCase().includes('zira') && !v.name.toLowerCase().includes('samantha'));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      utterance.pitch = 0.9;
    }

    utterance.onstart = () => {
      currentState = { 
        isSpeaking: true, 
        isPaused: false, 
        currentText: text,
        activeSource: 'tts'
      };
      notifyListeners();
    };

    utterance.onend = () => {
      currentState = { isSpeaking: false, isPaused: false, currentText: '' };
      notifyListeners();
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      currentState = { isSpeaking: false, isPaused: false, currentText: '' };
      notifyListeners();
    };

    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  };

  const existingVoices = window.speechSynthesis.getVoices();
  if (!existingVoices || existingVoices.length === 0) {
    let triggered = false;
    window.speechSynthesis.onvoiceschanged = () => {
      if (!triggered) {
        triggered = true;
        doSpeak();
      }
    };
    setTimeout(() => {
      if (!triggered) {
        triggered = true;
        doSpeak();
      }
    }, 150);
  } else {
    doSpeak();
  }
}

export function speakGreetingAndObjective(careerObjective: string) {
  const mp3Path = '/audio/objective.mp3';
  const greetingText = `Hello and welcome to my portfolio! I am Dhanush Gopi Kavala, a Computer Science Engineering Graduate and MERN Stack Software Engineer. My career objective is: ${careerObjective}`;
  speakAudioOrText(mp3Path, greetingText);
}

export function speakAboutSection() {
  const mp3Path = '/audio/about.mp3';
  const text = `Dhanush Gopi Kavala graduated in Computer Science Engineering from Sri Vasavi Engineering College with a CGPA of 9.04. He served as Class Representative for 3 years leading 60 plus students and co-authored a published IEEE research paper on YOLO-v9 object detection.`;
  speakAudioOrText(mp3Path, text);
}

export function speakInternshipSection() {
  const mp3Path = '/audio/internship.mp3';
  const text = `At Codec Technologies as a MERN Stack Developer Intern, Dhanush engineered robust REST APIs with Express.js, built JWT authentication middleware, optimized MongoDB schemas, and integrated React interfaces during agile sprints.`;
  speakAudioOrText(mp3Path, text);
}

export function speakProjectExplanation(projectTitle: string, spokenSummary: string, projectId?: string) {
  const mp3Path = projectId ? `/audio/${projectId}.mp3` : `/audio/project.mp3`;
  const narration = `Here is an overview for ${projectTitle}. ${spokenSummary}`;
  speakAudioOrText(mp3Path, narration);
}
