export interface Filter {
  licenseGroup: Array<string>;
  official: Array<"Official"| "Unofficial">;
  setup: Array<'Fixed'| "Open">
}
