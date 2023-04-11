import {
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

import { HomeIcon } from "@heroicons/react/24/solid";
import SidebarButton from "./sidebar-button";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

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
      className={`z-40 hidden h-screen -translate-x-full flex-col justify-between gap-2 rounded-r-md bg-slate-900 p-2 transition-all duration-300 ease-in-out lg:flex ${
        expanded ? "w-64 md:translate-x-0" : "w-fit sm:translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-2">
        <SidebarButton
          Icon={HomeIcon}
          expanded={expanded}
          onClick={() => void router.push("/")}
        >
          Home
        </SidebarButton>
        {sessionData && (
          <SidebarButton
            Icon={UserIcon}
            expanded={expanded}
            onClick={() => void router.push("/admin")}
          >
            Admin
          </SidebarButton>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <SidebarButton
          Icon={expanded ? ChevronLeftIcon : ChevronRightIcon}
          expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Collapse" : "Expand"}
        </SidebarButton>
        <SidebarButton
          Icon={ArrowRightCircleIcon}
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
