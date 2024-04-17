<script>
	import { IconCalendarEvent, IconStar } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import SidebarButton from './sidebar-button.svelte';

	$: currentRoute = $page.url.pathname;
</script>

<div class="flex flex-col gap-2">
	<SidebarButton Icon={IconCalendarEvent} href="/" />
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
