<script lang="ts">
	import type { WeekEntry } from '@iracing-schedule/data';
	import { getFavoriteState } from '../../store/favorite.svelte';
	import FavoriteIcon from '../favorite-icon.svelte';

	type Props = {
		row: WeekEntry;
	};

	let { row } = $props<Props>();

	const favoriteState = getFavoriteState();

	let isFavorite = $derived(favoriteState.series[row.seriesId] ?? false);

	const handleClick = async () => {
		favoriteState.toggleSeries(row.seriesId);

		const x = await fetch('api/session/favorite', {
			method: 'PUT',
			body: JSON.stringify({ type: 'series', id: row.seriesId })
		});

		console.log({ x });
	};
</script>

<a class="group inline-flex flex-row items-baseline gap-1" on:click={handleClick}>
	{#if isFavorite}
		<FavoriteIcon />
	{/if}
	<span class="flex-wrap text-wrap">
		{row.seriesName}
	</span>
</a>
