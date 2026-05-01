'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { milestones } from '@/lib/data';
import { EASE_OUT } from '@/lib/constants';

export default function WhatsNext() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fffcf5 0%, #fff5f5 50%, #fffcf5 100%)' }}
    >
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20 pointer-events-none -z-10" style={{ background: '#fda4af', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-15 pointer-events-none -z-10" style={{ background: '#d4af37', filter: 'blur(100px)' }} />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#d4af37' }}>
            The journey
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-4" style={{ color: '#e63946' }}>
            What&apos;s Next
          </h2>
          <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: '#d4af37' }} />
          <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed mb-14">
            One chapter closed, a lifetime of chapters to go.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch justify-center">
          {milestones.map(({ icon: Icon, color, bg, label, date, note, done }, i) => (
            <React.Fragment key={label}>
              <motion.div
                className="flex flex-col items-center text-center px-4 py-8 rounded-2xl flex-1"
                style={{ background: bg, border: `1px solid ${color}22` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: EASE_OUT }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 relative flex-shrink-0"
                  style={{ background: `${color}18`, border: `1.5px solid ${color}40` }}
                >
                  <Icon size={24} color={color} />
                  {done && (
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: '#22c55e' }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <p className="font-serif font-bold text-base mb-1" style={{ color: done ? color : '#9ca3af' }}>
                  {label}
                </p>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: done ? color : '#d1d5db' }}>
                  {date}
                </p>
                <p className="font-sans text-gray-400 italic text-xs">{note}</p>
              </motion.div>

              {i < milestones.length - 1 && (
                <motion.div
                  className="w-0.5 h-8 md:w-8 md:h-0.5 flex-shrink-0 self-center"
                  style={{ background: 'linear-gradient(180deg, #fda4af, #fde68a)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
