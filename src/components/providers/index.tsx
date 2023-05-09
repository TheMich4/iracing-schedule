"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
