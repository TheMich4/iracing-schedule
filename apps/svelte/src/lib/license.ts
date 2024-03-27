export type License = 1 | 2 | 3 | 4 | 5 | 6;

export enum LicenseGroup {
	Rookie = 1,
	D = 2,
	C = 3,
	B = 4,
	A = 5,
	Pro = 6
}

export const LicenseGroupNames = {
	[LicenseGroup.Rookie]: 'Rookie',
	[LicenseGroup.D]: 'D class',
	[LicenseGroup.C]: 'C class',
	[LicenseGroup.B]: 'B class',
	[LicenseGroup.A]: 'A class',
	[LicenseGroup.Pro]: 'Pro'
};

export const LicenseColors = new Proxy(
	{
		[LicenseGroup.Rookie]: 'red-600',
		[LicenseGroup.D]: 'orange-600',
		[LicenseGroup.C]: 'yellow-600',
		[LicenseGroup.B]: 'green-600',
		[LicenseGroup.A]: 'blue-600',
		[LicenseGroup.Pro]: 'fuchsia-600'
	},
	{
		// @ts-expect-error TODO
		get: (target, key: License) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return target[key] ?? 'gray-600';
		}
	}
);
