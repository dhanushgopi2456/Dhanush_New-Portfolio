import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { GraduationCap, Code2, Award, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const paragraphText =
    "Results-driven Computer Science graduate and Software Engineer specializing in Full Stack MERN development and AI computer vision. With a 9.04 CGPA and 900+ algorithmic problems solved across LeetCode, GeeksforGeeks, and Code360, i focus on building scalable web applications, robust REST APIs, and high-performance intelligent systems. Let's build something incredible together!";

  const metrics = [
    { label: 'B.Tech CGPA', value: '9.04', desc: 'Sri Vasavi Engg College', icon: GraduationCap, color: 'text-cyan-400' },
    { label: 'DSA Solved', value: '900+', desc: 'LeetCode, GFG, Code360', icon: Code2, color: 'text-amber-400' },
    { label: 'Certifications', value: '6', desc: 'Oracle, Azure, ServiceNow', icon: Award, color: 'text-purple-400' },
    { label: 'Research Paper', value: 'AIDE-2024', desc: 'Published IEEE Conf.', icon: BookOpen, color: 'text-emerald-400' },
  ];

  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 select-none"
    >
      {/* Decorative 3D Corner Object 1: Top-Left (Moon icon) */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Decorative 3D Corner Object 2: Bottom-Left (3D object) */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Floating Shape"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Decorative 3D Corner Object 3: Top-Right (Lego icon) */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Decorative 3D Corner Object 4: Bottom-Right (3D group) */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Element"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph with character-by-character scroll opacity */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText text={paragraphText} />
        </div>

        {/* Dynamic Metric Badges */}
        <FadeIn delay={0.2} y={30} className="w-full mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:border-white/20 transition-all"
                >
                  <Icon className={`w-5 h-5 mb-2 ${m.color}`} />
                  <span className="text-xl sm:text-2xl font-black text-white tracking-tight">{m.value}</span>
                  <span className="text-xs font-medium text-[#D7E2EA] uppercase tracking-wider mt-0.5">{m.label}</span>
                  <span className="text-[10px] text-[#D7E2EA]/50 tracking-wide mt-1">{m.desc}</span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Contact Button */}
        <div className="mt-14 sm:mt-18 md:mt-20">
          <FadeIn delay={0.3} y={20}>
            <ContactButton href="#contact" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
