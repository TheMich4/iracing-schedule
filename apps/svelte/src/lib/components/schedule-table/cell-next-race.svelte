<script lang="ts">
	import { onMount } from 'svelte';
	import { getMinutesToNextRace, getRaceTimes } from '../next-race';
	import { cn } from '../../utils';
	import { IconAlertTriangle, IconClock, IconInfoCircle } from '@tabler/icons-svelte';
	import type { WeekEntry } from '@iracing-schedule/data';

	export let row: WeekEntry;

	const x = row.raceTimeDescriptors.some((t) => t.sessionTimes || !t.repeating);
	const isSetDate = false;
	const times = getRaceTimes(row.raceTimeDescriptors[0]);

	const iconBackClassName = 'absolute size-[10px]';
	const iconClassName = 'size-[10px] animate-[ping_1.25s_ease-in-out_infinite] opacity-80';

	let minutesToNextRace = getMinutesToNextRace(times);

	onMount(() => {
		const interval = setInterval(() => {
			minutesToNextRace = getMinutesToNextRace(times);
		}, 10000);

		return () => clearInterval(interval);
	});

	if (x) {
		console.log('setDate', { isSetDate, row, times });
	}

	const getClassName = () => {
		if (!minutesToNextRace) return '';

		if (minutesToNextRace <= 2) return 'bg-red-200/40 text-red-800 border-red-400/80';
		if (minutesToNextRace <= 5) return 'bg-orange-200/40 text-orange-800 border-orange-400/80';
		if (minutesToNextRace <= 10) return 'bg-yellow-200/40 text-yellow-800 border-yellow-400/80';
		if (minutesToNextRace <= 30) return 'bg-green-200/40 text-green-800 border-green-400/80';
		if (minutesToNextRace <= 60) return 'bg-blue-200/40 text-blue-800 border-blue-400/80';

		return 'bg-gray-200/40 text-gray-800 border-gray-400/80';
	};
</script>

<!-- TODO: Handle if race is on current day -->
{#if isSetDate}
	<div>Set Date</div>
{:else if minutesToNextRace}
	<div
		class={cn(
			'flex flex-row items-center gap-1 rounded-md border px-[6px] py-[2px] text-xs',
			getClassName()
		)}
	>
		{#if minutesToNextRace <= 5}
			<IconAlertTriangle class={iconBackClassName} />
			<IconAlertTriangle class={iconClassName} />
		{:else if minutesToNextRace <= 10}
			<IconClock class={iconBackClassName} />
			<IconClock class={iconClassName} />
		{:else if minutesToNextRace <= 30}
			<IconInfoCircle class={iconBackClassName} />
			<IconInfoCircle class={iconClassName} />
		{/if}
		{#if minutesToNextRace <= 1}
			{`Starting now`}
		{:else if minutesToNextRace >= 60 * 24}
			{`In ${Math.floor(minutesToNextRace / 60 / 24)} day${Math.floor(minutesToNextRace / 60 / 24) > 1 ? 's' : ''}`}
		{:else}
			{`In ${minutesToNextRace} minutes`}
		{/if}
	</div>
{:else}
	<div>Unknown</div>
{/if}
