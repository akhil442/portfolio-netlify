'use client';

import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

type SocialIcon = React.ComponentType<{ size?: number; className?: string }>;

const socialLinks: { id: string; label: string; href: string; icon: SocialIcon; external: boolean }[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akhil-puttabanthi/',
    icon: FaLinkedin as SocialIcon,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/akhil442',
    icon: FaGithub as SocialIcon,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:puttabanthi.akhil@gmail.com',
    icon: FaEnvelope as SocialIcon,
    external: false,
  },
];

export default function SocialRail() {
  return (
    <nav
      aria-label="Social links"
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4 hidden sm:flex"
    >
      {/* Decorative line above */}
      <div className="w-[1px] h-12 bg-white/10" />

      {socialLinks.map(({ id, label, href, icon: Icon, external }) => (
        <a
          key={id}
          id={`social-${id}`}
          href={href}
          aria-label={label}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Icon size={18} />
        </a>
      ))}

      {/* Decorative line below */}
      <div className="w-[1px] h-12 bg-white/10" />
    </nav>
  );
}
