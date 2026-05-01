'use client';

import { useState, useEffect, useCallback } from 'react';

// Proposal moment: April 20, 2026 at 10:00 AM Amsterdam Time (CEST = UTC+2)
const PROPOSAL_TIME = new Date('2026-04-20T10:00:00+02:00').getTime();

interface TimeUnit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownState {
  time: TimeUnit;
  completed: boolean;
}

function computeState(): CountdownState {
  const now = Date.now();
  const diff = PROPOSAL_TIME - now;

  if (diff > 0) {
    return {
      completed: false,
      time: {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      },
    };
  }

  // Count up — elapsed time since the proposal moment
  const elapsed = now - PROPOSAL_TIME;
  return {
    completed: true,
    time: {
      days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
      hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((elapsed / 1000 / 60) % 60),
      seconds: Math.floor((elapsed / 1000) % 60),
    },
  };
}

interface Props {
  onComplete?: () => void;
}

export default function Countdown({ onComplete }: Props) {
  const [state, setState] = useState<CountdownState | null>(null);
  const onCompleteRef = useCallback(() => onComplete?.(), [onComplete]);

  useEffect(() => {
    const tick = () => {
      const next = computeState();
      setState(prev => {
        if (!prev?.completed && next.completed) onCompleteRef();
        return next;
      });
    };

    // setTimeout(0) avoids synchronous setState directly in the effect body
    const initId = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);

    return () => {
      clearTimeout(initId);
      clearInterval(timer);
    };
  }, [onCompleteRef]);

  if (!state) return <div className="h-20" />;

  if (state.completed) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm md:text-base font-sans uppercase tracking-widest text-[#e63946] opacity-80">
          and counting&hellip;
        </p>
        <div className="flex justify-center gap-4 md:gap-8 text-center">
          <TimeUnit value={state.time.days} label="Days" />
          <TimeUnit value={state.time.hours} label="Hours" />
          <TimeUnit value={state.time.minutes} label="Minutes" />
          <TimeUnit value={state.time.seconds} label="Seconds" />
        </div>
        <p className="text-xs md:text-sm font-serif italic text-gray-600 mt-1">
          since we said yes to forever
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 md:gap-8 text-center">
      <TimeUnit value={state.time.days} label="Days" />
      <TimeUnit value={state.time.hours} label="Hours" />
      <TimeUnit value={state.time.minutes} label="Minutes" />
      <TimeUnit value={state.time.seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-3xl md:text-5xl font-serif font-bold text-[#d4af37]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest font-sans text-gray-600">
        {label}
      </span>
    </div>
  );
}
