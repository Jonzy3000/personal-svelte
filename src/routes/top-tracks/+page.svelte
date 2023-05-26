<script lang="ts">
  import SpotifyLogo from '$resources/spotify-logo.svg';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1 class="text-4xl items-center justify-center flex mb-4">
  <div class="h-12 w-12">
    <SpotifyLogo width="100%" height="100%" />
  </div>
  Top Tracks
</h1>

<div class="grid -mx-16">
  {#each data.topTracks as track}
    <div class="flex px-16 py-4 flex-row w-full items-center h-18">
      <div class="h-16 w-16 mr-6 aspect-square">
        <img
          class="object-fit rounded-full w-full h-full"
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
        <div class="text-stone-600 text-ellipsis line-clamp-2">
          {track.artists.map((a) => a.name).join(', ')}
        </div>
      </div>
    </div>
  {/each}
</div>
