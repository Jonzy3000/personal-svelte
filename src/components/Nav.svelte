<script>
  import { SiGithub } from '@icons-pack/svelte-simple-icons';
</script>

<nav
  class="flex justify-center border-b-2 border-black bg-white px-4 uppercase md:px-0"
>
  <div class="container flex w-full flex-row justify-between px-4 py-4">
    <div class="flex items-center space-x-4">
      <a class="hover:underline" href="/">Home</a>
      <a class="hover:underline" href="/top-tracks">Top Tracks</a>
    </div>
    <div class="flex items-center space-x-6 sm:space-x-4">
      <a
        class="rounded border-2 border-black bg-pink-100 p-1 shadow-[0px_2px_black] transition-shadow hover:underline hover:shadow-[1px_-2px_black]"
        target="_blank"
        href="https://github.com/Jonzy3000/personal-svelte"
        aria-label="Matt Jones' github"
      >
        <SiGithub size={24} />
      </a>
      <a
        class="rounded border-2 border-black bg-blue-100 p-1 shadow-[0px_2px_black] transition-shadow hover:underline hover:shadow-[1px_-2px_black]"
        target="_blank"
        href="https://www.linkedin.com/in/matt-jones123/"
        aria-label="Matt Jones' linkedin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      </a>
      <a
        class="rounded border-2 border-black bg-green-100 p-1 shadow-[0px_2px_black] transition-shadow hover:underline hover:shadow-[1px_-2px_black]"
        target="_blank"
        href="/mattjones_cv.pdf"
      >
        CV
      </a>
    </div>
  </div>
</nav>
