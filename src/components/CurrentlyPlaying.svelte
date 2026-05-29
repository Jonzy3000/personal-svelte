<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import SpotifyLogo from '$lib/assets/spotify-logo.svelte';
	import type { Track } from '@ekwoka/spotify-api';
	import { History } from 'lucide-svelte';

	let {
		currentSong,
		isPlaying,
		lastSong,
	}: {
		currentSong: (Track & { artist: string }) | undefined;
		isPlaying: boolean;
		lastSong: (Track & { artist: string }) | undefined;
	} = $props();

	$effect(() => {
		let interval: ReturnType<typeof setInterval>;

		const start = () => {
			interval = setInterval(() => invalidateAll(), 10000);
		};

		const handleVisibilityChange = () => {
			clearInterval(interval);
			if (!document.hidden) {
				invalidateAll();
				start();
			}
		};

		start();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			clearInterval(interval);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<div
	class="flex flex-col items-center bg-white p-4 border-2 border-black rounded w-full max-w-md sm:w-auto"
>
	<div class="flex items-center border-b-2 pb-4 mb-4">
		<div class="h-7 w-7 flex justify-center items-center mr-1">
			<SpotifyLogo />
		</div>

		<p class="line-clamp-1">
			{#if isPlaying && currentSong}
				<a
					href={currentSong.external_urls.spotify}
					target="_blank"
					class="font-medium hover:underline"
				>
					{currentSong.name}
				</a>
				{' - '}
				<span class="text-stone-600">{currentSong.artist}</span>
			{:else}
				Not currently jamming to any tunes
			{/if}
		</p>
	</div>
	{#if lastSong}
		<div class="flex text-sm items-center">
			<div class="mr-1"><History size={20} /></div>
			<p class="line-clamp-1">
				<a
					href={lastSong.external_urls.spotify}
					target="_blank"
					class="font-medium hover:underline"
				>
					{lastSong.name}
				</a>
				{' - '}
				<span class="text-stone-600">{lastSong.artist}</span>
			</p>
		</div>
	{/if}
</div>
