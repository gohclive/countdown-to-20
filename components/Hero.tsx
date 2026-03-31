'use client';

import { motion } from 'framer-motion';
import Countdown from './Countdown';
import SaveToCalendar from './SaveToCalendar';

export default function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 px-6 max-w-4xl"
      >
        <motion.h1
          className="text-5xl md:text-8xl font-serif font-bold text-[#e63946] mb-4 drop-shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          A Beautiful Beginning
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl font-serif italic text-gray-700 mb-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Save the Date: April 20, 2026
        </motion.p>

        <div className="mb-12">
          <Countdown />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <SaveToCalendar />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 border-[1px] border-gold-200 rounded-full opacity-20 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 border-[1px] border-gold-200 rounded-full opacity-20 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </section>
  );
}
