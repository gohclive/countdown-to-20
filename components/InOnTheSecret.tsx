'use client';

import { motion } from 'framer-motion';

const checklistItems = [
  { icon: '💍', label: 'The Ring', note: 'sourced, sized, and secured' },
  { icon: '🎴', label: 'The Gift (custom Pokémon cards)', note: 'printed and ready to go' },
  { icon: '📸', label: 'The Photographer', note: 'booked and fully briefed' },
  { icon: '👯', label: 'The Best Friend', note: 'locked in and sworn to secrecy' },
  { icon: '💬', label: 'The Proposal Speech', note: 'written and memorising' },
];

export default function InOnTheSecret() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fffcf5 0%, #fff0f0 50%, #fffcf5 100%)' }}>
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-25 pointer-events-none -z-10"
        style={{ background: '#fda4af', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-20 pointer-events-none -z-10"
        style={{ background: '#d4af37', filter: 'blur(80px)' }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-4" style={{ color: '#e63946' }}>
            Psst… You&apos;re In On The Secret
          </h2>
          <div className="w-24 h-1 mx-auto mb-4" style={{ background: '#d4af37' }} />
          <p className="font-sans text-gray-500 italic text-sm tracking-wide">
            You&apos;ve been trusted with something very special.
          </p>
        </motion.div>

        {/* Letter + Checklist grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* The Letter */}
          <motion.div
            className="relative rounded-2xl p-8 shadow-lg"
            style={{
              background: '#fffef8',
              border: '1px solid #f3e8c8',
              transform: 'rotate(-0.5deg)',
            }}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Decorative top line */}
            <div className="w-full h-0.5 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />

            <p className="font-serif italic text-gray-700 text-lg mb-4">
              To the people Charlene loves most,
            </p>
            <div className="font-sans text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                On <strong>April 20, 2026</strong>, I&apos;m going to ask Charlene to marry me — at the
                <strong> Keukenhof Gardens in Amsterdam</strong>, surrounded by millions of blooming tulips and (hopefully)
                a whole lot of happy tears.
              </p>
              <p>
                I&apos;ve been planning this for a while now, and I couldn&apos;t do it without the people who matter most to her.
                Which is exactly why you&apos;re reading this.
              </p>
              <p>
                Hope everything go smooth smooth and steady. Please help me pray for good weather on that day also. Guan Yin Ma 保佑, please please! </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="font-serif italic text-gray-500 text-sm text-right">
                — Your very nervous co-conspirator, Clive🌷
              </p>
            </div>

            {/* Corner paper fold effect */}
            <div className="absolute bottom-0 right-0 w-8 h-8" style={{
              background: 'linear-gradient(225deg, #f3e8c8 50%, transparent 50%)',
              borderBottomRightRadius: '1rem',
            }} />
          </motion.div>

          {/* Checklist */}
          <motion.div
            className="relative rounded-2xl p-8 shadow-lg overflow-hidden"
            style={{
              background: '#fffef8',
              border: '1px solid #f3e8c8',
              transform: 'rotate(0.4deg)',
            }}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {/* CLASSIFIED stamp */}
            <div
              className="absolute top-5 right-5 px-3 py-1 rounded font-sans font-black text-xs tracking-widest uppercase select-none"
              style={{
                color: '#e63946',
                border: '2px solid #e63946',
                opacity: 0.65,
                transform: 'rotate(8deg)',
                letterSpacing: '0.2em',
              }}
            >
              Classified
            </div>

            <h3 className="font-serif font-bold text-2xl mb-1" style={{ color: '#e63946' }}>
              Operation: Yes Please
            </h3>
            <p className="font-sans text-gray-400 text-xs italic mb-6">Mission status: fully operational</p>

            <ul className="space-y-4">
              {checklistItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Checkmark */}
                  <motion.span
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: '#22c55e' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.55 + i * 0.12 }}
                  >
                    ✓
                  </motion.span>

                  <div>
                    <span className="font-sans font-medium text-gray-700">
                      {item.icon} {item.label}
                    </span>
                    <p className="font-sans text-gray-400 italic text-xs mt-0.5">{item.note}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Secret CTA block */}
        <motion.div
          className="text-center rounded-2xl py-10 px-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #fff5f5, #fffcf5)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          {/* Subtle border */}
          <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid #fda4af40', pointerEvents: 'none' }} />

          <p className="font-serif font-bold italic text-3xl md:text-4xl mb-2" style={{ color: '#e63946' }}>
            Do NOT tell Charlene.
          </p>
          <p className="font-sans text-gray-500 text-sm mb-8">
            She has absolutely no idea. Let&apos;s keep it that way.
          </p>

          <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: '#d4af37' }} />

          <p className="font-sans text-gray-600 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Want to write her a message for the big day?{' '}
            <span className="font-semibold" style={{ color: '#e63946' }}>Scroll down to the form below</span>{' '}
            — I&apos;ll collect all your notes and surprise her with them on April 20th. She&apos;s going to love it.
          </p>

          {/* Bouncing arrow */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
