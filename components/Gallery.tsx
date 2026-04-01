'use client';

import { motion } from 'framer-motion';

export default function Gallery() {
  const cards = [
    { title: 'First Date', location: 'Our Beginning' },
    { title: 'A Holiday', location: 'Memories Made' },
    { title: 'Funny Moment', location: 'Always Laughing' },
    { title: 'The Proposal', location: 'April 20, 2026' },
  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-white to-[#fffcf5]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-bold text-[#e63946] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Moments We Share
        </motion.h2>
        <p className="text-gray-600 font-sans tracking-wide max-w-xl mx-auto italic">
          Every moment together is a treasure. We invite you to be part of our story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {/* Pokemon Card Frame Styling */}
            <div className="w-full aspect-[2.5/3.5] bg-[#fffcf5] border-[10px] border-[#f0c242] rounded-xl shadow-xl transform transition-transform group-hover:scale-105 group-hover:rotate-1 duration-300 relative overflow-hidden">
              {/* Card Header */}
              <div className="h-10 bg-gradient-to-r from-[#f0c242] to-[#e1a814] flex items-center justify-between px-3 border-b-2 border-yellow-700/20">
                <span className="font-bold text-xs uppercase tracking-tight text-yellow-950 font-sans">
                  Moment {index + 1}
                </span>
                <span className="text-sm font-bold text-yellow-900">HP 100</span>
              </div>

              {/* Main Photo Area (Placeholder) */}
              <div className="mx-2 mt-2 aspect-square bg-[#e2e8f0] border-4 border-gray-300 rounded shadow-inner flex items-center justify-center relative group-hover:bg-[#cbd5e1] transition-colors duration-300">
                <span className="text-gray-400 font-serif italic text-xs px-4 text-center">
                  Photo to be placed here
                </span>

                {/* Holographic Flash Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-white via-transparent to-pink-500 pointer-events-none" />
              </div>

              {/* Description Section */}
              <div className="p-4 flex flex-col items-center justify-center flex-grow">
                <h3 className="text-lg font-serif font-bold text-gray-800 leading-tight">
                  {card.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-sans italic mt-1">
                  {card.location}
                </p>
              </div>

              {/* Card Footer Info */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] font-sans text-gray-400">
                <span>© 2026 LOVE CO.</span>
                <span>ID: {index + 1}/4</span>
              </div>
            </div>

            {/* Soft Shadow Behind Card */}
            <div className="absolute -inset-1 bg-yellow-400/20 rounded-xl blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
