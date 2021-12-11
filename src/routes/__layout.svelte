<script>
  import '../app.css';
</script>

<div class="flex flex-col px-8 pt-2 mx-auto max-w-lg w-full h-full">
  <nav class="flex flex-row space-x-4 w-full">
    <a class="hover:underline" href="/">Home</a>
    <a class="hover:underline" href="/top-tracks">Top Tracks</a>
  </nav>
  <div class="flex flex-col mt-16 w-full items-center">
    <slot />
  </div>
  <footer
    class="flex flex-col items-center mt-auto pt-4 text-gray-400 border-t w-full"
  >
    <div>
      Built with {' '}
      <a
        class="text-red-600 hover:underline"
        href="https://kit.svelte.dev"
        target="#">svelte kit</a
      >
    </div>
  </footer>
</div>
