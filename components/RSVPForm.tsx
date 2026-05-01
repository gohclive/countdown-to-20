'use client';

import { motion } from 'framer-motion';
import { Send, Camera, Music, Video } from 'lucide-react';

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/';

export default function RSVPForm() {
  return (
    <section id="rsvp" className="py-24 px-6 bg-[#fffcf5] relative overflow-hidden">
      <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-8 border-[#e63946] relative z-10 text-center">
        <div className="mb-10">
          <motion.h2
            className="text-4xl font-serif font-bold text-[#e63946] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Help Me Surprise Her
          </motion.h2>
          <p className="text-gray-600 font-sans tracking-wide leading-relaxed">
            I would love to hear from you! Reach out to me directly on Telegram to share your well-wishes,
            memories, and special moments.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#e63946]/10 p-4 rounded-2xl">
                <Camera className="w-6 h-6 text-[#e63946]" />
              </div>
              <span className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest">Photos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#e63946]/10 p-4 rounded-2xl">
                <Video className="w-6 h-6 text-[#e63946]" />
              </div>
              <span className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest">Videos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#e63946]/10 p-4 rounded-2xl">
                <Music className="w-6 h-6 text-[#e63946]" />
              </div>
              <span className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest">Audio</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic font-sans px-4">
            &ldquo;I am carefully collating every heartfelt message and media file to present to Charlene as a collective gift from all of you.&rdquo;
          </p>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#e63946] text-white font-sans font-bold rounded-xl hover:bg-[#d62828] transition-all shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Message on Telegram
          </a>
        </div>
      </div>

      {/* Background Floral/Tulip Decoration */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#ef476f] rounded-full mix-blend-multiply filter blur-[100px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#06d6a0] rounded-full mix-blend-multiply filter blur-[100px] opacity-10" />
    </section>
  );
}
