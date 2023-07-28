<script lang="ts">
  import { browser } from '$app/environment';
  import { Volume2, VolumeX } from 'lucide-svelte';
  export let songUrl: string;
  let audioRef: HTMLAudioElement;

  let isMuted = true;
  let size = 32;

  $: {
    if (browser && audioRef) {
      if (audioRef.paused) {
        audioRef.play();
      }
      audioRef.volume = isMuted ? 0 : 0.5;
    }
  }
</script>

<button on:click={() => (isMuted = !isMuted)}>
  {#if isMuted}
    <VolumeX {size} />
  {:else}
    <Volume2 {size} />
  {/if}
</button>

<audio bind:this={audioRef} loop class="hidden" src={songUrl} />
