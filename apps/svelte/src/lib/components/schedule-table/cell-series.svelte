<script lang="ts">
	import type { WeekEntry } from '@iracing-schedule/data';
	import CellFavorite from './cell-favorite.svelte';
	import type { FavoriteState } from '@/config/favorite';

	type Props = {
		favorite: FavoriteState;
		row: WeekEntry;
	};

	let { favorite, row } = $props<Props>();
</script>

<CellFavorite {favorite} id={row.seriesId} type="series">
	<span class="flex-wrap text-wrap">
		{row.seriesName}
	</span>
</CellFavorite>
