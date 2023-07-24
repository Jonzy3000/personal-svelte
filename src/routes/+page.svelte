<script lang="ts">
  import type { PageData } from './$types';
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  import me from '$lib/assets/me.webp';
  import { Head } from 'svead';
  import { page } from '$app/stores';

  export let data: PageData;
</script>

<Head
  title="Matt Jones | Home"
  url={$page.url.href}
  description="A full stack developer from wales"
/>

<section>
  <div class="w-screen border-b-2 border-black pt-8 bg-yellow-300">
    <div class="container">
      <div class="prose prose-xl">
        <h1 class="w-full mb-16">
          A full stack developer who likes to tinker with things
        </h1>

        <div
          class="mx-auto left-0 right-0 w-24 -translate-y-[50%] not-prose absolute"
        >
          <img
            alt="Matt Jones looking great"
            class="w-24 h-24 border-black border-2 shadow-[5px_0px_black] rounded-full object-cover"
            src={me}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<section class="w-screen bg-white border-b-2 border-black">
  <div class=" pt-16 px-8 py-2 container">
    <p class="prose-xl">
      Here's some things I've tinkered with in the past, there's a good chance
      they are now broken. Most of these projects have come from either wanting
      to try out new tech, or trying to make my life easier.
    </p>
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      <li class="border-2 border-black p-4 rounded-xl list-none">
        <a href="https://pantry.mattjones.wales" target="_blank">Pantry</a> A tool
        to import online recipes into one place
      </li>
      <li>
        <a href="https://dalanobarnes.com/" target="_blank">
          dalanobarnes.com
        </a>
        Dalano Barnes' personal website. A port from a previous wordpress site.
      </li>
      <li>
        <a href="https://parrrot.netlify.app" target="_blank">Parrrot</a>
        A tool to create a spotify playlist from a few songs, using their recommendation
        api
      </li>

      <li>
        <a href="https://fairrent-production.up.railway.app/" target="_blank">
          Fair rent
        </a>
        <p>
          A tool to calculate a fair rent price between house mates, inspired by
          <a
            href="https://www.npr.org/transcripts/688849249"
            target="_blank"
            aria-label="Planet money podcast epsiode about the division problem"
          >
            this
          </a> episode of planet money
        </p>
      </li>
      <li>
        <a href="https://s.mattjones.wales/" target="_blank">Link shortener</a>
        A very simple link shortener built with svelte kit
      </li>
      <li>
        <a href="https://wengersdoc.com/" target="_blank"> WengersDoc </a>
        Website for a friends podcast
      </li>
    </ul>
  </div>
</section>

<section class="w-screen bg-[#ff66ad] py-8 px-4">
  <div class="flex justify-center container w-full">
    <CurrentlyPlaying currentSong={data} />
  </div>
</section>

<style>
  li {
    @apply border-2 border-black p-4 rounded-xl list-none flex flex-col text-lg md:min-h-[150px];
  }

  li > a:first-child {
    @apply font-bold underline uppercase text-lg;
  }
</style>
