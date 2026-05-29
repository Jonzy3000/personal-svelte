# Svelte 5 + SvelteKit 2 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade from Svelte 4 + SvelteKit 1 to Svelte 5 + SvelteKit 2 by scaffolding a fresh project with `npx sv create` and porting all content across.

**Architecture:** Scaffold a new project in a temp directory using the `sv` CLI (with TypeScript, ESLint flat config, Prettier, Tailwind), then replace config/tooling files in the repo with the scaffold output. Port all routes and components to Svelte 5 runes syntax. The Spotify server lib (`src/lib/server/`) requires no changes — it's plain TypeScript.

**Tech Stack:** Svelte 5, SvelteKit 2, TypeScript, Tailwind (v4 via sv scaffold), Vite 6, ESLint flat config, `@ekwoka/spotify-api`, `@poppanator/sveltekit-svg@7`, `@sveltejs/enhanced-img`, `@sveltejs/adapter-vercel`, `lucide-svelte`, `svead`

---

## File Map

**Replaced by scaffold output:**

- `package.json`
- `svelte.config.js`
- `vite.config.ts`
- `tsconfig.json`
- `eslint.config.js` (new, replaces `.eslintrc.cjs`)
- `.prettierrc`
- `src/app.html`
- `src/app.css`

**Deleted (no longer needed):**

- `.eslintrc.cjs`
- `postcss.config.cjs` (Tailwind v4 doesn't use PostCSS config)

**Ported with runes rewrite:**

- `src/routes/+layout.svelte`
- `src/routes/+page.svelte`
- `src/routes/top-tracks/+page.svelte`
- `src/components/CurrentlyPlaying.svelte`

**Ported unchanged:**

- `src/routes/+page.server.ts`
- `src/routes/top-tracks/+page.server.ts`
- `src/lib/server/spotify/spotify.ts`
- `src/lib/assets/` (all files)
- `static/` (all files)
- `.env`

---

## Task 1: Scaffold fresh project and copy tooling files

**Files:**

- Modify: `package.json`
- Create: `eslint.config.js`
- Modify: `svelte.config.js`
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`
- Modify: `.prettierrc`

- [ ] **Step 1: Scaffold in a temp directory**

```bash
npx sv create /tmp/personal-svelte-new
```

When prompted, select:

- Template: **SvelteKit minimal**
- Type checking: **TypeScript**
- Add-ons: **prettier**, **eslint**, **tailwindcss**

- [ ] **Step 2: Copy tooling files into the repo**

```bash
cp /tmp/personal-svelte-new/package.json ./package.json
cp /tmp/personal-svelte-new/svelte.config.js ./svelte.config.js
cp /tmp/personal-svelte-new/vite.config.ts ./vite.config.ts
cp /tmp/personal-svelte-new/tsconfig.json ./tsconfig.json
cp /tmp/personal-svelte-new/eslint.config.js ./eslint.config.js
cp /tmp/personal-svelte-new/.prettierrc ./. 2>/dev/null || cp /tmp/personal-svelte-new/.prettierrc.json ./.prettierrc.json 2>/dev/null || true
cp /tmp/personal-svelte-new/.prettierignore ./.prettierignore
cp /tmp/personal-svelte-new/src/app.html ./src/app.html
cp /tmp/personal-svelte-new/src/app.css ./src/app.css
```

- [ ] **Step 3: Delete obsolete config files**

```bash
rm -f .eslintrc.cjs postcss.config.cjs
```

- [ ] **Step 4: Check what Tailwind version was scaffolded**

```bash
cat package.json | grep tailwindcss
```

Expected: `"tailwindcss": "^4.x.x"` — the sv CLI installs Tailwind v4. If you see v3, note it; later tasks handle v3 and v4 differently (flag in comments).

---

## Task 2: Add project-specific dependencies to package.json

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Add project dependencies**

```bash
npm install svead lucide-svelte classnames
npm install -D @ekwoka/spotify-api @poppanator/sveltekit-svg @sveltejs/enhanced-img @sveltejs/adapter-vercel @tailwindcss/typography @types/spotify-web-api-node querystring encoding
```

- [ ] **Step 2: Verify no peer dependency conflicts**

```bash
npm install 2>&1 | grep -E 'peer|warn|error'
```

Expected: no errors. Warnings about optional peers are fine.

---

## Task 3: Update svelte.config.js with project settings

**Files:**

- Modify: `svelte.config.js`

The scaffold uses `@sveltejs/adapter-auto`. Replace it with the Vercel adapter, add the `$components` alias, and wire up the SVG plugin.

- [ ] **Step 1: Rewrite svelte.config.js**

```js
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ runtime: 'edge' }),
    alias: {
      $components: path.resolve('./src/components')
    }
  }
};

