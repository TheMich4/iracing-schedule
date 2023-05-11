"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Button } from "~/components/ui/button";
import CarsTab from "./content-tabs/cars";
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

        <CardContent className="flex flex-col gap-2">
          <Button
            onClick={() => setIsImportDialogOpen(true)}
            className="max-w-[400px]"
          >
            Import your owned content from iRacing
          </Button>

          <Tabs defaultValue="cars">
            <TabsList>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
            </TabsList>
            <TabsContent value="cars">
              <CarsTab />
            </TabsContent>
            <TabsContent value="tracks">Tracks</TabsContent>
          </Tabs>
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
