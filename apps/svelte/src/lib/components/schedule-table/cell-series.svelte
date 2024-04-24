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

	const handleClick = () => {
		favoriteState.toggleSeries(row.seriesId);
	};
</script>

<a class="inline-flex flex-row items-baseline gap-1" on:click={handleClick}>
	{#if isFavorite}
		<FavoriteIcon />
	{/if}
	<span class="flex-wrap text-wrap">
		{row.seriesName}
	</span>
</a>
