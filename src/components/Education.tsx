'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const educationData = [
  {
    id: 'ms-ds',
    degree: 'Master of Science in Data Science',
    institution: 'University of New Haven',
    dates: '2024 — 2026',
    cgpa: '3.7 / 4.0',
    location: 'West Haven, CT, USA',
  },
  {
    id: 'btech-cse',
    degree: 'Bachelor of Technology in Computer Science Engineering',
    institution: 'CVR College of Engineering',
    dates: '2020 — 2024',
    cgpa: '9.0 / 10',
    location: 'Hyderabad, India',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      aria-label="Education"
      className="bg-[#121212] py-32 px-6 md:px-16 lg:px-24 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
          className="mb-20 text-left"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-gray-500 uppercase block mb-4">
            ACADEMIC BACKGROUND // EDUCATION
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            EDUCATION
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl leading-relaxed text-balance">
            Grounded in computer science fundamentals, advancing through data science at the graduate level.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10">

          {/* Static axis line */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Animated glowing line */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-white via-gray-300 to-white/30 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(255,255,255,0.6)]"
              style={{ scaleY }}
            />
          )}

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.12,
                  ease: 'easeOut',
                }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[1.625rem] md:-left-[2.125rem] top-7 w-4 h-4 rounded-full border-2 bg-[#121212] border-gray-500 group-hover:border-white group-hover:ring-4 group-hover:ring-white/20 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 z-10" />

                {/* Card */}
                <div className="rounded-2xl border bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-md transition-all duration-500 overflow-hidden">
                  <div className="p-6 md:p-8">

                    {/* Dates & Location row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.dates}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Degree & Institution */}
                    <div className="mb-5">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1 text-balance">
                        {item.degree}
                      </h3>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="text-lg font-medium text-gray-300">{item.institution}</span>
                      </div>
                    </div>

                    {/* CGPA badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-300">
                      <span className="text-gray-500 uppercase tracking-widest text-xs">CGPA</span>
                      <span className="font-bold text-white">{item.cgpa}</span>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
