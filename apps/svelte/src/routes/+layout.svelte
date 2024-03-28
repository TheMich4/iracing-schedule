<script>
	import '../app.pcss';
	import '@fontsource-variable/inter';

	import Sidebar from '@/components/sidebar';
	import TailwindIndicator from '@/components/tailwind-indicator.svelte';
</script>

<div class="flex">
	<Sidebar />
	<div class="flex-1">
		<slot />
	</div>
</div>

<TailwindIndicator />
