'use client';

import { MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Details() {
  return (
    <section id="details" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center items-center">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 border-2 border-dashed border-[#d4af37]/30 rounded-3xl"
        >
          <div className="flex justify-center mb-6">
            <MapPin className="w-12 h-12 text-[#e63946]" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#e63946] mb-4 uppercase tracking-wider">
            Location
          </h2>
          <p className="text-xl font-serif text-gray-700 italic leading-relaxed">
            Keukenhof Gardens <br />
            Amsterdam
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 border-2 border-dashed border-[#d4af37]/30 rounded-3xl"
        >
          <div className="flex justify-center mb-6">
            <Clock className="w-12 h-12 text-[#e63946]" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#e63946] mb-4 uppercase tracking-wider">
            Time
          </h2>
          <p className="text-xl font-serif text-gray-700 italic leading-relaxed">
            Monday, April 20, 2026 <br />
            10:00 AM Amsterdam Time
          </p>
        </motion.div>
      </div>

      {/* Decorative Tulips (Abstract Shapes) */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#f9c74f] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-[#90be6d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
    </section>
  );
}
