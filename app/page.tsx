'use client';

import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import WhatsNext from '@/components/WhatsNext';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <Gallery />
      <WhatsNext />
    </main>
  );
}
