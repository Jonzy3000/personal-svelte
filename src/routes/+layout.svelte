<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<div
  data-sveltekit-preload-data
  class="flex flex-col mx-auto max-w-lg w-full h-full px-4"
>
  <Nav />
  <main class="flex flex-col w-full">
    <slot />
  </main>
  <Footer />
</div>
