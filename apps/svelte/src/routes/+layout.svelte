<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import Sidebar from '@/components/sidebar';
	import TailwindIndicator from '@/components/tailwind-indicator.svelte';
</script>

<svelte:head>
	<title>iRacing Schedule</title>
</svelte:head>

<div class="flex">
	<Sidebar />
	<div class="flex-1">
		<slot />
	</div>
</div>

<ModeWatcher />
<TailwindIndicator />
