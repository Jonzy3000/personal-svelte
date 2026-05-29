<script lang="ts">
	import type { PageData } from './$types';
	import CurrentlyPlaying from '$components/CurrentlyPlaying.svelte';
	import me from '$lib/assets/me.webp?enhanced';
	import { Head } from 'svead';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();
</script>

<Head
	seo_config={{
		title: 'Matt Jones | Home',
		url: page.url.href,
		description: 'A full stack developer from wales'
	}}
/>

<section>
	<div class="w-screen border-b-2 border-black bg-yellow-300 pt-8">
		<div class="container">
			<div class="prose prose-xl">
				<h1 class="mb-16 w-full">
					A full stack developer who likes to tinker with things
				</h1>

				<div
					class="not-prose absolute right-0 left-0 mx-auto w-24 -translate-y-[50%]"
				>
					<enhanced:img
						fetchpriority="high"
						alt="Matt Jones looking great"
						class="h-24 w-24 rounded-full border-2 border-black object-cover shadow-[5px_0px_black]"
						src={me}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="w-screen border-b-2 border-black bg-white">
	<div class="container px-8 py-2 pt-16">
		<p class="prose-xl">
			Here's some things I've tinkered with in the past, there's a good chance
			they are now broken. Most of these projects have come from either wanting
			to try out new tech, or trying to make my life easier.
		</p>
		<ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<li class="list-none rounded-xl border-2 border-black p-4">
				<a href="https://pantry.mattjones.wales" target="_blank">Pantry</a> A tool
				to import online recipes into one place
			</li>
			<li>
				<a href="https://dalanobarnes.com/" target="_blank">dalanobarnes.com</a>
				Dalano Barnes' personal website. A port from a previous wordpress site.
			</li>
			<li>
				<a href="https://parrot.mattjones.wales/" target="_blank">Parrrot</a>
				A tool to create a spotify playlist from a few songs, using their recommendation
				api
			</li>
			<li>
				<a href="https://fairrent-production.up.railway.app/" target="_blank"
					>Fair rent</a
				>
				<p>
					A tool to calculate a fair rent price between house mates, inspired by
					<a
						href="https://www.npr.org/transcripts/688849249"
						target="_blank"
						aria-label="Planet money podcast epsiode about the division problem"
					>
						this
					</a> episode of planet money
				</p>
			</li>
			<li>
				<a href="https://s.mattjones.wales/" target="_blank">Link shortener</a>
				A very simple link shortener built with svelte kit
			</li>
			<li>
				<a href="https://wengers-doc.vercel.app/" target="_blank">WengersDoc</a>
				Website for a friends podcast
			</li>
		</ul>
	</div>
</section>

<section class="w-screen bg-[#ff66ad] px-4 py-8">
	<div class="container flex w-full justify-center">
		<CurrentlyPlaying
			isPlaying={data.isPlaying}
			currentSong={data.currentSong}
			lastSong={data.lastPlayed}
		/>
	</div>
</section>

<style>
	li {
		display: flex;
		list-style: none;
		flex-direction: column;
		border-radius: 0.75rem;
		border-width: 2px;
		border-color: black;
		padding: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	@media (min-width: 768px) {
		li {
			min-height: 150px;
		}
	}

	li > a:first-child {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 700;
		text-transform: uppercase;
		text-decoration: underline;
	}
</style>
