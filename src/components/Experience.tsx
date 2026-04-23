'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Download, Terminal, Database, Brain } from 'lucide-react';

const marqueeItems = [
  'Python', 'Pandas', 'NumPy', 'SQL', 'PostgreSQL', 'MySQL', 'BigQuery',
  'PyTorch', 'AWS', 'Azure', 'Streamlit', 'Power BI', 'Excel', 'QuickSight',
  'Kafka', 'Spark', 'FastAPI', 'Docker', 'Prometheus', 'Grafana'
];

const leadership = [
  {
    role: 'Founder',
    organization: 'Coding Club under CSI',
    description: 'Organized peer learning sessions and technical workshops to foster a community of learning and development.',
    year: '2022'
  },
  {
    role: 'Volunteer',
    organization: 'IEEE Student Chapter',
    description: 'Supported academic and technical events, ensuring smooth operations and successful outcomes.',
    year: '2023'
  },
  {
    role: 'Lead',
    organization: 'Sustainability Initiative',
    description: 'Led a sustainability initiative including a 5K run promoting plastic-ban awareness.',
    year: '2023'
  }
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="bg-[#121212] overflow-hidden">
      
      {/* Infinite Marquee */}
      <div className="relative border-y border-white/5 py-6 flex overflow-hidden whitespace-nowrap bg-white/[0.02]">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex gap-16 px-8 items-center"
        >
          {/* Double the array for seamless loop */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="text-gray-500 font-mono text-sm tracking-widest uppercase flex items-center gap-16">
              {item}
              <span className="text-white/20">/</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-24 py-32">
        {/* Bento Box Skills */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm tracking-[0.2em] text-gray-500 uppercase mb-4 font-mono">Expertise</h2>
              <p className="text-3xl md:text-5xl text-white font-bold tracking-tight max-w-2xl text-balance">
                Specialized in building data ecosystems and intelligent models.
              </p>
            </div>
            <a 
              href="https://akhil442.github.io/Akhil_Puttabanthi_full_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1: Data Engineering */}
            <div className="md:col-span-2 p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Database className="w-10 h-10 text-gray-400 mb-8 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Data Engineering & Cloud</h3>
              <p className="text-gray-400 leading-relaxed max-w-md relative z-10">
                Architecting real-time pipelines and cloud infrastructure using Kafka, Spark, AWS, and Azure. Building robust systems that scale seamlessly.
              </p>
            </div>

            {/* Bento 2: Data Analytics */}
            <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-bl from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Terminal className="w-10 h-10 text-gray-400 mb-8 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Data Analytics</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">
                Transforming raw data into actionable insights through advanced SQL, Power BI, and precise KPIs.
              </p>
            </div>

            {/* Bento 3: Machine Learning */}
            <div className="md:col-span-3 p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Brain className="w-16 h-16 text-gray-400 shrink-0 relative z-10" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Machine Learning & AI</h3>
                <p className="text-gray-400 leading-relaxed text-lg max-w-3xl">
                  Deploying predictive models, fine-tuning deep learning networks, and establishing RAG evaluation workflows. Turning complex algorithms into practical business solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing Timeline */}
        <div ref={timelineRef} className="relative">
          <h2 className="text-sm tracking-[0.2em] text-gray-500 uppercase mb-24 font-mono text-center">Leadership & Impact</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
            <motion.div 
              className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ scaleY: pathLength }}
            />

            {leadership.map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between mb-24 w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-[1.5rem] md:left-1/2 w-4 h-4 rounded-full bg-[#121212] border-2 border-gray-600 -translate-x-1/2 z-10" />
                
                <div className="hidden md:block w-5/12" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full pl-16 md:pl-0 md:w-5/12"
                >
                  <div className={`p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-xs font-mono text-gray-500 mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                    <h4 className="text-gray-400 font-medium mb-4">{item.organization}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
