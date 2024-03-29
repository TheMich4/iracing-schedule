let filter = $state('');

export default {
	get filter() {
		return filter;
	},
	set filter(f: string) {
		filter = f;
	}
};
