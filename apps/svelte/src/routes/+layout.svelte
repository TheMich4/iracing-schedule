<script>
	import '../app.pcss';
	import '@fontsource-variable/inter';

	import Sidebar from '@/components/sidebar';
</script>

<div class="flex h-full w-full flex-row gap-2">
	<Sidebar />
	<slot />
</div>
