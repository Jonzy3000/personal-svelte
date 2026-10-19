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

Personal website for Matt Jones, built with SvelteKit 3 + Svelte 5 + TypeScript, deployed to Vercel as a Node 24 serverless function (Kit 3 dropped the edge runtime). Requires Node >=22.17 locally (`.nvmrc`). All components use Svelte 5 runes (`$props()`, `$effect`, `$state`).

**Routes:**

- `/` — home page with project list and live "currently playing" widget
- `/top-tracks` — top tracks for the past month; rendered statically in production (`csr = false`) so it regenerates on each Vercel function invocation (~12h cache)

**Music integration** (`src/lib/server/lastfm/lastfm.ts`):

- Matt listens on TIDAL, which has no queryable now-playing/top-tracks API. A scrobbler logs TIDAL plays to Last.fm, and the site reads Last.fm's API. The widgets are branded with the TIDAL logo since that's where the music is played; Last.fm is just the scrobble store.
- Last.fm is a single keyed `GET` endpoint (`https://ws.audioscrobbler.com/2.0/`) — no OAuth, no token caching. Plain `fetch`. Requires two env vars, declared in `src/env.ts` and read from `$app/env/private`: `LASTFM_API_KEY`, `LASTFM_USER`.
- `getRecentTracks()` — one `user.getrecenttracks` call covers both now-playing and last-played: the most recent track carries `@attr.nowplaying === 'true'` only while something is playing.
- `getTopTracks()` — `user.gettoptracks` (period `1month`). That endpoint returns a placeholder image for every track, so real album art is fetched per track via `track.getInfo` (cheap because the page is statically regenerated ~12h).
- Track links point to Last.fm (the API only returns last.fm URLs; no TIDAL track IDs are available).

**CurrentlyPlaying component** (`src/components/CurrentlyPlaying.svelte`):

- Polls by calling `refreshAll()` every 10 seconds to re-run the page's `load` function.
- Pauses polling when the tab is hidden (`visibilitychange` via `document.addEventListener` inside a `$effect` with cleanup return).

## Key Conventions

**Config:** There is no `svelte.config.js`; SvelteKit config is passed to the `sveltekit()` plugin in `vite.config.ts`.

**Path aliases:** Subpath imports in `package.json` — `#lib/*` for `src/lib` and `#components/*` for `src/components`. TS imports need the `.js` extension (e.g. `#lib/server/lastfm/lastfm.js`).

**Styling:** Tailwind CSS v4 (CSS-based config in `src/app.css`, no `tailwind.config.*` file). Uses `@plugin '@tailwindcss/typography'` for `prose` classes. The `.container` class is a custom `@utility` override — max-width `42rem`, centered with `px-4` padding at all breakpoints.

**Images:** Use `enhanced:img` from `@sveltejs/enhanced-img` for local images (handles format conversion). Import with `?enhanced` query: `import me from '#lib/assets/me.webp?enhanced'`.

**SVGs:** Imported as Svelte components via `@poppanator/sveltekit-svg` (e.g. `import TidalLogo from '#lib/assets/tidal-logo.svelte'`).

**SEO:** Use the `<Head>` component from `svead` — pass a single `seo_config` prop: `<Head seo_config={{ title, url, description }} />`.

**Icons:** Nav uses inline SVGs (lucide-svelte v1 doesn't export `Github`/`Linkedin`). `lucide-svelte` is used in `CurrentlyPlaying` for the `History` icon.
