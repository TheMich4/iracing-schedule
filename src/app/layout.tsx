import "~/styles/globals.css";

import Navbar from "~/components/navbar";
import Providers from "~/components/providers";
import Sidebar from "~/components/sidebar";

export const metadata = {
  title: "iRacing Schedule",
  description: "Plan your iRacing Schedule!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen w-screen flex-row justify-between divide-x font-kanit">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Sidebar />
          <div className="flex h-full w-full flex-col divide-y overflow-hidden">
            {/* @ts-expect-error Server Component */}
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
