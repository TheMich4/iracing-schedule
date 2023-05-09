import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import Navbar from "~/components/layout/navbar";
import Providers from "~/components/providers";
import Sidebar from "~/components/layout/sidebar";
import { TailwindIndicator } from "~/components/dev/tailwind-indicator";

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

        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
