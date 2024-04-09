<script lang="ts">
	import { LicenseGroupNames, type License, LicenseColors } from '../../license';
	import { cn } from '../../utils';
	import type { Column } from '@/templates/column';
	import type { WeekEntry } from '@iracing-schedule/data';

	export let column: Column;
	export let row: WeekEntry;

	const licenseGroup = column.getValue(row) as License;
	const name = LicenseGroupNames[licenseGroup];
	const color = LicenseColors[licenseGroup];
</script>

<div
	class={cn(
		'flex w-fit items-center justify-center rounded-sm px-[6px] py-[2px] text-xs',
		`border-${color}-400/80 bg-${color}-200/40 border text-${color}-800`
	)}
>
	{name}
</div>
