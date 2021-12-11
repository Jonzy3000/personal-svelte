<script>
  import '../app.css';
</script>

<div class="flex flex-col items-center p-8 mx-auto max-w-lg w-full h-full">
  <slot />
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
