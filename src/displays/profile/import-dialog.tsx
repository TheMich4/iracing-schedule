"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { importContent } from "~/pages/api/import-content";
import { useState } from "react";

const ImportDialog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleImport = async () => {
    setIsLoading(true);

    const x = await importContent(email, password);
    console.log({ x });

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Import your owned content from iRacing</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import your owned content</DialogTitle>
          <DialogDescription className="flex flex-col ">
            <span>
              Import your owned cars and tracks directly from iRacing.
            </span>
            <span>
              You have to login with your iRacing credentials to access this.
              data.
            </span>
            <span className="text-red-500">
              We do NOT store your credentials!
            </span>
          </DialogDescription>
        </DialogHeader>

        <Input
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          value={email}
        />
        <Input
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          value={password}
        />
        <Button disabled={isLoading} onClick={handleImport}>
          Import content
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
