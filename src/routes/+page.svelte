<script lang="ts">
  import type { PageData } from './$types';
  import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
  import me from '$lib/assets/me.webp';
  import c from 'classnames';
  import { spring } from 'svelte/motion';

  export let data: PageData;
  let eye1: HTMLDivElement;
  let eye2: HTMLDivElement;
  let eyesHidden = true;
  let rot = spring(0, { stiffness: 0.05, damping: 0.7 });
</script>

<!-- Shamefully copied from https://github.com/pocketbase/site/blob/2dd22ee2365c8dac325f7bbe7e825d6c0345c909/src/routes/(blank)/%2Bpage.svelte#L273 -->
<svelte:window
  on:mousemove={(e) => {
    if (eye1 && !eyesHidden) {
      const leftRect = eye1.getBoundingClientRect();

      // calc the radius of one of the eye (they are the same size)
      const leftX = leftRect.left + window.scrollX + leftRect.width / 2;
      const leftY = leftRect.top + window.scrollY + leftRect.height / 2;
      const rad = Math.atan2(e.pageX - leftX, e.pageY - leftY);
      const rotation = rad * (180 / Math.PI) * -1 + 180;
      rot.set(rotation);
    }
  }}
/>

<section class="prose mb-8">
  <h1 class="mb-4">A full stack developer who likes to tinker with things</h1>

  <!-- 
    These eye divs are causing weird layout shifts
    Hence the weird negative margins
  -->
  <div class="-mt-16 -mb-10 mx-auto w-24">
    <div
      class={c({ invisible: eyesHidden }, 'eye top-[74px] left-[24px]')}
      bind:this={eye1}
      style={'transform:' + `rotate(${$rot}deg)`}
    />
    <div
      class={c({ invisible: eyesHidden }, 'eye top-[74px] left-[32px]')}
      bind:this={eye2}
      style={'transform:' + `rotate(${$rot}deg)`}
    />
    <button on:click={() => (eyesHidden = !eyesHidden)}>
      <img
        alt="Matt Jones looking great"
        class="w-24 h-24 rounded-full object-cover"
        src={me}
      />
    </button>
  </div>
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

<style>
  .eye {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    background: rgba(255, 255, 255, 0.2);
  }
  .eye:after {
    /*pupil*/
    position: absolute;
    bottom: 12px;
    right: 5px;
    width: 6px;
    height: 6px;
    background: #000;
    border-radius: 50%;
    content: ' ';
  }
</style>
