import { getSchedule } from "./get-schedule";
import { importSchedule } from "./import-schedule";

export const router = new Proxy(
  {
    "/get-schedule": getSchedule,
    "/import-schedule": importSchedule,
  },
  {
    get: (target, pathname: string) => {
      console.log(pathname);
      if (target[pathname]) {
        return target[pathname];
      }

      return (req: Request) => {
        return new Response("iracing-schedule-server");
      };
    },
  }
);
