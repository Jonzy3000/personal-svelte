<script lang="ts">
  import type { PageData } from './$types';
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  export let data: PageData;
  import me from '$lib/assets/me.webp';
</script>

<section class="prose mb-8">
  <h1 class="mb-4">A full stack developer who likes to tinker with things</h1>
  <img
    alt="Matt Jones looking great"
    class="mx-auto my-0 w-24 h-24 rounded-full object-cover flex-1"
    src={me}
  />
  <p>
    Here's some things I've tinkered with in the past, there's a good chance
    they are now broken. Most of these projects have come from either wanting to
    try out new tech, or trying to make my life easier.
  </p>
  <ul>
    <li>
      <a href="https://pantry.mattjones.wales" target="_blank">Pantry</a> - A tool
      to import online recipes into one place
    </li>
    <li>
      <a href="https://parrrot.netlify.app" target="_blank">Parrrot</a>
      - A tool to create a spotify playlist from a few songs, using their recommendation
      api
    </li>
    <li>
      <a href="https://s.mattjones.wales/" target="_blank">Link shortener</a> - A
      very simple link shortener built with svelte kit
    </li>
    <li>
      <a href="https://fairrent-production.up.railway.app/" target="_blank"
        >Fair rent</a
      >
      - A tool to calculate a fair rent price for a house, inspired by
      <a href="https://www.npr.org/transcripts/688849249" target="_blank"
        >this</a
      > episode of planet money
    </li>
    <li>
      <a href="https://wengersdoc.com/" target="_blank"> WengersDoc</a> - Website
      for a friends podcast
    </li>
  </ul>
</section>

<div class="flex justify-center w-full mt-auto mb-4">
  <CurrentlyPlaying currentSong={data} />
</div>
