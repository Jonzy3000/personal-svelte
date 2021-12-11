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
  import Counter from '$lib/Counter.svelte';

  export let currentSong;
</script>

<main class="p-4 mx-auto max-w-xs sm:max-w-none">
  <h1 class="uppercase text-7xl my-16 text-red-500 ">Hello world!</h1>

  <Counter />

  <p class="my-8 leading-5">
    Visit <a class="text-red-500" href="https://svelte.dev">svelte.dev</a> to learn
    how to build Svelte apps.
  </p>

  <div>
    {#if currentSong.isPlaying}
      Currently Playing: {currentSong.title} - {currentSong.artist}
    {:else}
      Not currently jamming to any tunes
    {/if}
  </div>
</main>
