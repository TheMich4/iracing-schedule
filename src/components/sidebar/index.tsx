import { DarkThemeToggle, Sidebar as SB } from "flowbite-react";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full  bg-red-200 transition-transform sm:translate-x-0">
      <SB collapsed={false}>
        <SB.Items>
          <SB.ItemGroup>
            <SB.Item>
              <DarkThemeToggle />
            </SB.Item>
            <SB.Item>Log in</SB.Item>
          </SB.ItemGroup>
        </SB.Items>
      </SB>
    </aside>
  );
};

export default Sidebar;
