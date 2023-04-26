import { signIn, signOut, useSession } from "next-auth/react";
import SidebarButton from "./sidebar-button";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  ArrowRightCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  MoonIcon,
  SunIcon,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { theme, setTheme } = useTheme();

  const [expanded, setExpanded] = useState(false);

  const handleAuth = () => {
    if (sessionData) {
      void signOut();
    } else {
      void signIn();
    }
  };

  return (
    <div
      className={`z-40 hidden h-screen -translate-x-full flex-col justify-between gap-2 rounded-r-md bg-slate-200 p-2 transition-all duration-300 ease-in-out dark:bg-slate-900 lg:flex ${
        expanded ? "w-64 md:translate-x-0" : "w-fit sm:translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-2">
        <SidebarButton
          Icon={Home}
          expanded={expanded}
          onClick={() => void router.push("/")}
        >
          Home
        </SidebarButton>
        {sessionData && (
          <SidebarButton
            Icon={User}
            expanded={expanded}
            onClick={() => void router.push("/admin")}
          >
            Admin
          </SidebarButton>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <SidebarButton
          Icon={theme === "dark" ? MoonIcon : SunIcon}
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {expanded ? "Theme" : ""}
        </SidebarButton>
        <SidebarButton
          Icon={expanded ? ChevronLeft : ChevronRight}
          expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Collapse" : "Expand"}
        </SidebarButton>
        <SidebarButton
          Icon={ArrowRightCircle}
          expanded={expanded}
          onClick={handleAuth}
        >
          {sessionData ? "Log out" : "Log in"}
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