export default config;
```

- [ ] **Step 2: Add SVG plugin to vite.config.ts**

Read the current `vite.config.ts` from the scaffold, then add the SVG plugin:

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
  plugins: [sveltekit(), svg()]
});
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json svelte.config.js vite.config.ts tsconfig.json eslint.config.js .prettierrc* .prettierignore src/app.html
git rm --cached .eslintrc.cjs postcss.config.cjs 2>/dev/null || true
git commit -m "chore: scaffold SvelteKit 2 + Svelte 5 tooling"
```

---

## Task 4: Migrate Tailwind configuration

**Files:**

- Modify: `src/app.css`
- Delete: `tailwind.config.ts`

The project has a custom `.container` utility (max-w-2xl, centered, px-4) and uses `@tailwindcss/typography`. In Tailwind v4 these move into CSS.

- [ ] **Step 1: Replace src/app.css with Tailwind v4 config**

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@utility container {
  margin-left: auto;
  margin-right: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  max-width: 100%;

  @media (min-width: 640px) {
    max-width: 42rem;
  }

  @media (min-width: 768px) {
    max-width: 42rem;
  }

  @media (min-width: 1024px) {
    max-width: 42rem;
  }

  @media (min-width: 1280px) {
    max-width: 42rem;
  }
}
```

> If the scaffold installed Tailwind v3 (check Task 1 Step 4), keep `tailwind.config.ts` and update `src/app.css` to just:
>
> ```css
> @tailwind base;
> @tailwind components;
> @tailwind utilities;
> ```
>
> Then update `tailwind.config.ts` to use `content: ['./src/**/*.{html,js,svelte,ts}']` and keep the existing plugin.

- [ ] **Step 2: Delete the old Tailwind config (v4 only)**

```bash
git rm tailwind.config.ts
```

- [ ] **Step 3: Commit**

```bash
git add src/app.css
git commit -m "chore: migrate Tailwind config to v4"
```

---

## Task 5: Copy static assets and server lib

**Files:**

- Copy: `src/lib/server/spotify/spotify.ts` (unchanged)
- Copy: `src/lib/assets/` (all files)
- Copy: `static/` (all files — fonts, favicon, CV PDF)
- Copy: `.env`

- [ ] **Step 1: Verify assets are still present**

The `static/` and `src/lib/` directories were not touched by the scaffold copy — they should still be intact. Confirm:

```bash
ls static/ && ls src/lib/assets/ && ls src/lib/server/spotify/
```

Expected: fonts, favicons, CV PDF, `me.webp`, `spotify-logo.svelte`, `spotify.ts`

- [ ] **Step 2: Verify .env is present**

```bash
ls -la .env
```

Expected: file exists with `VITE_SPOTIFY_*` vars.

---

## Task 6: Rewrite +layout.svelte

**Files:**

- Modify: `src/routes/+layout.svelte`

Svelte 5 replaces `<slot />` with `{@render children()}` from `$props()`.

- [ ] **Step 1: Rewrite the layout**

```svelte
<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<Nav />
<main class="mx-auto w-full">
  {@render children()}
</main>
<Footer />
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors relating to `+layout.svelte`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: rewrite layout to Svelte 5 runes"
```

---

## Task 7: Rewrite home page

**Files:**

- Modify: `src/routes/+page.svelte`
- Copy: `src/routes/+page.server.ts` (unchanged — plain TypeScript)

- [ ] **Step 1: Verify +page.server.ts is unchanged**

```bash
head -5 src/routes/+page.server.ts
```

Expected: starts with `import type { PageServerLoad }` — no changes needed.

- [ ] **Step 2: Rewrite +page.svelte**

`$app/stores` `page` is replaced by `$app/state` `page` (a reactive object, not a store — drop the `$` prefix when accessing properties):

```svelte
<script lang="ts">
  import type { PageData } from './$types';
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  import me from '$lib/assets/me.webp?enhanced';
  import { Head } from 'svead';
  import { page } from '$app/state';

  let { data }: { data: PageData } = $props();
</script>

<Head
  title="Matt Jones | Home"
  url={page.url.href}
  description="A full stack developer from wales"
/>

