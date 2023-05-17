"use client";

import { useRouter } from "next/navigation";

export const NavbarTitle = () => {
  const router = useRouter();

  return (
    <a
      className="cursor-pointer font-semibold"
      onClick={() => void router.push("/")}
    >
      iRacing Schedule
    </a>
  );
};
