<script lang="ts">
  import { Github, Linkedin } from 'lucide-svelte';
</script>

<nav
  class="flex bg-white justify-center px-4 md:px-0 uppercase border-b-2 border-black"
>
  <div class="flex flex-row py-4 px-4 justify-between container w-full">
    <div class="space-x-4 flex items-center">
      <a class="hover:underline" href="/">Home</a>
      <a class="hover:underline" href="/top-tracks">Top Tracks</a>
    </div>
    <div class="flex space-x-6 sm:space-x-4 items-center">
      <a
        class="hover:underline border-2 border-black rounded p-1 bg-pink-100 shadow-[0px_2px_black] hover:shadow-[1px_-2px_black] transition-shadow"
        target="_blank"
        href="https://github.com/Jonzy3000/personal-svelte"
      >
        <Github strokeWidth="1" size="24" />
      </a>
      <a
        class="hover:underline border-2 border-black rounded p-1 bg-blue-100 shadow-[0px_2px_black] hover:shadow-[1px_-2px_black] transition-shadow"
        target="_blank"
        href="https://www.linkedin.com/in/matt-jones123/"
      >
        <Linkedin strokeWidth="1" size="24" />
      </a>
      <a
        class="hover:underline border-2 border-black rounded p-1 bg-green-100 shadow-[0px_2px_black] hover:shadow-[1px_-2px_black] transition-shadow"
        target="_blank"
        href="/mattjones_cv.pdf"
      >
        CV
      </a>
    </div>
  </div>
</nav>
