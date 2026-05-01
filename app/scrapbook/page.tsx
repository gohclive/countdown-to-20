'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { Lora, Inter } from 'next/font/google';
import Image from 'next/image';
import { scrapbookGroups } from '@/lib/scrapbook-data';
import type { ScrapbookGroup, ScrapbookMedia } from '@/lib/scrapbook-data';

const handwriting = Lora({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'] });
const sans = Inter({ subsets: ['latin'] });

type Page =
  | { kind: 'cover' }
  | { kind: 'combined';  group: ScrapbookGroup; member: ScrapbookGroup['members'][number] }
  | { kind: 'messages';  group: ScrapbookGroup; members: ScrapbookGroup['members'] }
  | { kind: 'photos';    group: ScrapbookGroup };

function buildPages(): Page[] {
  const pages: Page[] = [{ kind: 'cover' }];
  for (const group of scrapbookGroups) {
    // Members with photos=yes get individual combined pages
    for (const member of group.members) {
      if (member.hasPhotos && (member.message || member.photos.length > 0)) {
        pages.push({ kind: 'combined', group, member });
      }
    }
    // Members without photos get grouped on a single messages page
    const noPhotoMembers = group.members.filter(m => !m.hasPhotos && m.message);
    if (noPhotoMembers.length > 0) {
      pages.push({ kind: 'messages', group, members: noPhotoMembers });
    }
    // Group-level photos (from group folder, not individual member folders)
    const memberPhotoSrcs = new Set(group.members.flatMap(m => m.photos.map(p => p.src)));
    const groupLevelPhotos = group.allPhotos.filter(p => !memberPhotoSrcs.has(p.src));
    if (groupLevelPhotos.length > 0) {
      pages.push({ kind: 'photos', group });
    }
  }
  return pages;
}

const PAGES = buildPages();

const pageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const pageTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// ── Components ────────────────────────────────────────────────────────────────

function MessageContent({ message, className, onImageClick }: { message?: string; className?: string; onImageClick: (item: ScrapbookMedia) => void }) {
  if (!message) return null;
  if (message.startsWith('image:')) {
    const src = message.slice('image:'.length);
    const isVideo = src.endsWith('.mp4');
    const item: ScrapbookMedia = { src, caption: 'message', rotation: 0, type: isVideo ? 'video' : 'photo' };
    if (isVideo) {
      return (
        <video
          src={src}
          autoPlay muted loop playsInline
          onClick={() => onImageClick(item)}
          className={`rounded-sm shadow-md cursor-zoom-in max-w-full ${className ?? ''}`}
        />
      );
    }
    return (
      <Image
        src={src}
        alt="message"
        width={600}
        height={600}
        unoptimized
        onClick={() => onImageClick(item)}
        className={`rounded-sm shadow-md cursor-zoom-in max-w-full h-auto ${className ?? ''}`}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }
  return <p className={className}>{message}</p>;
}

function WashiTape({ color }: { color: string }) {
  return (
    <div className="h-8 w-full flex-shrink-0 relative overflow-hidden"
      style={{
        background: `repeating-linear-gradient(45deg, ${color}cc, ${color}cc 10px, ${color}ee 10px, ${color}ee 20px)`,
      }}>
      <div className="absolute inset-0 opacity-10 bg-white mix-blend-overlay" />
    </div>
  );
}

function PhotoGallery({ photos, onPhotoClick, compact = false }: {
  photos: ScrapbookMedia[],
  onPhotoClick: (item: ScrapbookMedia) => void,
  compact?: boolean
}) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${compact ? 'p-4' : 'p-6'}`}>
      {photos.map((p) => (
        <motion.div
          key={p.src}
          onClick={(e) => {
            e.stopPropagation();
            onPhotoClick(p);
          }}
          className="bg-white p-1.5 shadow-lg border border-gray-100 cursor-zoom-in active:scale-95 transition-transform"
          style={{ rotate: `${p.rotation || 0}deg` }}
        >
          {p.type === 'video' ? (
            <video
              src={p.src}
              autoPlay muted loop playsInline
              className="w-full aspect-square object-cover pointer-events-none"
            />
          ) : (
            <div className="relative w-full aspect-square overflow-hidden">
              <Image src={p.src} alt={p.caption} fill unoptimized className="object-cover pointer-events-none" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function ScrapbookPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ScrapbookMedia | null>(null);
  
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const paginate = useCallback((newDirection: number) => {
    const next = current + newDirection;
    if (next >= 0 && next < PAGES.length) {
      setDirection(newDirection);
      setCurrent(next);
    }
  }, [current]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    // Only swipe if gesture is predominantly horizontal
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      paginate(dx < 0 ? 1 : -1);
    }
  }, [paginate]);

  const activePage = PAGES[current];

  return (
    <div className={`min-h-[100dvh] w-full bg-[#f5ece0] flex items-center justify-center overflow-hidden ${sans.className}`}>
      
      {/* Lightbox Modal - Top Level */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {selectedItem.type === 'video' ? (
              <motion.video
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                src={selectedItem.src}
                autoPlay controls loop playsInline
                className="max-w-full max-h-full shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                src={selectedItem.src} className="max-w-full max-h-full shadow-2xl rounded-sm"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[420px] h-[100dvh] max-h-[860px] bg-white shadow-2xl flex flex-col">
        
        {/* Spine Shadow */}
        <div className={`absolute top-0 left-0 h-full w-10 z-[40] pointer-events-none transition-opacity duration-700 ${current === 0 ? 'opacity-0' : 'opacity-100'}`}
             style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)' }} />

        {/* Page Area */}
        <div className="flex-1 relative overflow-hidden bg-[#fffcf5]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 flex flex-col"
            >
              {activePage.kind === 'cover' && (
                <div className="h-full w-full flex flex-col items-center justify-center text-center p-8">
                  <h1 className="text-6xl font-serif italic text-[#c0414d]">For<br/>Charlene</h1>
                  <p className={`${handwriting.className} text-2xl mt-4 text-[#7a4f3a]`}>From all of us, with love 🌷</p>
                  <p className="absolute bottom-12 text-[9px] uppercase tracking-widest text-amber-600 animate-pulse">Swipe to flip ›</p>
                </div>
              )}
              
              {activePage.kind === 'messages' && (
                <div className="h-full flex flex-col">
                  <WashiTape color={activePage.group.color} />
                  <div className="p-6 flex-1 overflow-y-auto overflow-x-hidden">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded" style={{ backgroundColor: activePage.group.color + '22', color: activePage.group.color }}>{activePage.group.groupName}</span>
                    <div className="mt-8 space-y-6">
                      {activePage.kind === 'messages' && activePage.members.map(m => (
                        <div key={m.name} className="border-l-2 pl-4" style={{ borderColor: activePage.group.color }}>
                          <p className="text-[10px] font-bold opacity-50 uppercase mb-1">{m.name}</p>
                          <MessageContent message={m.message} className={`${handwriting.className} text-xl leading-relaxed`} onImageClick={setSelectedItem} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePage.kind === 'photos' && (() => {
                const memberPhotoSrcs = new Set(activePage.group.members.flatMap(m => m.photos.map(p => p.src)));
                const groupLevelPhotos = activePage.group.allPhotos.filter(p => !memberPhotoSrcs.has(p.src));
                return (
                  <div className="h-full flex flex-col">
                    <WashiTape color={activePage.group.color} />
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activePage.group.groupName} / Photos</span>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                      <PhotoGallery photos={groupLevelPhotos} onPhotoClick={setSelectedItem} />
                    </div>
                  </div>
                );
              })()}

              {activePage.kind === 'combined' && (
                <div className="h-full flex flex-col">
                  <WashiTape color={activePage.group.color} />
                  <div className="p-6 flex-1 overflow-y-auto overflow-x-hidden">
                    <p className={`${handwriting.className} text-3xl mb-4`} style={{ color: activePage.group.color }}>{activePage.member.name}</p>
                    <MessageContent message={activePage.member.message} className={`${handwriting.className} text-xl leading-relaxed ${activePage.member.photos.length > 0 ? 'mb-8' : ''}`} onImageClick={setSelectedItem} />
                    {activePage.member.photos.length > 0 && (
                      <PhotoGallery compact photos={activePage.member.photos} onPhotoClick={setSelectedItem} />
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="h-14 border-t bg-white flex items-center justify-between px-6 z-[60]">
          <button onClick={() => paginate(-1)} disabled={current === 0} className="text-xs font-bold disabled:opacity-0 uppercase tracking-widest text-amber-700">Prev</button>
          {/* Sliding pill track */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-28 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-amber-500"
                animate={{ width: `${((current + 1) / PAGES.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-gray-300 tabular-nums">{current + 1} / {PAGES.length}</span>
          </div>
          <button onClick={() => paginate(1)} disabled={current === PAGES.length - 1} className="text-xs font-bold disabled:opacity-0 uppercase tracking-widest text-amber-700">Next</button>
        </div>
      </div>
    </div>
  );
}