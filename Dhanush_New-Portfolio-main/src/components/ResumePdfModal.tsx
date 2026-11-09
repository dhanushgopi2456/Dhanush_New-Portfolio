import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Printer, Download, Copy, Check, FileText } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

interface ResumePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePdfModal: React.FC<ResumePdfModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedResumeText = `
================================================================================
                         DHANUSH GOPI KAVALA
Email: ${RESUME_DATA.personal.email} | Mobile: ${RESUME_DATA.personal.phone}
Location: ${RESUME_DATA.personal.location}
GitHub: ${RESUME_DATA.personal.github}
LinkedIn: ${RESUME_DATA.personal.linkedin}
Portfolio: ${RESUME_DATA.personal.portfolio}
================================================================================

PROFESSIONAL SUMMARY
--------------------
${RESUME_DATA.personal.summary}

ACADEMIC HIGHLIGHTS
-------------------
• B.Tech in Computer Science & Engineering | CGPA: 9.04/10 (82.88%)
  Sri Vasavi Engineering College (Nov 2022 - July 2026)
• Senior Secondary (Intermediate - MPC) | Percentage: 96%
  Sri Chaitanya Junior College (June 2020 - March 2022)
• Secondary Education (Matriculation) | Percentage: 99%
  Sri Shiridi Sai EM High School (March 2020)

TECHNICAL SKILLS
----------------
• Languages: Core Java, Python, C++, JavaScript (ES6+)
  CS Core: Data Structures, Algorithms, OOP, DBMS, Computer Networks, OS
• Frontend: React.js, Tailwind CSS, HTML5, CSS3, Vite
• Backend: Node.js, Express.js, REST APIs, JWT Authentication, Spring Boot (Basics), Flask
• Databases: MongoDB, Mongoose ORM, MySQL
• AI & Computer Vision: YOLOv9 Object Detection, PyTorch, OpenCV, NumPy
• Tools & Platforms: Git, GitHub, Postman, Vercel

INTERNSHIP EXPERIENCE
---------------------
Codec Technologies Pvt. Ltd. | MERN Stack Developer | Remote
Jan 2026 - Mar 2026
• Engineered and deployed scalable MERN web applications with Tailwind CSS.
• Designed secure RESTful APIs with JWT Authentication under Agile methodologies.
• Developed custom Express middleware for request token validation and payload sanitization.

KEY PROJECTS
------------
1. FreshMart Full-Stack Grocery Web App (MERN & Admin Dashboard)
   Tech: React, Node.js, Express.js, MongoDB, JWT Auth, Tailwind CSS
   - Full-stack e-commerce web app with JWT authentication & admin control panel.
   - Designed modular RESTful APIs for user, product, and shopping cart management.

2. Team Task Manager (Collaborative Board with Role-Based Access Control)
   Tech: React.js, Node.js, Express.js, MongoDB, Mongoose, JWT
   - Architected collaborative task manager with Role-Based Access Controls (RBAC).
   - Responsive UI with real-time state updates and custom Mongoose schemas.

3. Object Detection using YOLO-v9 (AI Vision Pipeline & Flask Web Inference)
   Tech: Python, PyTorch, OpenCV, NumPy, Flask, YOLOv9
   - End-to-end computer vision pipeline using YOLOv9 with PyTorch and OpenCV.
   - Deployed trained deep learning model as Flask web app for media inference.

RESEARCH PAPER & LEADERSHIP
---------------------------
• Published Research Paper: Object Detection using YOLOv9
  Published at International Conference AIDE-2024 (IEEE Format).
• Class Representative (Leading 60+ Students): Jan 2023 - Jan 2026
  Elected student liaison for academic planning, workshops, and department ops.
• Anti-Ragging & Student Welfare Committee Member: Aug 2024 - Jan 2026
  Promoted campus safety, student welfare, and anti-harassment policies.

VERIFIED CERTIFICATIONS
-----------------------
• Salesforce Agentforce Specialist (Dec 2025)
• ServiceNow Certified System Administrator - CSA (Sep 2025)
• ServiceNow Certified Application Developer - CAD (Oct 2025)
• Oracle Cloud Infrastructure 2025 DevOps Professional (July 2025)
• Microsoft Azure AI Fundamentals - AI-900 (May 2024)
• NPTEL Data Structures & Algorithms using Java (Oct 2024)
================================================================================
  `.trim();

  const handleDownloadFile = () => {
    setDownloading(true);
    const blob = new Blob([formattedResumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dhanush_Gopi_Kavala_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1500);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume-area, #printable-resume-area * {
            visibility: visible;
            color: black !important;
            background: white !important;
          }
          #printable-resume-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="bg-slate-900 border border-white/10 rounded-[32px] max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden backdrop-blur-2xl"
      >
        {/* Header Bar */}
        <div className="p-3.5 sm:p-6 border-b border-white/10 flex flex-col md:flex-row gap-3 md:items-center justify-between bg-slate-950/70 no-print">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-600/20 shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm sm:text-lg leading-tight">Dhanush Gopi Kavala - Official Resume</h3>
                <p className="text-[11px] sm:text-xs font-mono text-cyan-400">ATS-Optimized Printable Format</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 ml-2 cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleCopyText}
              className="relative overflow-hidden group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700 cursor-pointer"
            >
              <ButtonGlare radius={12} intensity={0.3} />
              <span className="relative z-10 flex items-center gap-1.5">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="relative overflow-hidden group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.1, g: 0.8, b: 0.6, a: 1 }} />
              <span className="relative z-10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{downloading ? 'Downloading...' : 'Download'}</span>
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="relative overflow-hidden group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30 cursor-pointer"
            >
              <ButtonGlare radius={12} intensity={0.5} frontColor={{ r: 0.3, g: 0.6, b: 1, a: 1 }} />
              <span className="relative z-10 flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </span>
            </button>

            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="hidden md:flex relative overflow-hidden group p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white ml-2 transition-colors cursor-pointer"
              title="Close Modal"
            >
              <ButtonGlare radius={12} intensity={0.3} />
              <span className="relative z-10">
                <X className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div 
          id="printable-resume-area" 
          className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950 text-slate-200 space-y-6 text-sm"
        >
          {/* Header */}
          <div className="border-b border-slate-800 pb-4 text-center">
            <h1 className="text-2xl font-extrabold text-white tracking-wider">DHANUSH GOPI KAVALA</h1>
            <p className="text-xs text-cyan-400 font-mono mt-1">
              {RESUME_DATA.personal.email} | {RESUME_DATA.personal.phone} | {RESUME_DATA.personal.location}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              GitHub: github.com/dhanushgopi2456 | LinkedIn: linkedin.com/in/dhanush-gopi-kavala
            </p>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {RESUME_DATA.personal.summary}
            </p>
          </div>

          {/* Academic Highlights */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              EDUCATION & ACADEMICS
            </h2>
            <div className="space-y-2">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <p className="font-bold text-white">{edu.institution} - {edu.location}</p>
                    <p className="text-slate-300">{edu.degree}</p>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <p className="text-cyan-300 font-bold">{edu.score}</p>
                    <p className="text-slate-400">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              TECHNICAL SKILLS
            </h2>
            <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
              <li><strong className="text-white">Programming Languages:</strong> Core Java, Python, C++, JavaScript (ES6+)</li>
              <li><strong className="text-white">CS Fundamentals:</strong> Data Structures & Algorithms, Object Oriented Programming (OOP), DBMS</li>
              <li><strong className="text-white">Frontend:</strong> HTML5, CSS3, Tailwind CSS, JavaScript, React.js, Vite</li>
              <li><strong className="text-white">Backend:</strong> Node.js, Express.js, REST APIs, JWT Authentication, Spring Boot (Basics), Flask</li>
              <li><strong className="text-white">Databases:</strong> MongoDB, Mongoose, MySQL</li>
              <li><strong className="text-white">AI / ML:</strong> YOLOv9 Object Detection, PyTorch, OpenCV, NumPy</li>
              <li><strong className="text-white">Tools:</strong> Git, GitHub, Postman, CI/CD, Vercel</li>
            </ul>
          </div>

          {/* Internship Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              INTERNSHIP EXPERIENCE
            </h2>
            {RESUME_DATA.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-bold text-xs">
                  <span className="text-white">{exp.company} - {exp.role}</span>
                  <span className="font-mono text-slate-400">{exp.period}</span>
                </div>
                <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">{proj.title} [{proj.techStack.join(', ')}]</span>
                    <span className="font-mono text-slate-400">{proj.date}</span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                    {proj.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx}>{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Leadership */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              RESEARCH PAPER & LEADERSHIP
            </h2>
            <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
              {RESUME_DATA.achievements.map((ach, idx) => (
                <li key={idx}>
                  <strong className="text-white">{ach.title}:</strong> {ach.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 border-b border-slate-800/80 pb-1">
              INDUSTRY CERTIFICATIONS
            </h2>
            <p className="text-xs text-slate-300">
              Salesforce Agentforce Specialist (Dec 2025) • ServiceNow CSA & CAD (2025) • Oracle Cloud Infrastructure DevOps (July 2025) • Microsoft Azure AI-900 (May 2024) • NPTEL DSA Java (Oct 2024)
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
