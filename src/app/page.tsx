import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import seasons from "../data/seasons.json";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center overflow-hidden p-2 text-white">
      <DataTable data={seasons} columns={columns} />
    </main>
  );
}
