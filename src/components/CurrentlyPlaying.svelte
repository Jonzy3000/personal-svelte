<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import TidalLogo from '$lib/assets/tidal-logo.svelte';
  import type { NormalizedTrack } from '$lib/server/lastfm/lastfm';
  import { History } from 'lucide-svelte';

  let {
    currentSong,
    isPlaying,
    lastSong
  }: {
    currentSong: NormalizedTrack | undefined;
    isPlaying: boolean;
    lastSong: NormalizedTrack | undefined;
  } = $props();

  $effect(() => {
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      interval = setInterval(() => invalidateAll(), 10000);
    };

    const handleVisibilityChange = () => {
      clearInterval(interval);
      if (!document.hidden) {
        invalidateAll();
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
</script>

<div
  class="flex w-full max-w-md flex-col items-center rounded border-2 border-black bg-white p-4 sm:w-auto"
>
  <div class="mb-4 flex items-center border-b-2 pb-4">
    <div class="mr-1 flex h-7 w-7 items-center justify-center">
      <TidalLogo />
    </div>

    <p class="line-clamp-1">
      {#if isPlaying && currentSong}
        <a
          href={currentSong.url}
          target="_blank"
          class="font-medium hover:underline"
        >
          {currentSong.name}
        </a>
        -
        <span class="text-stone-600">{currentSong.artist}</span>
      {:else}
        Not currently jamming to any tunes
      {/if}
    </p>
  </div>
  {#if lastSong}
    <div class="flex items-center text-sm">
      <div class="mr-1"><History size={20} /></div>
      <p class="line-clamp-1">
        <a
          href={lastSong.url}
          target="_blank"
          class="font-medium hover:underline"
        >
          {lastSong.name}
        </a>
        -
        <span class="text-stone-600">{lastSong.artist}</span>
      </p>
    </div>
  {/if}
</div>
