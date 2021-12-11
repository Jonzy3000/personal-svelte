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
