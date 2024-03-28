<script lang="ts">
	import { onMount } from 'svelte';
	import { getMinutesToNextRace, getRaceTimes } from './next-race';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	const times = getRaceTimes(row.raceTimeDescriptors[0]);
	let minutesToNextRace = getMinutesToNextRace(times);

	const isSetDate = row.raceTimeDescriptors.some((t: any) => t.sessionTimes || !t.repeating);

	onMount(() => {
		const interval = setInterval(() => {
			minutesToNextRace = getMinutesToNextRace(times);
		}, 30000);

		return () => clearInterval(interval);
	});
</script>

<!-- TODO: Handle if race is on current day -->
{#if isSetDate}
	<div>Set Date</div>
{:else}
	<div>{`${minutesToNextRace} minutes`}</div>
{/if}
