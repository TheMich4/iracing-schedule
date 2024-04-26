<script lang="ts">
	import FavoriteIcon from '../favorite-icon.svelte';
	import type { FavoriteState } from '@/config/favorite';

	type Props = {
		favorite: FavoriteState;
		id: number;
		type: string;
	};

	let { favorite, id, type } = $props<Props>();

	let isFavorite = $state(favorite[type][id] ?? false);

	const handleClick = async () => {
		await fetch('/api/session/favorite', {
			method: 'PUT',
			body: JSON.stringify({ type, id })
		});

		isFavorite = !isFavorite;
	};
</script>

<a class="group inline-flex cursor-pointer flex-row items-baseline gap-1" on:click={handleClick}>
	{#if isFavorite}
		<FavoriteIcon />
	{/if}
	<slot />
</a>
