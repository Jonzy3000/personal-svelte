<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
  import type { Track } from '@ekwoka/spotify-api';
  import { History } from 'lucide-svelte';
  import { onDestroy, onMount } from 'svelte';
  import PlaySong from './PlaySong.svelte';

  export let currentSong: (Track & { artist: string }) | undefined;
  export let isPlaying: boolean;
  export let lastSong: (Track & { artist: string }) | undefined;

  let songInterval: number;

  onMount(async () => {
    setupInterval();
  });

  const setupInterval = () => {
    songInterval = setInterval(() => {
      // Super hacky, but will call the load function again of this page to get updated song
      // Other option would be to use a +server.js for current-song
      invalidateAll();
    }, 10000);
  };

  onDestroy(() => {
    clearInterval(songInterval);
  });

  const handleVisiblityChange = () => {
    if (document.hidden) {
      clearInterval(songInterval);
    } else {
      invalidateAll();
      setupInterval();
    }
  };
</script>

<svelte:document on:visibilitychange={handleVisiblityChange} />

<div
  class="flex flex-col items-center bg-white p-4 border-2 border-black rounded w-full max-w-md sm:w-auto"
>
  <div class="flex items-center border-b-2 pb-4 mb-4">
    <div class="h-7 w-7 flex justify-center items-center mr-1">
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
    <div class="flex text-sm items-center">
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

{#if lastSong}
  <div class="ml-8 h-[118px] flex items-center">
    <PlaySong songUrl={currentSong?.preview_url || lastSong.preview_url} />
  </div>
{/if}
