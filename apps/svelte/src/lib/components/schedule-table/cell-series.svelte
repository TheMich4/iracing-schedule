<script lang="ts">
	import type { WeekEntry } from '@iracing-schedule/data';
	import FavoriteIcon from '../favorite-icon.svelte';

	type Props = {
		favorite: any;
		row: WeekEntry;
	};

	let { favorite, row } = $props<Props>();

	let isFavorite = $state(favorite.series[row.seriesId] ?? false);

	const handleClick = async () => {
		console.log({ isFavorite, favorite, x: favorite.series[row.seriesId], id: row.seriesId });

		await fetch('api/session/favorite', {
			method: 'PUT',
			body: JSON.stringify({ type: 'series', id: row.seriesId })
		});

		isFavorite = !isFavorite;
	};
</script>

<a class="group inline-flex cursor-pointer flex-row items-baseline gap-1" on:click={handleClick}>
	{#if isFavorite}
		<FavoriteIcon />
	{/if}
	<span class="flex-wrap text-wrap">
		{row.seriesName}
	</span>
</a>
