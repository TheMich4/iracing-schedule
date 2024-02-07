import { MainNav } from "./main-nav";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky w-full border-b bg-black">
      <div className="flex items-center gap-x-2 px-4 py-2 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end gap-x-2">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
