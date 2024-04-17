<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';

	export let href: string;
	export let Icon: any | null = null;

	$: currentRoute = $page.url.pathname;
</script>

<a
	class={cn(
		'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
		currentRoute === href && 'bg-muted-foreground/10'
	)}
	{href}
>
	{#if Icon}
		<Icon class="size-4 opacity-70" />
	{/if}
	<span>Schedule</span>
</a>
