<script lang="ts">
  import type { PageData } from './$types';
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>Matt Jones</title>
</svelte:head>

<p class="text-4xl mb-16">
  A full stack developer from, you gussed it, <span
    class="underline text-red-600">Wales.</span
  >
</p>

<div>
  <CurrentlyPlaying currentSong={data} />
</div>