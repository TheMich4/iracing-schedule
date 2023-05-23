"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type User } from "next-auth";
import { importContent } from "~/server/api/content/import-content";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const ImportDialog = ({
  user,
  isOpen,
  close,
}: {
  user: User;
  isOpen: boolean;
  close: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  const handleImport = async () => {
    setIsLoading(true);

    await importContent(user, { email, password })
      .then(() => {
        close();
        toast({
          title: "Imported content",
          description: "Your content has been imported!",
        });
      })
      .catch((e) => {
        console.error(e);
      });

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent close={close}>
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
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>Import content</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
