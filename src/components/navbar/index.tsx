"use server";

import NavbarMenu from "./navbar-menu";
import NavbarTitle from "./navbar-title";
import ThemeSwitch from "../theme-switch";
import { getCurrentUser } from "~/utils/session";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex flex-row items-center justify-between gap-2 p-2 lg:hidden">
      <div className="flex flex-row items-center gap-2">
        <NavbarMenu user={user} />
        <NavbarTitle />
      </div>

      <ThemeSwitch className="self-end" />
    </nav>
  );
};

export default Navbar;
