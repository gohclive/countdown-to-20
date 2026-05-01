import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

// In-memory rate limiter — 10 attempts per 15 minutes per IP
const RATE_LIMIT = 10;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  return (xff?.split(',')[0] ?? 'unknown').trim();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// Hash both sides to normalize length before comparing — prevents timing and length leaks
function safeCompare(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts, try again later' }, { status: 429 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const correct = process.env.SCRAPBOOK_PASSWORD;
  if (!correct) return NextResponse.json({ error: 'Misconfiguration' }, { status: 500 });

  if (!safeCompare(body.password ?? '', correct)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  // Clear the attempt counter on success so a legitimate user isn't locked out
  attempts.delete(ip);

  const cookieStore = await cookies();
  cookieStore.set('scrapbook_session', 'unlocked', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return NextResponse.json({ ok: true });
}
