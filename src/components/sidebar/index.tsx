import { ArrowRightCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

import { HomeIcon } from "@heroicons/react/24/solid";
import SidebarButton from "./sidebar-button";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleAuth = () => {
    if (sessionData) {
      void signOut();
    } else {
      void signIn();
    }
  };

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 -translate-x-full flex-col justify-between gap-2 rounded-r-md bg-slate-900 p-2 transition-transform md:translate-x-0">
      <div className="flex flex-col gap-2">
        <SidebarButton Icon={HomeIcon} onClick={() => void router.push("/")}>
          Home
        </SidebarButton>
        <SidebarButton
          Icon={UserIcon}
          onClick={() => void router.push("/admin")}
        >
          Admin
        </SidebarButton>
      </div>
      <SidebarButton Icon={ArrowRightCircleIcon} onClick={handleAuth}>
        {sessionData ? "Log out" : "Log in"}
      </SidebarButton>
    </aside>
  );
};

export default Sidebar;
