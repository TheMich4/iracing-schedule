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
		'flex w-fit items-center justify-center rounded-sm px-1 text-xs font-semibold text-white',
		`border-${color} bg-${color}/10 border text-${color}`
	)}
>
	{name.charAt(0)}
</div>
