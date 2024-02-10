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
    {
      title: "Special Events",
      href: "https://special-events.dyczkowski.dev",
    },
  ],
};

export const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://schedule.dyczkowski.dev";
