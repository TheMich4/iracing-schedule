import { DarkThemeToggle, Sidebar as SB } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";

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
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0">
      <SB collapsed={false}>
        <SB.Items>
          {sessionData && (
            <SB.ItemGroup>
              <SB.Item
                onClick={() => void router.push("/admin")}
                className="cursor-pointer"
              >
                Admin
              </SB.Item>
            </SB.ItemGroup>
          )}

          <SB.ItemGroup>
            <SB.Item>
              <DarkThemeToggle className="flex w-full justify-center" />
            </SB.Item>
            <SB.Item onClick={handleAuth} className="cursor-pointer">
              {sessionData ? "Log out" : "Log in"}
            </SB.Item>
          </SB.ItemGroup>
        </SB.Items>
      </SB>
    </aside>
  );
};

export default Sidebar;
