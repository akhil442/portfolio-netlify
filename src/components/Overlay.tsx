'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);

  // Section 3: 50% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.75], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
          Akhil Puttabanthi
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light drop-shadow-md">
          DE | AI & ML | Data Analyst
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-start px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl drop-shadow-lg text-balance">
          I build clean analytics & <span className="text-gray-400">reliable pipelines.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-end px-8 md:px-24 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl drop-shadow-lg text-balance">
          Making decisions easier with <span className="text-gray-400">practical ML.</span>
        </h2>
      </motion.div>
    </div>
  );
}
