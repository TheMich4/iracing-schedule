import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "~/components/sidebar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div>
        <div className="flex w-screen flex-row justify-between">
          <Sidebar />
          <div className="flex h-screen w-full flex-col overflow-auto">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
