'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormState('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const inputBase =
    'w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 text-sm font-light leading-relaxed focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all duration-300';
  const labelBase =
    'block text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-2';
  const errorBase = 'mt-1.5 text-xs font-mono text-red-400';

  const fadeUp = {
    initial: shouldReduceMotion ? undefined : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-[#121212] py-32 px-6 md:px-16 lg:px-24 border-t border-white/5 relative overflow-hidden"
    >
      {/* Subtle radial glow — reuses existing portfolio glow language */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Section label */}
        <motion.div
          {...fadeUp}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
          className="mb-20"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-gray-500 uppercase block mb-4">
            GET IN TOUCH // CONTACT
          </span>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT COLUMN ─────────────────────────────────── */}
          <motion.div
            {...fadeUp}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
            className="flex flex-col gap-10"
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-gray-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              Available for new opportunities
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
                Let&apos;s build<br />
                something<br />
                <span className="text-gray-400">extraordinary.</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 font-light leading-relaxed max-w-md text-base md:text-lg">
              Whether you have a question, a project idea, or an opportunity
              you&apos;d like to discuss, feel free to reach out.
            </p>

            {/* Email card */}
            <a
              href="mailto:puttabanthi.akhil@gmail.com"
              className="group flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              aria-label="Send email to puttabanthi.akhil@gmail.com"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300 shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div>
                <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-0.5">
                  Email me
                </p>
                <p className="text-white text-sm font-medium group-hover:text-gray-200 transition-colors">
                  puttabanthi.akhil@gmail.com
                </p>
              </div>
            </a>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/akhil-puttabanthi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-mono tracking-widest uppercase"
              >
                <FaLinkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://github.com/akhil442/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-mono tracking-widest uppercase"
              >
                <FaGithub size={16} />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — FORM ──────────────────────────── */}
          <motion.div
            {...fadeUp}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-16 px-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setFormState('idle')}
                  className="px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-200"
                >
                  Send another
                </button>
              </div>
            ) : (
              /* Netlify-compatible form — hidden input declares form to Netlify build bot */
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                {/* Netlify required hidden inputs */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden aria-hidden="true">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className={labelBase}>
                    Full Name <span className="text-gray-600 ml-1">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.name ? 'border-red-400/50' : ''}`}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="error-name" className={errorBase} role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contact-email" className={labelBase}>
                    Email Address <span className="text-gray-600 ml-1">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.email ? 'border-red-400/50' : ''}`}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="error-email" className={errorBase} role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className={labelBase}>
                    Subject <span className="text-gray-600 ml-1">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.subject ? 'border-red-400/50' : ''}`}
                    aria-describedby={errors.subject ? 'error-subject' : undefined}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p id="error-subject" className={errorBase} role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelBase}>
                    Message <span className="text-gray-600 ml-1">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me a little about your project or opportunity..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none ${errors.message ? 'border-red-400/50' : ''}`}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="error-message" className={errorBase} role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {formState === 'error' && (
                  <p className="text-xs font-mono text-red-400 text-center" role="alert">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="mt-2 w-full py-4 px-8 rounded-full bg-white text-black text-xs font-mono tracking-widest uppercase font-bold hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {formState === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
