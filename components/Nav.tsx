'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',        label: 'Home' },
  { href: '/details', label: 'The Proposal' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-full shadow-lg backdrop-blur-md"
        style={{ background: 'rgba(255,252,245,0.85)', border: '1px solid rgba(253,164,175,0.25)' }}
      >
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all"
              style={
                active
                  ? { background: 'linear-gradient(135deg, #e63946, #c1121f)', color: '#fff' }
                  : { color: '#6b7280' }
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
