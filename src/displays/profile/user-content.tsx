"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import ImportDialog from "./import-dialog";
import { User } from "next-auth";
import { useState } from "react";

const UserContent = ({ user }: { user: User }) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your content</CardTitle>
        </CardHeader>

        <CardContent>
          <Button onClick={() => setIsImportDialogOpen(true)}>
            Import your owned content from iRacing
          </Button>
        </CardContent>
      </Card>

      <ImportDialog
        user={user}
        isOpen={isImportDialogOpen}
        close={() => setIsImportDialogOpen(false)}
      />
    </>
  );
};

export default UserContent;