<section>
  <div class="w-screen border-b-2 border-black bg-yellow-300 pt-8">
    <div class="container">
      <div class="prose prose-xl">
        <h1 class="mb-16 w-full">
          A full stack developer who likes to tinker with things
        </h1>

        <div
          class="not-prose absolute right-0 left-0 mx-auto w-24 -translate-y-[50%]"
        >
          <enhanced:img
            fetchpriority="high"
            alt="Matt Jones looking great"
            class="h-24 w-24 rounded-full border-2 border-black object-cover shadow-[5px_0px_black]"
            src={me}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<section class="w-screen border-b-2 border-black bg-white">
  <div class="container px-8 py-2 pt-16">
    <p class="prose-xl">
      Here's some things I've tinkered with in the past, there's a good chance
      they are now broken. Most of these projects have come from either wanting
      to try out new tech, or trying to make my life easier.
    </p>
    <ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li class="list-none rounded-xl border-2 border-black p-4">
        <a href="https://pantry.mattjones.wales" target="_blank">Pantry</a> A tool
        to import online recipes into one place
      </li>
      <li>
        <a href="https://dalanobarnes.com/" target="_blank">dalanobarnes.com</a>
        Dalano Barnes' personal website. A port from a previous wordpress site.
      </li>
      <li>
        <a href="https://parrot.mattjones.wales/" target="_blank">Parrrot</a>
        A tool to create a spotify playlist from a few songs, using their recommendation
        api
      </li>
      <li>
        <a href="https://fairrent-production.up.railway.app/" target="_blank"
          >Fair rent</a
        >
        <p>
          A tool to calculate a fair rent price between house mates, inspired by
          <a
            href="https://www.npr.org/transcripts/688849249"
            target="_blank"
            aria-label="Planet money podcast epsiode about the division problem"
          >
            this
          </a> episode of planet money
        </p>
      </li>
      <li>
        <a href="https://s.mattjones.wales/" target="_blank">Link shortener</a>
        A very simple link shortener built with svelte kit
      </li>
      <li>
        <a href="https://wengers-doc.vercel.app/" target="_blank">WengersDoc</a>
        Website for a friends podcast
      </li>
    </ul>
  </div>
</section>

<section class="w-screen bg-[#ff66ad] px-4 py-8">
  <div class="container flex w-full justify-center">
    <CurrentlyPlaying
      isPlaying={data.isPlaying}
      currentSong={data.currentSong}
      lastSong={data.lastPlayed}
    />
  </div>
</section>

<style>
  li {
    @apply flex list-none flex-col rounded-xl border-2 border-black p-4 text-lg md:min-h-[150px];
  }

  li > a:first-child {
    @apply text-lg font-bold uppercase underline;
  }
</style>
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: no errors for home page files.

- [ ] **Step 4: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: rewrite home page to Svelte 5 runes"
```

---

## Task 8: Rewrite top-tracks page

**Files:**

- Modify: `src/routes/top-tracks/+page.svelte`
- Copy: `src/routes/top-tracks/+page.server.ts` (unchanged)

- [ ] **Step 1: Verify +page.server.ts is unchanged**

```bash
head -5 src/routes/top-tracks/+page.server.ts
```

Expected: starts with `import { getAuthenticatedSpotifyApi }` — no changes needed.

- [ ] **Step 2: Rewrite +page.svelte**

```svelte
<script lang="ts">
  import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
  import { Head } from 'svead';
  import type { PageData } from './$types';
  import { page } from '$app/state';

  let { data }: { data: PageData } = $props();
</script>

<Head
  title="Matt Jones | Top Tracks"
  url={page.url.href}
  description="Matt Jones' most listened to tracks"
/>

