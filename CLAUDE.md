# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack, http://localhost:3000)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests.

## Architecture

Single-page App Router application (`app/page.tsx`) — a "Save the Date" proposal site for an event at Keukenhof Gardens on April 20, 2026. All components live in `components/` and are client components (`'use client'`).

**Component breakdown:**
- `Hero` — landing section with countdown timer and animated background
- `Countdown` — live timer targeting April 20, 2026 00:00:00 CEST (UTC+2)
- `InOnTheSecret` — secret message to friends/family; checklist of completed preparations and CTA to leave Charlene a message
- `Gallery` — Pokémon card-style memory cards
- `ThePlan` — vertical scroll-animated timeline of the proposal day
- `RSVPForm` — Formspree-backed message/attachment form (endpoint is a placeholder)
- `SaveToCalendar` — generates and downloads an `.ics` file
- `MusicToggle` — fixed-position audio player for `/public/music.mp3`

Styling uses **Tailwind CSS v4** via `@tailwindcss/postcss` — there is no `tailwind.config.js`. Custom theme values (colors, fonts) are defined in `app/globals.css` with `@theme`.

## Next.js 16 breaking changes to know

- **Turbopack is the default** for both `next dev` and `next build`. No `--turbopack` flag needed. Pass `--webpack` to opt out.
- **`turbopack` config** is now a top-level key in `next.config.ts`, not under `experimental`.
- **Async Request APIs are fully async** — `cookies()`, `headers()`, `params`, and `searchParams` can no longer be accessed synchronously. Always `await` them.
- **`next lint` is removed** — use the `eslint` CLI directly (already reflected in `package.json`).
- **`unstable_instant`** — export this from a route segment to validate and enable instant client-side navigation. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md` before adding it.

When in doubt, consult `node_modules/next/dist/docs/` — this is Next.js 16 and APIs may differ from training data.
