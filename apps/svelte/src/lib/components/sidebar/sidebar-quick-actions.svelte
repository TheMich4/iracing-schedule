<script>
	import { IconCalendarEvent, IconStar } from '@tabler/icons-svelte';
	import SidebarButton from './sidebar-button.svelte';

</script>

<div class="flex flex-col">
	<SidebarButton Icon={IconCalendarEvent} href="/" title="Schedule"/>
	<SidebarButton Icon={IconStar} href="/favorite" title="Favorite"/>
</div>
