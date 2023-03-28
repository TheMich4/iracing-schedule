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

  const [expanded, setExpanded] = useState(true);

  const handleAuth = () => {
    if (sessionData) {
      void signOut();
    } else {
      void signIn();
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 flex h-screen -translate-x-full flex-col justify-between gap-2 rounded-r-md bg-slate-900 p-2 transition-transform duration-300 ${
        expanded ? "w-64 md:translate-x-0" : "sm:translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-2">
        <SidebarButton
          Icon={HomeIcon}
          onClick={() => void router.push("/")}
          expanded={expanded}
        >
          Home
        </SidebarButton>
        {sessionData && (
          <SidebarButton
            expanded={expanded}
            Icon={UserIcon}
            onClick={() => void router.push("/admin")}
          >
            Admin
          </SidebarButton>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <SidebarButton
          expanded={expanded}
          Icon={expanded ? ChevronLeftIcon : ChevronRightIcon}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Collapse" : "Expand"}
        </SidebarButton>
        <SidebarButton
          Icon={ArrowRightCircleIcon}
          onClick={handleAuth}
          expanded={expanded}
        >
          {sessionData ? "Log out" : "Log in"}
        </SidebarButton>
      </div>
    </aside>
  );
};

export default Sidebar;
