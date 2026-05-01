'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useSyncExternalStore, useState } from 'react';
import Countdown from './Countdown';
import SaveToCalendar from './SaveToCalendar';

// Deterministic pseudo-random from index (no Math.random — SSR-safe)
function rnd(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Row config: back → front
const ROWS = [
  { y: 555, count: 32, scale: 0.22, color: '#c084fc', opacity: 0.40 }, // lavender
  { y: 582, count: 28, scale: 0.30, color: '#fda4af', opacity: 0.50 }, // blush
  { y: 614, count: 24, scale: 0.42, color: '#fbbf24', opacity: 0.65 }, // yellow
  { y: 652, count: 20, scale: 0.56, color: '#e63946', opacity: 0.82 }, // red
  { y: 698, count: 16, scale: 0.72, color: '#f472b6', opacity: 0.92 }, // hot pink
  { y: 758, count: 13, scale: 0.90, color: '#c1121f', opacity: 1.00 }, // crimson
];

interface TulipProps {
  x: number;
  y: number;
  s: number;
  color: string;
  seed: number;
  detailed: boolean;
}

function Tulip({ x, y, s, color, seed, detailed }: TulipProps) {
  const lean = (rnd(seed + 300) - 0.5) * 5 * s;
  const dur = (3.0 + rnd(seed + 100) * 2.2).toFixed(2);
  const delay = (rnd(seed + 200) * parseFloat(dur)).toFixed(2);

  return (
    // Outer g: SVG positional transform (never touched by CSS animation)
    // Inner g: CSS sway animation — keeps them separate so they don't fight
    <g transform={`translate(${x},${y})`}>
    <g
      className="tulip"
      style={{ '--dur': `${dur}s`, '--delay': `${delay}s` } as React.CSSProperties}
    >
      {/* Stem */}
      <line
        x1="0" y1="0"
        x2={lean} y2={-52 * s}
        stroke="#3d7a3a"
        strokeWidth={3 * s}
        strokeLinecap="round"
      />

      {detailed && (
        <>
          {/* Left leaf */}
          <path
            d={`M 0,${-17 * s} C ${-16 * s},${-24 * s} ${-26 * s},${-38 * s} ${-14 * s},${-48 * s}`}
            stroke="#4a8c42" strokeWidth={2.5 * s} fill="none" strokeLinecap="round"
          />
          {/* Right leaf */}
          <path
            d={`M 0,${-23 * s} C ${17 * s},${-31 * s} ${27 * s},${-44 * s} ${14 * s},${-53 * s}`}
            stroke="#4a8c42" strokeWidth={2.5 * s} fill="none" strokeLinecap="round"
          />
        </>
      )}

      {/* Bloom — 3 overlapping ellipses give a cup illusion */}
      <ellipse cx={-6 * s} cy={-63 * s} rx={6.5 * s} ry={13 * s} fill={color} opacity={0.80} />
      <ellipse cx={ 6 * s} cy={-63 * s} rx={6.5 * s} ry={13 * s} fill={color} opacity={0.80} />
      <ellipse cx={0}      cy={-65 * s} rx={7   * s} ry={14 * s} fill={color} />
      {/* Petal highlight */}
      <ellipse cx={-2 * s} cy={-70 * s} rx={2.2 * s} ry={5.5 * s} fill="white" opacity={0.22} />
    </g>
    </g>
  );
}

function TulipField() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5c9e52" />
          <stop offset="100%" stopColor="#2a5425" />
        </linearGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#e8f5e0" stopOpacity="0" />
          <stop offset="100%" stopColor="#d4f0c0" stopOpacity="0.30" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="535" width="1440" height="365" fill="url(#ground)" />

      {/* Horizon atmospheric haze */}
      <rect x="0" y="480" width="1440" height="110" fill="url(#haze)" />

      {/* Tulip rows, back to front */}
      {ROWS.map((row, ri) => {
        const spacing = 1440 / row.count;
        return (
          <g key={ri} opacity={row.opacity}>
            {Array.from({ length: row.count }, (_, i) => {
              const seed = ri * 1000 + i;
              const x = spacing * i + spacing * 0.5 + (rnd(seed) - 0.5) * spacing * 0.55;
              const s = row.scale * (0.86 + rnd(seed + 500) * 0.28);
              return (
                <Tulip
                  key={i}
                  x={x}
                  y={row.y}
                  s={s}
                  color={row.color}
                  seed={seed}
                  detailed={ri >= 3}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export default function Hero() {
  // Returns false on the server, true on the client — SSR-safe without useEffect
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [engaged, setEngaged] = useState(false);

  return (
    <section className="relative h-[100vh] flex items-start justify-center text-center overflow-hidden pt-[18vh]">

      {/* Sky: morning golden-hour gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, #2c6fa3 0%, #5499c8 18%, #92c8e2 40%, #c6e4f0 58%, #edd9a3 75%, #e8b96a 100%)',
        }}
      />

      {/* Tulip field — client-only to avoid Math.sin() SSR/browser FP mismatch */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <TulipField />
        </motion.div>
      )}

      {/* Radial vignette behind text for readability */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 28%, rgba(255,252,245,0.65) 0%, rgba(255,252,245,0.18) 60%, transparent 100%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #fffcf5)' }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="z-10 px-6 max-w-4xl"
      >
        <motion.h1
          key={engaged ? 'engaged' : 'countdown'}
          className="text-4xl md:text-7xl font-serif font-bold text-[#e63946] mb-4 drop-shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          {engaged ? 'We\'re Engaged!' : 'A Beautiful Beginning'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          {engaged ? (
            <>
              <p className="text-lg md:text-2xl font-serif italic text-gray-800 tracking-wide">
                She said yes at Keukenhof Gardens
              </p>
              <div className="flex items-center gap-2 text-[#e63946] font-serif font-semibold">
                <MapPin size={20} />
                <span>April 20, 2026 · Amsterdam</span>
              </div>
              <p className="text-sm md:text-base font-serif italic text-gray-600 mt-1">
                Clive &amp; Charlene — engaged
              </p>
            </>
          ) : (
            <>
              <p className="text-lg md:text-2xl font-serif italic text-gray-800 tracking-wide">
                Save the Date: April 20, 2026
              </p>
              <div className="flex items-center gap-2 text-[#e63946] font-serif font-semibold">
                <MapPin size={20} />
                <span>Keukenhof Gardens, Amsterdam</span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 font-sans tracking-tight opacity-70">
                *All events are scheduled in Amsterdam Time (GMT+2).
              </p>
            </>
          )}
        </motion.div>

        <div className="mb-12">
          <Countdown onComplete={() => setEngaged(true)} />
        </div>

        {!engaged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <SaveToCalendar />
          </motion.div>
        )}
      </motion.div>

      {/* Scroll down arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: '#e63946', opacity: 0.65 }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.65 }}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative rings */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 border border-[#d4af37] rounded-full opacity-20 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 border border-[#d4af37] rounded-full opacity-20 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </section>
  );
}
