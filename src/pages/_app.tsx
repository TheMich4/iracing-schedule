import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "~/components/sidebar";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex w-screen flex-row justify-between">
        <Sidebar />
        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-screen w-full overflow-auto overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-900">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
