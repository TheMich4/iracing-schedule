"use client";

import { ImportContent } from "~/displays/admin/import-content";

const AdminPage = () => {
  return (
    <div className="m-2 flex flex-col gap-2 rounded-md border p-2">
      <h1>Admin Page</h1>

      <ImportContent />
    </div>
  );
};

export default AdminPage;
