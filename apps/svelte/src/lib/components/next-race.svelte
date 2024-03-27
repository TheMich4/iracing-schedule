<script lang="ts">
	import { onMount } from 'svelte';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	let time = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 60000);

		return () => clearInterval(interval);
	});

	const isSetDate = row.raceTimeDescriptors.some((t) => t.sessionTimes);
</script>

{#if isSetDate}
	<div>Set Date</div>
{:else}
	<div>Unknown</div>
{/if}
