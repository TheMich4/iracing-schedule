import type { ComponentType } from 'svelte';
import type { WeekEntry } from '@iracing-schedule/data';

export interface Column {
	Component?: ComponentType;
	Icon: ComponentType;
	class?: string;
	contentClass?: string;
	getValue: (row: WeekEntry) => string | number | boolean;
	id: string;
	label: string;
}
