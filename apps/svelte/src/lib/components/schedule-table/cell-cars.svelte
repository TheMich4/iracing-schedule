<script lang="ts">
	import FreeIcon from '../free-icon.svelte';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	const cars: string = column.getValue(row);
</script>

<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap">
	{#if row.hasFreeCar}
		<FreeIcon />
	{/if}

	{cars}
</div>
