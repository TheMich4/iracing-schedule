import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import seasons from "../data/seasons.json";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-2 text-white">
      <DataTable
        data={[{ hello: "x1" }, { hello: "x2" }, { hello: "x3" }]}
        columns={columns}
      />
    </main>
  );
}
