<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
  <title>Matt Jones</title>
</svelte:head>

<div
  data-sveltekit-preload-data
  class="flex flex-col mx-auto max-w-xl w-full min-h-screen border-black px-4 sm:px-16 sm:border-x"
>
  <Nav />
  <main class="flex flex-col flex-1 w-full">
    <slot />
  </main>
  <Footer />
</div>
