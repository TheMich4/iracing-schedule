import { Button } from "@ui/button";
import { MenuIcon } from "lucide-react";
import NavbarTitle from "./navbar-title";
import ThemeSwitch from "../theme-switch";

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between gap-2 p-2 lg:hidden">
      <div className="flex flex-row items-center gap-2">
        <Button size="sm" variant="ghost">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <NavbarTitle />
      </div>

      <ThemeSwitch className="self-end" />
    </nav>
  );
};

export default Navbar;
