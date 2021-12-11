<script lang="ts">
  import SpotifyLogo from '$resources/spotify-logo.svg';
  import { onDestroy, onMount } from 'svelte';
  export let currentSong;
  let songInterval;

  const fetchCurrentSong = async () => {
    const res = await fetch('/api/current-song');
    if (res.ok) {
      currentSong = await res.json();
    }
  };

  onMount(async () => {
    songInterval = setInterval(() => {
      fetchCurrentSong();
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
