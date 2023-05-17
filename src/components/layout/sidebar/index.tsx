"use server";

import { LoginButton } from "./login-button";
import { SidebarButton } from "./sidebar-button";
import { ThemeSwitch } from "../theme-switch";
import { cn } from "~/utils/cn";
import { getCurrentUser } from "~/utils/session";

const expanded = true;

const Sidebar = async () => {
  const user = await getCurrentUser();

  return (
    <div
      className={cn(
        "hidden flex-col justify-between py-2 lg:flex",
        expanded ? "w-64 md:translate-x-0" : "sm:translate-x-0"
      )}
    >
      <div className="space-y-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            {expanded ? "iRacing Schedule" : "iRS"}
          </h2>

          <div className="space-y-1">
            <SidebarButton label="Schedule" pathname="/" />
            {user && <SidebarButton label="Profile" pathname="/profile" />}
            {user?.isAdmin && <SidebarButton label="Admin" pathname="/admin" />}
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex flex-col gap-2">
          <ThemeSwitch fullWidth withLabel />
          <LoginButton user={user} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
