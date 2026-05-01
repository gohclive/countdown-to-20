'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrapbookUnlockPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/scrapbook-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/scrapbook');
        router.refresh();
      } else {
        setError('Wrong password. Try again.');
        setPassword('');
        inputRef.current?.focus();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-6"
      style={{ background: '#fffcf5' }}
    >
      <div className="w-full max-w-sm text-center">
        <div className="text-5xl mb-6 select-none">🌷</div>

        <h1 className="font-serif italic text-4xl mb-2" style={{ color: '#e63946' }}>
          Private Scrapbook
        </h1>

        <p
          className="font-sans text-xs font-bold uppercase tracking-[0.3em] mb-2"
          style={{ color: '#d4af37' }}
        >
          For Charlene&apos;s eyes only
        </p>

        <div className="w-12 h-0.5 mx-auto my-6" style={{ background: '#d4af37' }} />

        <p className="font-sans text-gray-500 text-sm mb-8">
          Enter the password to open the scrapbook.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            autoFocus
            required
            disabled={loading}
            className="w-full px-5 py-3.5 rounded-full text-sm font-sans text-center outline-none transition-all"
            style={{
              background: '#fff',
              border: '1.5px solid rgba(230,57,70,0.25)',
              color: '#171717',
            }}
          />

          {error && (
            <p className="font-sans text-sm" style={{ color: '#e63946' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-full font-sans font-bold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #e63946, #c1121f)',
            }}
          >
            {loading ? 'Unlocking…' : 'Open the Scrapbook'}
          </button>
        </form>

        <p className="font-sans text-xs text-gray-400 mt-8 italic">
          This is a private gift — please don&apos;t share the password.
        </p>
      </div>
    </div>
  );
}
