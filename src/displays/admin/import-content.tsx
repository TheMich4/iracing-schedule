"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { importTracks } from "~/pages/api/admin/import-tracks";
import { useState } from "react";

const IracingForm = ({ email, password, setEmail, setPassword }) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@example.com"
        value={email}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        value={password}
      />
    </div>
  );
};

export const ImportContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleImportTracks = async () => {
    const tracks = await importTracks(email, password);
    console.log("---", { tracks });
  };

  return (
    <div className="m-2 flex flex-col gap-2 rounded-md border p-2">
      <h1>Import Content</h1>

      <IracingForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <Button onClick={() => void handleImportTracks()}>Import tracks</Button>
    </div>
  );
};
