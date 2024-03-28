<script lang="ts">
	import { LicenseGroupNames, type License, LicenseColors } from '../license';
	import { cn } from '../utils';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	const licenseGroup: License = column.getValue(row);
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
