import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { Github } from 'lucide-react';

interface Project {
  number: string;
  name: string;
  category: string;
  tech: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveUrl?: string;
  repoUrl: string;
}

const PROJECTS_DATA: Project[] = [
  {
    number: '01',
    name: 'FreshMart Grocery Platform',
    category: 'MERN Stack & JWT',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    col1Img1:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    col1Img2:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800',
    col2Img:
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=1280',
    liveUrl: 'https://fresh-mart-v2.vercel.app',
    repoUrl: 'https://github.com/dhanushgopi2456/FreshMart-v2',
  },
  {
    number: '02',
    name: 'Team Task Manager',
    category: 'Collaborative Kanban & RBAC',
    tech: ['React.js', 'Express.js', 'MongoDB', 'Mongoose', 'Tailwind CSS'],
    col1Img1:
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800',
    col1Img2:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    col2Img:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1280',
    liveUrl: 'https://client-psi-three-59.vercel.app',
    repoUrl: 'https://github.com/dhanushgopi2456/team-task-manager-v2',
  },
  {
    number: '03',
    name: 'YOLO-v9 Vision Pipeline',
    category: 'AI & Real-Time Computer Vision',
    tech: ['YOLOv9', 'PyTorch', 'OpenCV', 'Flask', 'Python'],
    col1Img1:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    col1Img2:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    col2Img:
      'https://images.unsplash.com/photo-1507146426996-ef053888390b?auto=format&fit=crop&q=80&w=1280',
    liveUrl: 'https://github.com/dhanushgopi2456/Object-Detection-using-YOLO-v9',
    repoUrl: 'https://github.com/dhanushgopi2456/Object-Detection-using-YOLO-v9',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32 w-full"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top Row */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="font-light uppercase tracking-wider text-[#D7E2EA]/70 text-xs sm:text-sm">
                ({project.category})
              </span>
              <h3 className="font-medium uppercase text-[#D7E2EA] text-lg sm:text-2xl md:text-3xl tracking-wide">
                {project.name}
              </h3>
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <LiveProjectButton href={project.liveUrl} />
          </div>
        </div>

        {/* Bottom Row - Two column image grid */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full flex-1">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6 justify-between">
            <img
              src={project.col1Img1}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-neutral-900 border border-white/5"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-neutral-900 border border-white/5"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          {/* Right Column (60% width): 1 tall image */}
          <div className="w-full md:w-[60%] flex">
            <img
              src={project.col2Img}
              alt={`${project.name} preview main`}
              loading="lazy"
              className="w-full h-full min-h-[250px] sm:min-h-[320px] md:min-h-[400px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover bg-neutral-900 border border-white/5"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: "Project" (singular) */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-14 sm:mb-20 md:mb-24">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* 3 Stacking Cards */}
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
