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
  class="flex flex-col mx-auto max-w-xl w-full min-h-screen px-16 border-x border-black"
>
  <Nav />
  <main class="flex flex-col w-full">
    <slot />
  </main>
  <Footer />
</div>
