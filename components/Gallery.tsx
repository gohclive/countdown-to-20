'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    image: '/pokemon-cards/bali.png',
    title: 'Bali Curse Breaker',
    location: 'Bali',
    year: '2022',
    num: '1/4',
    special: false,
    caption: 'Our first trip overseas together',
  },
  {
    image: '/pokemon-cards/norway.png',
    title: 'Aurora Seeker',
    location: 'Tromsø, Norway',
    year: '2023',
    num: '2/4',
    special: false,
    caption: 'Chasing the northern lights together',
  },
  {
    image: '/pokemon-cards/perth.png',
    title: 'Sunshine Overload',
    location: 'Perth, Australia',
    year: '2025',
    num: '3/4',
    special: false,
    caption: 'Finding quokkas down under',
  },
  {
    image: '/pokemon-cards/proposal.png',
    title: 'Will You Marry Me?',
    location: 'Amsterdam',
    year: '2026',
    num: '4/4',
    special: true,
    caption: 'The most important question',
  },
];

type Card = (typeof cards)[number];

function Lightbox({ card, onClose }: { card: Card; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10"
        style={{ maxHeight: '90vh' }}
      >
        <Image
          src={card.image}
          alt={`${card.title} — ${card.location}, ${card.year}`}
          width={360}
          height={504}
          className="rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          style={{ maxHeight: '85vh', width: 'auto' }}
          priority
        />

        {/* Close hint */}
        <p className="mt-3 text-center text-white/50 text-xs tracking-widest uppercase font-sans">
          Click anywhere or press Esc to close
        </p>
      </motion.div>
    </motion.div>
  );
}

function TiltCard({ card, index, onOpen }: { card: Card; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 350, damping: 35 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 350, damping: 35 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mx.set(nx - 0.5);
    my.set(ny - 0.5);
    setHoloPos({ x: nx * 100, y: ny * 100 });
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  const holoGradient = `
    radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.18) 0%, transparent 55%),
    linear-gradient(
      ${110 + holoPos.x * 0.6}deg,
      transparent 30%,
      rgba(255, 0, 128, 0.18) 40%,
      rgba(255, 220, 0, 0.14) 48%,
      rgba(0, 220, 255, 0.18) 56%,
      rgba(160, 0, 255, 0.12) 64%,
      transparent 72%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onClick={onOpen}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative cursor-pointer group w-full"
      >
        {/* Glow halo */}
        <div
          className="absolute -inset-4 rounded-2xl blur-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: hovered ? 0.85 : 0,
            background: card.special
              ? 'radial-gradient(ellipse, rgba(255, 100, 180, 0.65), transparent 68%)'
              : 'radial-gradient(ellipse, rgba(245, 216, 0, 0.75), transparent 68%)',
          }}
        />

        {/* Card image */}
        <div
          className="relative rounded-xl overflow-hidden w-full"
          style={{
            boxShadow: hovered
              ? '0 28px 64px rgba(0,0,0,0.38), 0 4px 16px rgba(0,0,0,0.18)'
              : '0 12px 32px rgba(0,0,0,0.22)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <Image
            src={card.image}
            alt={`${card.title} — ${card.location}, ${card.year}`}
            width={360}
            height={504}
            className="w-full h-auto block"
            priority={index < 2}
          />

          {/* Holographic shimmer overlay */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: holoGradient,
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* HOLO badge on proposal card */}
        {card.special && (
          <motion.div
            className="absolute -top-2.5 -right-2.5 z-10 bg-[#f5d800] text-yellow-900 text-[8px] font-black uppercase tracking-wider rounded-full px-2 py-0.5 border-2 border-yellow-600 shadow-md"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            ✦ HOLO
          </motion.div>
        )}
      </motion.div>

      {/* Card number + caption */}
      <motion.div
        className="mt-3 text-center flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.14 + 0.35, duration: 0.5 }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-700/60 font-sans">
          {card.num}
        </p>
        <p className="text-xs font-serif italic text-gray-500 max-w-[160px] leading-snug">
          {card.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<Card | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fffcf5 0%, #fef9e0 45%, #fffcf5 100%)',
      }}
    >
      {/* Subtle dot texture echoing the card's yellow border feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(184,134,11,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="max-w-6xl mx-auto text-center mb-16 relative">
        <motion.p
          className="text-[11px] font-bold uppercase tracking-[0.35em] text-yellow-600 mb-3 font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Collector&apos;s Edition · 4 / 4 Cards
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-bold text-[#e63946] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Card Collection
        </motion.h2>
        <motion.p
          className="text-gray-500 font-sans text-sm tracking-wide max-w-sm mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Four adventures. One story.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <TiltCard key={card.image} card={card} index={index} onOpen={() => setSelected(card)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <Lightbox card={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
