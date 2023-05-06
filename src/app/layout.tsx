import "~/styles/globals.css";

import Navbar from "~/components/navbar";
import Sidebar from "~/components/sidebar";

export const metadata = {
  title: "iRacing Schedule",
  description: "Plan your iRacing Schedule!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-row justify-between divide-x">
        <Sidebar />
        <div className="flex h-full w-full flex-col divide-y overflow-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
