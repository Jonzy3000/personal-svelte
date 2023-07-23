<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
  import { onDestroy, onMount } from 'svelte';
  export let currentSong: {
    title?: string | undefined;
    isPlaying: boolean;
    songUrl?: string | undefined;
    artist?: string | undefined;
  };
  let songInterval: number;

  onMount(async () => {
    songInterval = setInterval(() => {
      // Super hacky, but will call the load function again of this page to get updated song
      // Other option would be to use a +server.js for current-song
      invalidateAll();
    }, 10000);
  });

  onDestroy(() => {
    clearInterval(songInterval);
  });
</script>

<div
  class="flex items-center bg-white p-4 border-2 border-black rounded w-full sm:w-auto"
>
  <div class="h-7 w-7 flex justify-center items-center mr-1">
    <SpotifyLogo />
  </div>
  {#if currentSong.isPlaying}
    <p>
      <a
        href={currentSong.songUrl}
        target="_blank"
        class="font-medium hover:underline"
      >
        {currentSong.title}
      </a>
      {' - '}
      <span class="text-stone-600">{currentSong.artist}</span>
    </p>
  {:else}
    Not currently jamming to any tunes
  {/if}
</div>
