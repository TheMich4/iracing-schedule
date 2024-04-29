<script lang="ts">
	import type { FavoriteState } from '@/config/favorite';
	import FreeIcon from '../free-icon.svelte';
	import CellFavorite from './cell-favorite.svelte';
	import type { WeekEntry } from '@iracing-schedule/data';

	type Props = {
		favorite: FavoriteState;
		row: WeekEntry;
	};

	let { favorite, row }: Props = $props();
</script>

<CellFavorite {favorite} id={row.track.trackId} type="track">
	<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap">
		{#if row.track.isFree}
			<FreeIcon />
		{/if}

		{row.track.trackName}
	</div>
</CellFavorite>
