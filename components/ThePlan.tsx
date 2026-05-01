'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { timeline } from '@/lib/data';

function StepCard({ item, globalIndex, delay }: {
  item: typeof timeline[0];
  globalIndex: number;
  delay: number;
}) {
  const isLast = globalIndex === timeline.length - 1;
  return (
    <motion.div
      className="group relative flex flex-col items-center text-center p-6 rounded-2xl border h-full transition-shadow duration-300 hover:shadow-md"
      style={{
        background: item.bg,
        borderColor: isLast ? '#fca5a5' : `${item.color}22`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
    >
      {/* Step number badge */}
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm"
        style={{ background: item.color }}
      >
        {globalIndex + 1}
      </span>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3 mt-1 flex-shrink-0"
        style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}40` }}
      >
        <item.icon size={24} color={item.color} />
      </div>

      {/* Time */}
      <span className="text-[10px] font-bold uppercase tracking-widest font-sans mb-1.5" style={{ color: item.color }}>
        {item.time}
      </span>

      {/* Title */}
      <h3
        className="font-serif font-bold leading-snug text-sm"
        style={{ color: isLast ? '#e63946' : '#1f2937' }}
      >
        {item.title}
      </h3>

      {/* Description — always visible on mobile, hover-reveal on desktop */}
      <p className="overflow-hidden text-[10px] font-sans italic text-gray-400 leading-snug mt-1.5
        max-h-12 opacity-100
        md:max-h-0 md:opacity-0 md:group-hover:max-h-12 md:group-hover:opacity-100
        transition-all duration-300">
        {item.description}
      </p>

      {/* Pulse border on final card */}
      {isLast && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#e63946]/25 pointer-events-none"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
}

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <div className="hidden md:flex items-center justify-center text-gray-300 flex-shrink-0 px-0.5 self-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Straight down arrow on the right — connects card 4 (top-right) to card 8 (bottom-right)
function SnakeConnector() {
  return (
    <div className="hidden md:flex justify-end items-center my-1 text-gray-300">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v14M5 13l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function TimelineRow({ items, indices, reversed }: {
  items: typeof timeline;
  indices: number[];
  reversed?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:flex md:items-stretch gap-3 md:gap-0">
      {items.map((item, i) => (
        <React.Fragment key={item.time}>
          <div className="md:flex-1">
            <StepCard item={item} globalIndex={indices[i]} delay={i * 0.08} />
          </div>
          {i < items.length - 1 && <Chevron flip={reversed} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function ThePlan() {
  const mid = Math.ceil(timeline.length / 2);

  return (
    <section id="the-plan" className="pt-12 pb-12 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#e63946] mb-4">The Plan</h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-4" />
          <p className="text-gray-500 font-sans italic text-sm">The morning, exactly as it happened.</p>
        </motion.div>

        {/* Mobile: natural order 1→8 in a 2-col grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {timeline.map((item, i) => (
            <StepCard key={item.time} item={item} globalIndex={i} delay={i * 0.08} />
          ))}
        </div>

        {/* Desktop: snake layout — Steps 1–4 left→right, then 8–5 right→left */}
        <div className="hidden md:block">
          <TimelineRow
            items={timeline.slice(0, mid)}
            indices={timeline.slice(0, mid).map((_, i) => i)}
          />
          <SnakeConnector />
          <TimelineRow
            items={[...timeline.slice(mid)].reverse()}
            indices={[...timeline.slice(mid).map((_, i) => mid + i)].reverse()}
            reversed
          />
        </div>
      </div>
    </section>
  );
}
