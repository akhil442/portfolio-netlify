'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Overlay from './Overlay';
import dynamic from 'next/dynamic';

// Dynamically import the 3D canvas — SSR must be off for WebGL
const AIBotCanvas = dynamic(() => import('./AIBotCanvas'), { ssr: false });

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dark gradient background behind the 3D scene */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0d1b2e] via-[#080f1a] to-[#121212]" />

        {/* 3D AI bot */}
        <AIBotCanvas />

        {/* Text overlay */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
