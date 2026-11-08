import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Full-Stack MERN Development',
    description:
      'End-to-end web applications engineered with React.js, Node.js, Express.js, and MongoDB, delivering blazing-fast client interfaces and resilient cloud backends.',
  },
  {
    number: '02',
    name: 'REST API & Backend Architecture',
    description:
      'Scalable, modular RESTful APIs with secure JWT authentication, role-based access control (RBAC), custom middleware, and robust MongoDB/Mongoose schemas.',
  },
  {
    number: '03',
    name: 'AI & Computer Vision Solutions',
    description:
      'Real-time object detection and deep learning pipelines with YOLOv9, PyTorch, and OpenCV, packaged with high-performance Flask inference engines.',
  },
  {
    number: '04',
    name: 'Algorithmic Problem Solving & Optimization',
    description:
      'High-efficiency algorithms and database query tuning backed by 900+ competitive programming solutions across LeetCode (1550+ contest rating), GFG, and Code360.',
  },
  {
    number: '05',
    name: 'Modern UI/UX & Responsive Web Design',
    description:
      'Designing conversion-focused, mobile-first web applications using Tailwind CSS, fluid clamp typography, Framer Motion animations, and interactive 3D physics.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full select-none relative z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items */}
        <div className="border-t border-[rgba(12,12,12,0.15)] flex flex-col w-full">
          {SERVICES_DATA.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-10 md:gap-16">
                {/* Number on left */}
                <span
                  className="font-black text-[#0C0C0C] leading-none select-none min-w-[120px] sm:min-w-[160px] md:min-w-[200px]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </span>

                {/* Name + Description stacked on right */}
                <div className="flex flex-col justify-center gap-2 sm:gap-3 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
