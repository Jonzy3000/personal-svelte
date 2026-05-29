<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<Nav />
<main class="mx-auto w-full">
  {@render children()}
</main>
<Footer />
