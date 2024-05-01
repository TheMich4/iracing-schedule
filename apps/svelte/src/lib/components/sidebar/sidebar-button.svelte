<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';

	export let href: string;
	export let Icon: ComponentType | null = null;
	export let title: string;

	$: currentRoute = $page.url.pathname;
</script>

<a
	class={cn(
		'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
		currentRoute === href && 'bg-muted-foreground/10'
	)}
	{href}
	{title}
>
	{#if Icon}
		<Icon class="size-4 opacity-70" />
	{/if}
	<span>{title}</span>
</a>
