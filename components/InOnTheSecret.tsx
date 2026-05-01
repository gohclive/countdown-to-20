'use client';

import { motion } from 'framer-motion';
import { checklistItems } from '@/lib/data';
import { EASE_OUT } from '@/lib/constants';

export default function InOnTheSecret() {
  return (
    <section className="pt-24 pb-12 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fffcf5 0%, #fff0f0 50%, #fffcf5 100%)' }}>
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
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-4" style={{ color: '#e63946' }}>
            She Said Yes! 💍
          </h2>
          <div className="w-24 h-1 mx-auto mb-4" style={{ background: '#d4af37' }} />
          <p className="font-sans text-gray-500 italic text-sm tracking-wide">
            April 20, 2026 — it happened, perfectly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-0 items-stretch">

          {/* The Letter */}
          <motion.div
            className="relative rounded-2xl p-8 shadow-lg flex flex-col"
            style={{
              background: '#fffef8',
              border: '1px solid #f3e8c8',
              transform: 'rotate(-0.5deg)',
            }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          >
            <div className="w-full h-0.5 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            <p className="font-serif italic text-gray-700 text-lg mb-4">
              To the people Charlene loves most,
            </p>
            <div className="font-sans text-gray-600 text-sm leading-relaxed space-y-3 flex-1">
              <p>
                On <strong>April 20, 2026</strong>, I asked Charlene to marry me — at the
                <strong> Keukenhof Gardens in Amsterdam</strong>, surrounded by millions of blooming tulips and a whole lot of happy tears.
              </p>
              <p>
                She said <strong>yes</strong>. YAYYYYYY!!!!
              </p>
              <p>
                Everything went smooth smooth and steady. Thank you all for keeping the secret and for all your love and support!! — Guan Yin Ma really did 保佑, it rained right after our photoshoot.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="font-serif italic text-gray-500 text-sm text-right">
                — Newly Engaged, Clive 🌷
              </p>
            </div>
            {/* Corner paper fold effect */}
            <div className="absolute bottom-0 right-0 w-8 h-8" style={{
              background: 'linear-gradient(225deg, #f3e8c8 50%, transparent 50%)',
              borderBottomRightRadius: '1rem',
            }} />
          </motion.div>

          {/* Operation Yes Please checklist */}
          <motion.div
            className="relative rounded-2xl p-8 shadow-lg overflow-hidden"
            style={{
              background: '#fffef8',
              border: '1px solid #f3e8c8',
              transform: 'rotate(0.3deg)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
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

          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {checklistItems.map((item, i) => (
              <motion.li
                key={item.label}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE_OUT }}
              >
                <motion.span
                  className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: '#22c55e' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.55 + i * 0.1 }}
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

      </div>
    </section>
  );
}
