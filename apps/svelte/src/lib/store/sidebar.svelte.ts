let isOpen = $state(false);
let isCollapsed = $state(false);

export default {
	get isOpen() {
		return isOpen;
	},
	toggle: () => (isOpen = !isOpen),
	setIsOpen: (value: boolean) => (isOpen = value),
	get isCollapsed() {
		return isCollapsed;
	},
	toggleCollapse: () => (isCollapsed = !isCollapsed)
};
