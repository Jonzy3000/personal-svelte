<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import SpotifyLogo from '$resources/spotify-logo.svg';
  import { onDestroy, onMount } from 'svelte';
  export let currentSong;
  let songInterval;

  onMount(async () => {
    songInterval = setInterval(() => {
      // Super hacky, but will call the load function again of this page to get updated song
      // Other option would be to use a +server.js for current-song
      invalidateAll();
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(songInterval);
  });
</script>

<div class="flex text-lg">
  <div class="h-7 w-7">
    <SpotifyLogo width="100%" height="100%" />
  </div>
  {#if currentSong.isPlaying}
    <p>
      <span class="font-medium">{currentSong.title}</span>{' - '}
      <span class="text-stone-600">{currentSong.artist}</span>
    </p>
  {:else}
    Not currently jamming to any tunes
  {/if}
</div>
