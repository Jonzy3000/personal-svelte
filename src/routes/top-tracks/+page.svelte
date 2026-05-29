<script lang="ts">
  import TidalLogo from '$lib/assets/tidal-logo.svelte';
  import { Head } from 'svead';
  import type { PageData } from './$types';
  import { page } from '$app/state';

  let { data }: { data: PageData } = $props();
</script>

<Head
  seo_config={{
    title: 'Matt Jones | Top Tracks',
    url: page.url.href,
    description: "Matt Jones' most listened to tracks"
  }}
/>

<section class="w-full bg-[#00e3ff] py-8">
  <div class="container prose prose-lg">
    <h1 class="mb-4 flex items-center justify-center">
      <div class="mr-3 h-12 w-12">
        <TidalLogo />
      </div>
      Top Tracks
    </h1>
    <p class="prose-2xl mt-0">
      Here's what I've been listening to over the past month or so, more info <a
        href="https://www.last.fm/api/show/user.getTopTracks"
        target="_blank"
      >
        here.
      </a>
    </p>

    <div class="not-prose mb-8 grid gap-y-4 text-xl">
      {#each data.topTracks as track (track.url)}
        <div
          class="flex h-18 items-center rounded-2xl border-2 border-black bg-white p-6 shadow-[5px_5px_black] duration-200 ease-in-out hover:-rotate-[0.5deg] hover:shadow-none"
        >
          <div class="mr-6 aspect-square h-16 w-16">
            <img
              class="object-fit h-full w-full rounded-full border-2 border-black"
              src={track.image}
              alt="album cover"
            />
          </div>
          <div class="flex flex-col">
            <a
              href={track.url}
              target="_blank"
              class="line-clamp-1 font-medium hover:underline"
            >
              {track.name}
            </a>
            <div class="line-clamp-2 text-ellipsis text-gray-500">
              {track.artist}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
