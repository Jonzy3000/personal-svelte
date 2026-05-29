# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server
npm run build        # build for production
npm run check        # TypeScript + Svelte type checking
npm run lint         # Prettier + ESLint check
npm run format       # auto-format with Prettier
```

There are no tests.

## Architecture

Personal website for Matt Jones, built with SvelteKit 4 + TypeScript, deployed to Vercel on the **edge runtime**.

**Routes:**

- `/` — home page with project list and live Spotify "currently playing" widget
- `/top-tracks` — top Spotify tracks for the past month; rendered statically in production (`csr = false`) so it regenerates on each Vercel function invocation (~12h cache)

**Spotify integration** (`src/lib/server/spotify/spotify.ts`):

- Uses OAuth refresh token flow. On each request, exchanges the refresh token for an access token via `https://accounts.spotify.com/api/token`.
- The access token is cached in a module-level `global['spotify']` object and reused until it expires.
- Requires three env vars: `VITE_SPOTIFY_CLIENT_ID`, `VITE_SPOTIFY_CLIENT_SECRET`, `VITE_SPOTIFY_REFRESH_TOKEN`.
- API calls use the `@ekwoka/spotify-api` client (not `spotify-web-api-node` which is also installed but unused in server code).

**CurrentlyPlaying component** (`src/components/CurrentlyPlaying.svelte`):

- Polls by calling `invalidateAll()` every 10 seconds to re-run the page's `load` function.
- Pauses polling when the tab is hidden (`visibilitychange` event on `svelte:document`).

## Key Conventions

**Path alias:** `$components` resolves to `src/components` (configured in `svelte.config.js`). Use `$lib` for `src/lib` and `$components` for components.

**Styling:** Tailwind CSS v3 with `@tailwindcss/typography` (use `prose` classes for rich text). The `.container` class is a custom override — max-width `2xl`, centered with `px-4` padding at all breakpoints. The default Tailwind container plugin is disabled.

**Images:** Use `enhanced:img` from `@sveltejs/enhanced-img` for local images (handles format conversion). Import with `?enhanced` query: `import me from '$lib/assets/me.webp?enhanced'`.

**SVGs:** Imported as Svelte components via `@poppanator/sveltekit-svg` (e.g. `import SpotifyLogo from '$lib/assets/spotify-logo.svelte'`).

**SEO:** Use the `<Head>` component from `svead` at the top of each page for `<title>` and meta tags.

**Icons:** `lucide-svelte` for UI icons.
