<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import FavoriteIcon from '../favorite-icon.svelte';
	import type { FavoriteState } from '@/config/favorite';

	type Props = {
		favorite: FavoriteState;
		id: number;
		type: string;
	};

	let { favorite, id, type } = $props<Props>();

	let isFavorite = $derived(favorite[type]?.[id] ?? false);

	const handleClick = async () => {
		favorite[type] = {
			...favorite[type],
			[id]: !isFavorite
		};

		await fetch('/api/session/favorite', {
			method: 'PUT',
			body: JSON.stringify({ type, id })
		});
	};
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger>
		<div class="group inline-flex cursor-pointer flex-row items-baseline gap-1">
			{#if isFavorite}
				<FavoriteIcon />
			{/if}
			<slot />
		</div>
	</ContextMenu.Trigger>

	<ContextMenu.Content>
		<ContextMenu.Item on:click={handleClick}>
			{#if isFavorite}
				Unfavorite
			{:else}
				Favorite
			{/if}
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
