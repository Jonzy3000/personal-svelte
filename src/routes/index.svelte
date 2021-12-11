<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/api/current-song');

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
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  export let currentSong;
</script>

<main class="flex flex-col items-center p-8 mx-auto max-w-lg">
  <p class="text-4xl my-16 max-w-xs">
    A full stack developer from, you gussed it, <span
      class="underline text-red-600">Wales.</span
    >
  </p>

  <div>
    <CurrentlyPlaying {currentSong} />
  </div>
</main>
