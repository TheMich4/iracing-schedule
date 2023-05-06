import "~/styles/globals.css";

import Navbar from "~/components/navbar";
import Providers from "~/components/providers";
import Sidebar from "~/components/sidebar";
import { getCurrentUser } from "~/utils/session";

export const metadata = {
  title: "iRacing Schedule",
  description: "Plan your iRacing Schedule!",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-row justify-between divide-x">
        <Providers>
          <Sidebar />
          <div className="flex h-full w-full flex-col divide-y overflow-auto">
            <Navbar user={user} />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
