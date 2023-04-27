/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "~/components/sidebar";
import { ThemeProvider } from "next-themes";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/navbar";

// TODO: Remove defaultTheme when styling is done
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) => {
  const layoutNeeded = !appProps?.router?.pathname?.startsWith("/auth");

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>
          <div className="flex h-screen w-screen flex-row justify-between divide-x">
            {layoutNeeded ? (
              <>
                <Sidebar />
                <div className="flex h-full w-full flex-col overflow-auto">
                  <Navbar />
                  <Component {...pageProps} />
                </div>
              </>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
