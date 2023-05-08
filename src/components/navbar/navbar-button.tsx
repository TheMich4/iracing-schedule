"use client";

import { Button } from "react-day-picker";

const NavbarButton = ({ label, pathname }) => {
  return (
    <Button size="sm" variant="ghost">
      {label}
    </Button>
  );
};

export default NavbarButton;
