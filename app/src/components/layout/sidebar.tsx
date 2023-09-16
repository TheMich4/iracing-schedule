import {
  CalendarIcon,
  DotsHorizontalIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ThemeSwitch } from "../theme-switch";

const SidebarButton = ({
  children,
  IconComponent,
  href = "#",
}: {
  children: React.ReactNode;
  IconComponent: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  href?: string;
}) => {
  return (
    <li>
      <Button asChild className="w-full" variant="ghost">
        <a
          href={href}
          className="flex items-center rounded-md px-3 py-2 text-foreground hover:bg-accent"
        >
          <IconComponent className="h-[1.2rem] w-[1.2rem]" />
          <span className="ml-3 flex-1 whitespace-nowrap ">{children}</span>
        </a>
      </Button>
    </li>
  );
};

export const Sidebar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r  bg-background px-3 py-4">
        <a
          href="#"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-foreground"
        >
          <CalendarIcon className="h-5 w-5" />
          <span className="ml-3 text-base font-semibold">iRacing Schedule</span>
        </a>
        <ul className="space-y-2 text-sm font-medium">
          <SidebarButton IconComponent={HomeIcon} href="#">
            Home
          </SidebarButton>
          <SidebarButton IconComponent={GearIcon}>Settings</SidebarButton>
          <SidebarButton IconComponent={PersonIcon} href="admin">
            Admin
          </SidebarButton>
        </ul>

        <div className="mt-auto flex flex-col gap-2">
          <div>
            <ThemeSwitch />
          </div>

          <div className="flex flex-row w-full">
            <div className="flex w-full justify-between">
              <span className="text-sm font-medium text-foreground">
                email@example.com
              </span>
              <DotsHorizontalIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
