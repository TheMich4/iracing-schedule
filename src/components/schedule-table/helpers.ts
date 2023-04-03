import type { Filter } from "~/hooks/use-filter/types";
import type { Schedule } from "~/types";

const matchesLicenseGroup = (
  scheduleItem: Schedule,
  filter: Filter
): boolean => {
  if (filter.licenseGroup.length > 0) {
    return filter.licenseGroup.includes(scheduleItem.licenseGroup.toString());
  }

  return false;
};

const matchesSetup = (scheduleItem: Schedule, filter: Filter): boolean => {
  if (filter.setup.length > 0) {
    const showFixed = filter.setup.includes("Fixed");
    const showOpen = filter.setup.includes("Open");
    return (
      (showFixed && scheduleItem.fixedSetup) ||
      (showOpen && !scheduleItem.fixedSetup)
    );
  }

  return false;
};

const matchesOfficial = (scheduleItem: Schedule, filter: Filter): boolean => {
  if (filter.official.length > 0) {
    const showOfficial = filter.official.includes("Official");
    const showUnofficial = filter.official.includes("Unofficial");
    return (
      (showOfficial && scheduleItem.official) ||
      (showUnofficial && !scheduleItem.official)
    );
  }

  return false;
};

const matchesTrackType = (scheduleItem: Schedule, filter: Filter): boolean => {
  if (filter.trackType.length > 0) {
    return filter.trackType.includes(scheduleItem.trackType);
  }

  return false;
};

export const getFilteredSchedule = (
  schedule: Array<Schedule>,
  filter: Filter
) => {
  return schedule.filter(
    (scheduleItem) =>
      matchesLicenseGroup(scheduleItem, filter) &&
      matchesSetup(scheduleItem, filter) &&
      matchesOfficial(scheduleItem, filter) &&
      matchesTrackType(scheduleItem, filter)
  );
};
