<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/api/top-tracks', { credentials: 'omit' });

    if (res.ok) {
      return {
        props: {
          topTracks: (await res.json()).items,
        },
        maxage: 60 * 60,
      };
    }
  };
</script>

<script lang="ts">
  import SpotifyLogo from '$resources/spotify-logo.svg';
  export let topTracks;
</script>

<h1 class="text-4xl mb-16 flex">
  <div class="h-11 w-11">
    <SpotifyLogo width="100%" height="100%" />
  </div>
  Top Tracks
</h1>

{#each topTracks as track}
  <div
    class="flex flex-row w-full items-center shadow h-24 shadow-stone-300 rounded p-2 mb-8"
  >
    <div class="h-16 w-16 mr-6 aspect-square">
      <img
        class="object-fit rounded-full w-full h-full"
        src={track.album.images[1]?.url}
        alt="album cover"
      />
    </div>
    <div class="flex flex-col">
      <div class="font-medium">{track.name}</div>
      <div class="text-stone-600 text-ellipsis line-clamp-2">
        {track.artists.map((a) => a.name).join(', ')}
      </div>
    </div>
  </div>
{/each}
