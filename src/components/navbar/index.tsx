import { MenuIcon } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center gap-2 rounded-b-md bg-slate-200  p-2 dark:bg-slate-900 lg:hidden">
      <MenuIcon className="h-6 w-6 cursor-pointer rounded-sm hover:bg-slate-300/40 dark:hover:bg-slate-800/40" />
      <div onClick={() => void router.push("/")}>iRacing Schedule</div>
    </nav>
  );
};

export default Navbar;
