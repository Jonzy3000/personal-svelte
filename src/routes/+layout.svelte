<script>
  import Footer from '$components/Footer.svelte';
  import Nav from '$components/Nav.svelte';
  import '../app.css';
</script>

<Nav />
<main class="w-full mx-auto">
  <slot />
</main>
<Footer />
