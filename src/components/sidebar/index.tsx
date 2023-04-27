import {
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  MoonIcon,
  SunIcon,
  User,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import SidebarButton from "./sidebar-button";
import cn from "~/utils/cn";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();

  const [expanded, setExpanded] = useState(true);

  const handleAuth = () => {
    if (sessionData) {
      void signOut();
    } else {
      void signIn();
    }
  };

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
            <SidebarButton
              Icon={Home}
              expanded={expanded}
              isActive={router.pathname === "/"}
              label="Schedule"
              onClick={() => void router.push("/")}
            ></SidebarButton>
            {sessionData && (
              <SidebarButton
                Icon={User}
                expanded={expanded}
                isActive={router.pathname === "/admin"}
                label="Admin"
                onClick={() => void router.push("/admin")}
              ></SidebarButton>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex flex-col gap-2">
          <SidebarButton
            Icon={theme === "dark" ? MoonIcon : SunIcon}
            label={expanded ? "Theme" : ""}
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          />
          <SidebarButton
            Icon={expanded ? ChevronLeft : ChevronRight}
            expanded={expanded}
            label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((prev) => !prev)}
          />
          <SidebarButton
            Icon={ArrowRightCircle}
            expanded={expanded}
            label={sessionData ? "Log out" : "Log in"}
            onClick={handleAuth}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
