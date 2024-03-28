<script lang="ts">
	import { onMount } from 'svelte';
	import { getMinutesToNextRace, getRaceTimes } from './next-race';
	import { cn } from '../utils';

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

	const getClassName = () => {
		if (!minutesToNextRace) return '';

		if (minutesToNextRace <= 2) return 'bg-red-500/10 text-red-600 border-red-500/40';
		if (minutesToNextRace <= 5) return 'bg-orange-500/10 text-orange-600 border-orange-500/40';
		if (minutesToNextRace <= 10) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/40';
		if (minutesToNextRace <= 30) return 'bg-green-500/10 text-green-600 border-green-500/40';
		if (minutesToNextRace <= 60) return 'bg-blue-500/10 text-blue-600 border-blue-500/40';

		return 'bg-gray-500/10 text-gray-600 border-gray-500/40';
	};
</script>

<!-- TODO: Handle if race is on current day -->
{#if isSetDate}
	<div>Set Date</div>
{:else if minutesToNextRace}
	<div class={cn('rounded-md border px-1 py-[1px] text-xs', getClassName())}>
		{`${minutesToNextRace} minutes`}
	</div>
{:else}
	<div>Unknown</div>
{/if}
