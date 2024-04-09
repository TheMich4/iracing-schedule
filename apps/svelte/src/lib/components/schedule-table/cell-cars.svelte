<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import FreeIcon from '../free-icon.svelte';
	import type { WeekEntry } from '@iracing-schedule/data';
	import type { Column } from '@/templates/column';

	export let column: Column;
	export let row: WeekEntry;

	const cars = column.getValue(row);
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap">
			{#if row.hasFreeCar}
				<FreeIcon />
			{/if}

			{cars}
		</div>
	</HoverCard.Trigger>

	<HoverCard.Content class="flex w-fit flex-col gap-2 text-sm">
		<div class="text-md font-semibold">Cars:</div>

		<ul>
			{#each row.cars as car (car.carId)}
				<li>{car.carName}</li>
			{/each}
		</ul>
	</HoverCard.Content>
</HoverCard.Root>
