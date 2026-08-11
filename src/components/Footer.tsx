'use client';

import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] py-16 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Name & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Akhil Puttabanthi</h3>
          <p className="text-sm text-gray-500 font-mono tracking-widest uppercase">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-10">
          <a 
            href="mailto:puttabanthi.akhil@gmail.com"
            className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/akhil-puttabanthi-a06383211"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0A66C2] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://github.com/akhil442"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}
