"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Loader2 } from "lucide-react";
import { importCars } from "~/pages/api/admin/import-cars";
import { importTracks } from "~/pages/api/admin/import-tracks";
import { useState } from "react";

const IracingForm = ({
  email,
  password,
  setEmail,
  setPassword,
}: {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}) => {
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

  const [isImporting, setIsImporting] = useState(false);

  const handleImportTracks = async () => {
    setIsImporting(true);
    await importTracks(email, password).catch((e) => {
      console.error(e);
    });
    setIsImporting(false);
  };

  const handleImportCars = async () => {
    setIsImporting(true);
    await importCars(email, password).catch((e) => {
      console.error(e);
    });
    setIsImporting(false);
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

      <Button disabled={isImporting} onClick={() => void handleImportTracks()}>
        {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>Import tracks</span>
      </Button>
      <Button disabled={isImporting} onClick={() => void handleImportCars()}>
        {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>Import Cars</span>
      </Button>
    </div>
  );
};
