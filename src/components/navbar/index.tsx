import { Bars3Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-2 rounded-b-md bg-slate-900 p-2 lg:hidden">
      <Bars3Icon className="h-6 w-6 cursor-pointer rounded-sm  hover:bg-slate-800" />
      <div className="">iRacing Schedule</div>
    </nav>
  );
};

export default Navbar;
