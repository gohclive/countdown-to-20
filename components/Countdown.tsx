'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const calculateTimeLeft = useCallback(() => {
    // Target date: April 20, 2026, at 10:00 AM Amsterdam Time (CET/CEST)
    // Amsterdam is UTC+1 (CET) or UTC+2 (CEST).
    // In April 2026, it will be CEST (UTC+2).
    const targetDate = new Date('2026-04-20T10:00:00+02:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) return <div className="h-20" />; // Prevent layout shift

  return (
    <div className="flex justify-center gap-4 md:gap-8 text-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
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
