export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "iRacingSchedule",
  description: "Schedule for iRacing series",
  mainNav: [
    {
      title: "Schedule",
      href: "/",
    },
    {
      title: "Series",
      href: "/series",
    },
  ],
};

export const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://schedule.dyczkowski.dev";
