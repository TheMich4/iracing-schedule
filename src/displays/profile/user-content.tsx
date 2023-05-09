"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import ImportDialog from "./import-dialog";
import { User } from "next-auth";

const UserContent = ({ user }: { user: User | undefined }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your content</CardTitle>
      </CardHeader>

      <CardContent>
        <ImportDialog />
      </CardContent>
    </Card>
  );
};

export default UserContent;
