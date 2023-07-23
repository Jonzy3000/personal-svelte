<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<div data-sveltekit-preload-data class="min-h-screen">
  <Nav />
  <main class="w-full mx-auto">
    <slot />
  </main>
  <Footer />
</div>
