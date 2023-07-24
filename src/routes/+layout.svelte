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

<svelte:head>
  <style>
    @font-face {
      font-family: 'Archivo';
      src: url('/archivo-latin-400-normal.woff2');
      font-display: swap;
    }

    @font-face {
      font-family: 'Archivo';
      font-weight: 800;
      src: url('/archivo-latin-800-normal.woff2');
      font-display: swap;
    }

    @font-face {
      font-family: 'Archivo';
      font-weight: 500;
      src: url('/archivo-latin-500-normal.woff2');
      font-display: swap;
    }

    html,
    body,
    #svelte {
      width: 100%;
      height: 100%;
      font-family: 'Archivo', sans-serif;
    }
  </style>
</svelte:head>
