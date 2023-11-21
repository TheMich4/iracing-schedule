import * as React from "react";

import Link from "next/link";
import { MobileNavMenu } from "./mobile-nav-menu";
import type { NavItem } from "./types";
import { NavLink } from "./nav-link";
import { siteConfig } from "@/config/site";

export interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6">
      <MobileNavMenu items={items} />
      <Link
        href="/"
        className="hidden items-center space-x-2 text-primary md:flex"
      >
        <span className="inline-block font-bold text-white">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-4 md:flex">
        {items?.map(
          (item, index) => item.href && <NavLink key={index} item={item} />,
        )}
      </nav>
    </div>
  );
}
