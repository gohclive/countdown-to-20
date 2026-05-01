'use client';

import InOnTheSecret from '@/components/InOnTheSecret';
import ThePlan from '@/components/ThePlan';
import { motion } from 'framer-motion';
import { Send, ImageIcon, MessageCircleHeart, Laugh } from 'lucide-react';

const contributionTypes = [
  { icon: ImageIcon,           label: 'Photos & Videos',  note: "Moments you've shared with Charlene" },
  { icon: MessageCircleHeart,  label: 'Heartfelt notes',  note: 'Wishes, memories, words of love' },
  { icon: Laugh,               label: 'Inside jokes',     note: 'The funnier the better 😂' },
];

export default function DetailsPage() {
  return (
    <main className="min-h-screen relative">
      <InOnTheSecret />

      <div className="relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-transparent to-pink-50/50 -z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-yellow-50/30 to-transparent -z-10" />

        <ThePlan />

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-50/30 to-transparent -z-10" />

        {/* Final CTA */}
        <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fff5f5 0%, #fffcf5 60%, #fff0f5 100%)' }}>
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-20 pointer-events-none -z-10" style={{ background: '#fda4af', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-15 pointer-events-none -z-10" style={{ background: '#d4af37', filter: 'blur(80px)' }} />

          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#d4af37' }}>
                The scrapbook
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic mb-4" style={{ color: '#e63946' }}>
                She made her cry<br />(the happy kind) 🥹
              </h2>
              <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: '#d4af37' }} />
              <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed mb-10">
                I compiled all your messages, photos, and memories into a surprise scrapbook for Charlene.
                Thank you to everyone who sent something — it meant the world to her.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-4 mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {contributionTypes.map(({ icon: Icon, label, note }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl" style={{ background: '#fff8f8', border: '1px solid #fda4af30' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#e6394615' }}>
                    <Icon size={18} color="#e63946" />
                  </div>
                  <span className="font-sans font-semibold text-gray-700 text-xs">{label}</span>
                  <span className="font-sans text-gray-400 text-[10px] italic leading-snug text-center">{note}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center justify-center gap-3 w-full max-w-sm py-5 rounded-2xl font-sans font-bold text-white text-base cursor-not-allowed select-none"
                style={{ background: 'linear-gradient(135deg, #9ca3af, #6b7280)' }}
              >
                <Send size={20} />
                Submissions Closed
              </div>
              <p className="mt-3 font-sans text-gray-400 text-xs italic">
                The scrapbook has been delivered. Thank you all! 🌷
              </p>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 bg-white text-center border-t border-gray-100">
          <p className="font-serif italic text-gray-400 text-sm">
            Designed with love for a beautiful beginning.
          </p>
        </footer>
      </div>
    </main>
  );
}
