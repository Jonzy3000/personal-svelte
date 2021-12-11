<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/current-song');

    if (res.ok) {
      return {
        props: {
          currentSong: await res.json(),
        },
      };
    }
  };
</script>

<script lang="ts">
  import SpotifyLogo from '$resources/spotify-logo.svg';
  export let currentSong;
</script>

<main class="flex flex-col items-center p-8 mx-auto max-w-lg">
  <p class="text-4xl my-16 max-w-xs">
    A full stack developer from, you gussed it, <span
      class="underline text-red-600">Wales.</span
    >
  </p>

  <div>
    {#if currentSong.isPlaying}
      <div class="flex">
        <div class="h-6 w-6">
          <SpotifyLogo width="100%" height="100%" />
        </div>
        {currentSong.title} - {currentSong.artist}
      </div>
    {:else}
      Not currently jamming to any tunes
    {/if}
  </div>
</main>
