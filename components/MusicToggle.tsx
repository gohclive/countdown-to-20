'use client';

import { useState, useRef, useEffect } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Default volume 50%
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[#d4af37]/20 flex items-center gap-2"
          >
            <div className="flex gap-1 h-3 items-end">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#e63946] rounded-full"
                  animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-700">
              Playing Now
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMusic}
        className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 group relative ${
          isPlaying ? 'bg-[#e63946] text-white' : 'bg-white text-[#e63946]'
        } border-2 border-[#e63946]/10`}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6 animate-pulse" />
        )}

        {/* Floating tooltip */}
        {!isPlaying && (
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-3 py-1 rounded whitespace-nowrap pointer-events-none font-sans uppercase tracking-widest">
            Tap for Music
          </div>
        )}
      </button>

      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />
    </div>
  );
}