<section class="w-full bg-[#00e3ff] py-8">
  <div class="container prose prose-lg">
    <h1 class="mb-4 flex items-center justify-center">
      <div class="h-12 w-12">
        <SpotifyLogo />
      </div>
      Top Tracks
    </h1>
    <p class="prose-2xl mt-0">
      Here's what I've been listening to over the past month or so, more info <a
        href="https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks"
        target="_blank"
      >
        here.
      </a>
    </p>

    <div class="not-prose mb-8 grid gap-y-4 text-xl">
      {#each data.topTracks as track}
        <div
          class="flex h-18 items-center rounded-2xl border-2 border-black bg-white p-6 shadow-[5px_5px_black] duration-200 ease-in-out hover:-rotate-[0.5deg] hover:shadow-none"
        >
          <div class="mr-6 aspect-square h-16 w-16">
            <img
              class="object-fit h-full w-full rounded-full border-2 border-black"
              src={track.album.images[1]?.url}
              alt="album cover"
            />
          </div>
          <div class="flex flex-col">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              class="line-clamp-1 font-medium hover:underline"
            >
              {track.name}
            </a>
            <div class="line-clamp-2 text-ellipsis text-gray-500">
              {track.artists.map((a) => a.name).join(', ')}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: no errors for top-tracks files.

- [ ] **Step 4: Commit**

```bash
git add src/routes/top-tracks/+page.svelte
git commit -m "feat: rewrite top-tracks page to Svelte 5 runes"
```

---

## Task 9: Rewrite CurrentlyPlaying component

**Files:**

- Modify: `src/components/CurrentlyPlaying.svelte`

`onMount`/`onDestroy` collapse into a single `$effect` with a cleanup return. `svelte:document` is replaced by direct `document.addEventListener`. The restart-on-visibility logic is refactored to manage the interval within the same closure.

- [ ] **Step 1: Rewrite CurrentlyPlaying.svelte**

```svelte
<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
  import type { Track } from '@ekwoka/spotify-api';
  import { History } from 'lucide-svelte';

  let {
    currentSong,
    isPlaying,
    lastSong
  }: {
    currentSong: (Track & { artist: string }) | undefined;
    isPlaying: boolean;
    lastSong: (Track & { artist: string }) | undefined;
  } = $props();

  $effect(() => {
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      interval = setInterval(() => invalidateAll(), 10000);
    };

    const handleVisibilityChange = () => {
      clearInterval(interval);
      if (!document.hidden) {
        invalidateAll();
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
</script>

<div
  class="flex w-full max-w-md flex-col items-center rounded border-2 border-black bg-white p-4 sm:w-auto"
>
  <div class="mb-4 flex items-center border-b-2 pb-4">
    <div class="mr-1 flex h-7 w-7 items-center justify-center">
      <SpotifyLogo />
    </div>

    <p class="line-clamp-1">
      {#if isPlaying && currentSong}
        <a
          href={currentSong.external_urls.spotify}
          target="_blank"
          class="font-medium hover:underline"
        >
          {currentSong.name}
        </a>
        {' - '}
        <span class="text-stone-600">{currentSong.artist}</span>
      {:else}
        Not currently jamming to any tunes
      {/if}
    </p>
  </div>
  {#if lastSong}
    <div class="flex items-center text-sm">
      <div class="mr-1"><History size={20} /></div>
      <p class="line-clamp-1">
        <a
          href={lastSong.external_urls.spotify}
          target="_blank"
          class="font-medium hover:underline"
        >
          {lastSong.name}
        </a>
        {' - '}
        <span class="text-stone-600">{lastSong.artist}</span>
      </p>
    </div>
  {/if}
</div>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CurrentlyPlaying.svelte
git commit -m "feat: rewrite CurrentlyPlaying to Svelte 5 runes"
```

---

## Task 10: Update Nav and Footer components

**Files:**

- Modify: `src/components/Nav.svelte`
- Modify: `src/components/Footer.svelte`

These have no reactive state, so they need minimal changes. Svelte 5 in legacy-compat mode would handle them as-is, but since we're fully on runes, verify they pass type check and lint clean.

- [ ] **Step 1: Run check on both components**

```bash
npm run check 2>&1 | grep -E 'Nav|Footer'
```

Expected: no errors. If there are none, no file changes are needed — skip to Step 3.

- [ ] **Step 2: Fix any errors**

If `svelte-check` complains about implicit `any` or missing types, add a `lang="ts"` attribute to the `<script>` tag in each component.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors. Run `npm run format` to fix any formatting issues, then re-run lint.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.svelte src/components/Footer.svelte
git commit -m "chore: verify Nav and Footer compatible with Svelte 5"
```

---

## Task 11: Full verification and smoke test

- [ ] **Step 1: Full type check**

```bash
npm run check
```

Expected: zero errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: zero errors.

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: build completes with no errors. Ignore warnings about missing `VITE_SPOTIFY_*` env vars if not set locally — they're set in Vercel.

- [ ] **Step 4: Dev server smoke test**

```bash
npm run dev
```

Open `http://localhost:5173` and verify:

- Home page renders with yellow hero section and profile photo
- Projects list renders
- Spotify widget renders (will show "Not currently jamming" if env vars not set)
- Nav links to `/top-tracks` work
- `/top-tracks` route renders (will be empty or error gracefully without Spotify creds)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: complete Svelte 5 + SvelteKit 2 migration"
```
