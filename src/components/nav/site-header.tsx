import { MainNav } from "./main-nav";
import { ThemeSwitch } from "./theme-switch";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex items-center gap-x-2 p-1 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end gap-x-2">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
