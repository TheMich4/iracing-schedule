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

	// console.log(time);

	const getRaceTimes = () => {
		const { repeatMinutes, firstSessionTime } = row.raceTimeDescriptors[0];
		const start = firstSessionTime.split(':');
		const hToAdd = Math.floor(repeatMinutes / 60);
		const mToAdd = repeatMinutes % 60;

		let times: Date[] = [],
			h = +start.at(0),
			m = +start.at(1);

		do {
			let d = new Date();
			d.setUTCHours(h);
			d.setMinutes(m);
			d.setSeconds(0);

			h = h + hToAdd;
			m = m + mToAdd;

			times.push(d);
		} while (h < 24 && m < 60);

		return times;
	};

	const isSetDate = row.raceTimeDescriptors.some((t: any) => t.sessionTimes || !t.repeating);
	const times = getRaceTimes();

	console.log({ row, times });
</script>

<!-- TODO: Handle if race is on current day -->
{#if isSetDate}
	<div>Set Date</div>
{:else}
	<div>Unknown</div>
{/if}
