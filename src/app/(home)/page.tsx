"use client";

import { DataTable } from "./_components/data-table";
import { FilterBar } from "./_components/filter-bar";
import { columns } from "./_components/columns";
import seasons from "@/data/seasons.json";

export default function Home() {
  return (
    <main className="flex h-full flex-row items-center justify-center overflow-hidden text-white">
      <FilterBar />
      <DataTable data={seasons} columns={columns} />
    </main>
  );
}
