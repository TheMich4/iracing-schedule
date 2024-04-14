<script>
	import { IconCalendarEvent, IconStar } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import { cn } from '../../utils';

	$: currentRoute = $page.url.pathname;
</script>

<div class="flex flex-col gap-2">
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/' && 'active'
		)}
		href="/"
	>
		<IconCalendarEvent class="size-4 opacity-70" />
		<span>Schedule</span>
	</a>
<!--	<a-->
<!--		class={cn(-->
<!--			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',-->
<!--			currentRoute === '/favorite' && 'active'-->
<!--		)}-->
<!--		href="/favorite"-->
<!--	>-->
<!--		<IconStar class="size-4 opacity-70" />-->
<!--		<span>Favorite</span>-->
<!--	</a>-->
</div>

<style lang="pcss">
	.active {
		@apply bg-stone-900/5;
	}
</style>
