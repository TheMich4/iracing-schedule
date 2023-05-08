"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Button } from "@ui/button";
import { MenuIcon } from "lucide-react";
import NavbarButton from "./navbar-button";

const NavbarMenu = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="ghost">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex flex-col gap-2">
          <NavbarButton label="Schedule" pathname="/" />
          {user && <NavbarButton label="Profile" pathname="/profile" />}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarMenu;
