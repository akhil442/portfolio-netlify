'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ExternalLink, ChevronDown, MapPin, Calendar, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { experiencesData, ExperienceItem } from '@/data/experienceData';

export default function ProfessionalJourney() {
  // Expand first card by default for immediate recruiter impact, but allow toggling
  const [expandedId, setExpandedId] = useState<string | null>('unh');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      aria-label="Professional Journey"
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
            CAREER TIMELINE // IMPACT
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            PROFESSIONAL JOURNEY
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl leading-relaxed text-balance">
            Building solutions across data engineering, analytics, machine learning, and AI.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10">
          
          {/* Vertical Timeline Axis Line */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-white/10 -translate-x-1/2" />
          
          {/* Active Animated Timeline Line */}
          {!shouldReduceMotion && (
            <motion.div 
              className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-white via-gray-300 to-white/30 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(255,255,255,0.6)]"
              style={{ scaleY }}
            />
          )}

          {/* Timeline Experience Cards */}
          <div className="space-y-12">
            {experiencesData.map((item: ExperienceItem, idx: number) => {
              const isExpanded = expandedId === item.id;
              const cardId = `exp-details-${item.id}`;
              const buttonId = `exp-btn-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1, ease: 'easeOut' }}
                  className="relative group"
                >
                  {/* Timeline Node Marker */}
                  <div 
                    className={`absolute -left-[1.625rem] md:-left-[2.125rem] top-7 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                      isExpanded 
                        ? 'bg-white border-white ring-4 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
                        : 'bg-[#121212] border-gray-500 group-hover:border-white'
                    }`}
                  />

                  {/* Card Main Wrapper */}
                  <div 
                    className={`rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden ${
                      isExpanded 
                        ? 'bg-white/[0.04] border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20'
                    }`}
                  >
                    <div className="p-6 md:p-8">
                      
                      {/* Top Meta: Dates & Location */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{item.displayDates}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-gray-500" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Job Title & Company */}
                      <div className="mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <a 
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 group/link"
                            aria-label={`${item.company} website (opens in new tab)`}
                          >
                            <span>{item.company}</span>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover/link:text-white transition-colors" />
                          </a>
                        </div>
                      </div>

                      {/* Short Summary */}
                      <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                        {item.shortSummary}
                      </p>

                      {/* Primary Technology Badges */}
                      <div className="flex flex-wrap gap-2 mb-6" aria-label="Primary Technologies">
                        {item.primaryTechnologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 rounded-full border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expand / Collapse Control */}
                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <button
                          id={buttonId}
                          onClick={() => toggleExpand(item.id)}
                          aria-expanded={isExpanded}
                          aria-controls={cardId}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                    </div>

                    {/* Expandable Details Section */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={cardId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-white/10 bg-black/20"
                        >
                          <div className="p-6 md:p-8 space-y-8">
                            
                            {/* Key Achievements */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-mono tracking-wider text-gray-400 uppercase mb-4">
                                <CheckCircle2 className="w-4 h-4 text-gray-300" />
                                <h4>Key Achievements & Contributions</h4>
                              </div>
                              <ul className="space-y-3 pl-1">
                                {item.achievements.map((achievement, aIdx) => (
                                  <li key={aIdx} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-3">
                                    <span className="text-white/40 font-mono text-xs mt-1 shrink-0">0{aIdx + 1}.</span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Full Technologies Grid */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-mono tracking-wider text-gray-400 uppercase mb-3">
                                <Cpu className="w-4 h-4 text-gray-300" />
                                <h4>Technologies & Tools Utilized</h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.allTechnologies.map((tech) => (
                                  <span 
                                    key={tech} 
                                    className="px-3 py-1 text-xs font-mono text-gray-200 bg-white/10 rounded-md border border-white/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Role Areas / Focus Tags */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-mono tracking-wider text-gray-400 uppercase mb-3">
                                <Layers className="w-4 h-4 text-gray-300" />
                                <h4>Role Focus Areas</h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.roleAreas.map((area) => (
                                  <span 
                                    key={area} 
                                    className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/10"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
