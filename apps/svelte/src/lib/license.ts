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
		[LicenseGroup.Rookie]: 'red',
		[LicenseGroup.D]: 'orange',
		[LicenseGroup.C]: 'yellow',
		[LicenseGroup.B]: 'green',
		[LicenseGroup.A]: 'blue',
		[LicenseGroup.Pro]: 'fuchsia'
	},
	{
		// @ts-expect-error TODO
		get: (target, key: License) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return target[key] ?? 'gray';
		}
	}
);
