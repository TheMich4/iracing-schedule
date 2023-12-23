import "@/styles/globals.css";

import { Kanit } from "next/font/google";
import { SiteHeader } from "@/components/nav/site-header";
import { TRPCReactProvider } from "@/trpc/react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cookies } from "next/headers";

const kanit = Kanit({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "iRacing Schedule",
  description: "iRacing Schedule",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex h-screen flex-col font-sans ${kanit.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            {children}

            <TailwindIndicator />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
