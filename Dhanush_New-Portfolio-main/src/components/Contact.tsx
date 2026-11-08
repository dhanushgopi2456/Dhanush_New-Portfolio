import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Check, Copy, MessageSquare, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Mouse tracking for card spotlights
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(cardId);
  };

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
    <section id="contact" className="py-24 relative z-10 border-t border-white/10 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered 3D Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/20">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Build Something <br />
            <span className="liquid-gradient-text">Exceptional Together</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Open for Full Stack Software Engineer roles, MERN opportunities, and AI research collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with 360 Laser Border & Cursor Spotlight */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseMove={(e) => handleMouseMove(e, 'email')}
              onMouseLeave={() => setHoveredCard(null)}
              className="glass-card p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
            >
              <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#06b6d4_120deg,#6366f1_180deg,#ec4899_240deg,transparent_300deg)] opacity-30 group-hover:opacity-75 transition-opacity" />
              </div>

              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: hoveredCard === 'email' ? 1 : 0,
                  background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(6, 182, 212, 0.22), transparent 70%)`,
                }}
              />

              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Email Address</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">{RESUME_DATA.personal.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(RESUME_DATA.personal.email, 'email')}
                className="relative overflow-hidden group p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700/80 z-10 transition-colors shadow-md"
                title="Copy Email"
              >
                <ButtonGlare radius={12} intensity={0.4} />
                <span className="relative z-10">
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </span>
              </button>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onMouseMove={(e) => handleMouseMove(e, 'phone')}
              onMouseLeave={() => setHoveredCard(null)}
              className="glass-card p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors"
            >
              <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#a855f7_120deg,#ec4899_180deg,#3b82f6_240deg,transparent_300deg)] opacity-30 group-hover:opacity-75 transition-opacity" />
              </div>

              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: hoveredCard === 'phone' ? 1 : 0,
                  background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(168, 85, 247, 0.22), transparent 70%)`,
                }}
              />

              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Direct Line</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">{RESUME_DATA.personal.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(RESUME_DATA.personal.phone, 'phone')}
                className="relative overflow-hidden group p-3 rounded-xl bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700/80 z-10 transition-colors shadow-md"
                title="Copy Phone"
              >
                <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.7, g: 0.3, b: 0.9, a: 1 }} />
                <span className="relative z-10">
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </span>
              </button>
            </motion.div>

            {/* Location Card */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseMove={(e) => handleMouseMove(e, 'location')}
              onMouseLeave={() => setHoveredCard(null)}
              className="glass-card p-6 rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: hoveredCard === 'location' ? 1 : 0,
                  background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(16, 185, 129, 0.22), transparent 70%)`,
                }}
              />

              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md relative z-10">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Current Location</p>
                <p className="text-sm font-extrabold text-white mt-0.5">{RESUME_DATA.personal.location}</p>
              </div>
            </motion.div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={RESUME_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden group flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <ButtonGlare radius={16} intensity={0.4} frontColor={{ r: 0.2, g: 0.8, b: 0.9, a: 1 }} />
                <span className="relative z-10 flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>GitHub Profile</span>
                </span>
              </a>

              <a
                href={RESUME_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden group flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <ButtonGlare radius={16} intensity={0.4} frontColor={{ r: 0.2, g: 0.6, b: 1, a: 1 }} />
                <span className="relative z-10 flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn Network</span>
                </span>
              </a>
            </div>

          </div>

          {/* Interactive Form with Frosted Glass & Laser Border */}
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => handleMouseMove(e, 'form')}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:col-span-7 glass-panel p-8 sm:p-9 rounded-[32px] border border-white/10 relative shadow-2xl overflow-hidden group transform-gpu"
          >
            {/* 360 Continuous Laser Border Beam */}
            <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
              <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#06b6d4_180deg,#ec4899_240deg,transparent_300deg)] opacity-35 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Cursor-tracked internal radial spotlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
              style={{
                opacity: hoveredCard === 'form' ? 1 : 0,
                background: `radial-gradient(450px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(99, 102, 241, 0.2), transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Send Direct Message</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Submitting opens a pre-filled direct mail draft directly to Dhanush Gopi Kavala.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 shadow-inner font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 font-bold">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@techcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 shadow-inner font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono text-slate-400 font-bold">Opportunity Details / Message</label>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">Quick Templates:</span>
                  </div>

                  {/* Quick Preset Template Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <button
                      type="button"
                      onClick={() => handleApplyTemplate("Hi Dhanush, we reviewed your portfolio and would like to invite you for an interview for a Software Engineer (MERN / Full Stack) position.")}
                      className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono transition-all font-semibold"
                    >
                      <ButtonGlare radius={12} intensity={0.3} frontColor={{ r: 0.1, g: 0.7, b: 0.9, a: 1 }} />
                      <span className="relative z-10">💼 Hiring Interview Inquiry</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyTemplate("Hi Dhanush, I have an exciting web app project and would love to collaborate with you on MERN development.")}
                      className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono transition-all font-semibold"
                    >
                      <ButtonGlare radius={12} intensity={0.3} frontColor={{ r: 0.7, g: 0.3, b: 0.9, a: 1 }} />
                      <span className="relative z-10">🚀 Project Collaboration</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyTemplate("Hello Dhanush, I read your IEEE research paper on YOLOv9 object detection and wanted to discuss AI vision models.")}
                      className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono transition-all font-semibold"
                    >
                      <ButtonGlare radius={12} intensity={0.3} frontColor={{ r: 0.9, g: 0.6, b: 0.1, a: 1 }} />
                      <span className="relative z-10">🔬 AI Vision Discussion</span>
                    </button>
                  </div>

                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Dhanush, we saw your portfolio and would love to discuss a Full Stack role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 shadow-inner font-mono leading-relaxed"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative overflow-hidden group w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all border border-blue-400/30"
                >
                  <ButtonGlare radius={16} intensity={0.6} frontColor={{ r: 0.4, g: 0.6, b: 1, a: 1 }} />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Direct Email</span>
                  </span>
                </motion.button>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center shadow-lg">
                    Email client launched! Dhanush will respond promptly.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
