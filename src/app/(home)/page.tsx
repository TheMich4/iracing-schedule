"use client";

import { DataTable } from "./_components/data-table";
import { FavoriteProvider } from "./_providers/favorite-provider";

export default function Home() {
  return (
    <main className="flex h-full flex-row items-center justify-center overflow-hidden p-2 text-white">
      <FavoriteProvider>
        <DataTable />
      </FavoriteProvider>
    </main>
  );
}
