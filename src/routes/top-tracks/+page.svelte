<script lang="ts">
  import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
  import { Head } from 'svead';
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  export let data: PageData;
</script>

<Head
  title="Matt Jones | Top Tracks"
  url={$page.url.href}
  description="Matt Jones' most listened to tracks"
/>

<section class="w-full py-8 bg-[#00e3ff]">
  <div class=" container prose prose-lgr">
    <h1 class="items-center justify-center flex mb-4">
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

    <div class="grid gap-y-4 mb-8 not-prose text-xl">
      {#each data.topTracks as track}
        <div
          class="flex items-center h-18 p-6 rounded-2xl bg-white border-2 border-black duration-200 ease-in-out hover:shadow-none shadow-[5px_5px_black] hover:-rotate-[0.5deg]"
        >
          <div class="h-16 w-16 mr-6 aspect-square">
            <img
              class="object-fit border-2 border-black rounded-full w-full h-full"
              src={track.album.images[1]?.url}
              alt="album cover"
            />
          </div>
          <div class="flex flex-col">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              class="font-medium hover:underline line-clamp-1"
            >
              {track.name}
            </a>
            <div class="text-gray-500 text-ellipsis line-clamp-2">
              {track.artists.map((a) => a.name).join(', ')}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
