'use client';

import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';

export default function RSVPForm() {
  return (
    <section id="rsvp" className="py-24 px-6 bg-[#fffcf5] relative overflow-hidden">
      <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-8 border-[#e63946] relative z-10">
        <div className="text-center mb-10">
          <motion.h2
            className="text-4xl font-serif font-bold text-[#e63946] mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Send Your Love
          </motion.h2>
          <p className="text-gray-600 font-sans tracking-wide">
            We would love to hear from you! Share your well-wishes.
          </p>
        </div>

        <form
          action="https://formspree.io/f/placeholder"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 font-sans uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-5 py-3 border-2 border-[#d4af37]/20 rounded-xl focus:border-[#e63946] outline-none transition-all font-sans bg-gray-50/50"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 font-sans uppercase tracking-widest">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Share your memories and well-wishes..."
              className="w-full px-5 py-3 border-2 border-[#d4af37]/20 rounded-xl focus:border-[#e63946] outline-none transition-all font-sans bg-gray-50/50 resize-none"
            />
          </div>

          {/* Upload Field */}
          <div className="group">
            <label htmlFor="upload" className="block text-sm font-semibold text-gray-700 mb-2 font-sans uppercase tracking-widest">
              Upload a Special Memory (Photo, Video, or Audio)
            </label>
            <div className="relative">
              <input
                type="file"
                id="upload"
                name="attachment"
                accept="image/*,video/*,audio/*"
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#d4af37]/40 p-8 rounded-xl bg-gray-50/50 cursor-pointer group-hover:border-[#e63946] transition-all"
              >
                <div className="bg-[#e63946]/10 p-3 rounded-full mb-3 group-hover:bg-[#e63946]/20 transition-all">
                  <Upload className="w-6 h-6 text-[#e63946]" />
                </div>
                <span className="text-gray-600 font-sans text-sm">
                  Click to select or drag and drop files here
                </span>
                <span className="text-gray-400 font-sans text-[10px] mt-1 uppercase tracking-tight">
                  Maximum file size: 10MB
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#e63946] text-white font-sans font-bold rounded-xl hover:bg-[#d62828] transition-all shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Your Love
          </button>
        </form>
      </div>

      {/* Background Floral/Tulip Decoration */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#ef476f] rounded-full mix-blend-multiply filter blur-[100px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#06d6a0] rounded-full mix-blend-multiply filter blur-[100px] opacity-10" />
    </section>
  );
}
