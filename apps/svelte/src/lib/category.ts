export const Categories = {
	OVAL: 'Oval',
	DIRT_OVAL: 'Dirt Oval',
	DIRT_ROAD: 'Dirt Road',
	SPORTS_CAR: 'Sports Car',
	FORMULA_CAR: 'Formula Car'
};

export const categories = [
	Categories.OVAL,
	Categories.DIRT_OVAL,
	Categories.DIRT_ROAD,
	Categories.SPORTS_CAR,
	Categories.FORMULA_CAR
];

export const categoryToName = {
	['oval']: Categories.OVAL,
	['dirt_oval']: Categories.DIRT_OVAL,
	['dirt_road']: Categories.DIRT_ROAD,
	['sports_car']: Categories.SPORTS_CAR,
	['formula_car']: Categories.FORMULA_CAR
};

export const routeToCategory = {
	oval: 'oval',
	'dirt-oval': 'dirt_oval',
	'dirt-road': 'dirt_road',
	'sports-car': 'sports_car',
	'formula-car': 'formula_car'
};
