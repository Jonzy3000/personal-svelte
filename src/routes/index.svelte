<script lang="ts">
	import Counter from '$lib/Counter.svelte';

	export let currentSong;
</script>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page, fetch, session, context }) => {
		   const res = await fetch('/current-song');

		   if (res.ok) {
			   return {
				   props: {
					   currentSong: await res.json()
				   }
			   }
		   }
	   }
</script>

<main class="flex flex-col items-center p-4">
	<h1 class="uppercase text-7xl my-16 mx-auto text-red-500 max-w-xs sm:max-w-none">Hello world!</h1>

	<Counter />

	<p class="my-8 mx-auto leading-5 max-w-xs sm:max-w-none">Visit <a class="text-red-500" href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.</p>

	<div>
		Currently Playing: {currentSong.title} - {currentSong.artist}
	</div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
			/*

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	} */
</style>