<script lang="ts">
  import { Github, Linkedin } from 'lucide-svelte';
</script>

<nav
  class="flex flex-row justify-between space-x-4 mt-4 mb-4 -mx-4 px-4 sm:-mx-16 sm:px-16 pb-4 uppercase border-b border-black sm:text-sm"
>
  <div class="space-x-4 flex items-center">
    <a class="hover:underline" href="/">Home</a>
    <a class="hover:underline" href="/top-tracks">Top Tracks</a>
  </div>
  <div class="flex space-x-6 sm:space-x-4 items-center">
    <a
      class="hover:underline"
      target="_blank"
      href="https://github.com/Jonzy3000/personal-svelte"
    >
      <span class="block sm:hidden">
        <Github strokeWidth="1" size="24" />
      </span>
      <span class="hidden sm:block">Github</span>
    </a>
    <a
      class="hover:underline"
      target="_blank"
      href="https://www.linkedin.com/in/matt-jones123/"
    >
      <span class="block sm:hidden">
        <Linkedin strokeWidth="1" size="24" />
      </span>
      <span class="hidden sm:block">LinkedIn</span>
    </a>
    <a class="hover:underline" target="_blank" href="/mattjones_cv.pdf"> CV </a>
  </div>
</nav>
