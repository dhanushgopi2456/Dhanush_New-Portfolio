import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Check, Copy, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleApplyTemplate = (templateText: string) => {
    setFormData(prev => ({
      ...prev,
      message: templateText
    }));
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct mailto link
    const mailtoUrl = `mailto:${RESUME_DATA.personal.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nSender Email: ' + formData.email)}`;
    window.open(mailtoUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <br />
            <span className="gradient-text">Exceptional Together</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Open for Full Stack Software Engineer roles, MERN opportunities, and AI research collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-bold text-white mt-0.5">{RESUME_DATA.personal.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Direct Line</p>
                  <p className="text-sm font-bold text-white mt-0.5">{RESUME_DATA.personal.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Current Location</p>
                <p className="text-sm font-bold text-white mt-0.5">{RESUME_DATA.personal.location}</p>
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={RESUME_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={RESUME_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-all hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Network</span>
              </a>
            </div>

          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 relative">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span>Send Direct Message</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Submitting opens a pre-filled direct mail draft to Dhanush Gopi Kavala.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@techcompany.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-slate-400">Message / Opportunity Details</label>
                  <span className="text-[10px] text-slate-500 font-mono">Quick Preset Templates:</span>
                </div>

                {/* Quick Preset Template Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate("Hi Dhanush, we reviewed your portfolio and would like to invite you for an interview for a Software Engineer (MERN / Full Stack) position.")}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-mono transition-all"
                  >
                    💼 Hiring Interview Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate("Hi Dhanush, I have an exciting web app project and would love to collaborate with you on MERN development.")}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono transition-all"
                  >
                    🚀 Freelance / Project Collaboration
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate("Hello Dhanush, I read your IEEE research paper on YOLOv9 object detection and wanted to discuss AI vision models.")}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono transition-all"
                  >
                    🔬 AI Research / Paper Discussion
                  </button>
                </div>

                <textarea
                  required
                  rows={4}
                  placeholder="Hi Dhanush, we saw your portfolio and would love to discuss a Full Stack role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Email</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-center">
                  Email client launched! Dhanush will respond promptly.
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
