"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Button } from "~/components/ui/button";
import { CarsTab } from "./content-tabs/cars-tab";
import { ImportDialog } from "./import-dialog";
import { type User } from "next-auth";
import { useState } from "react";
import { TracksTab } from "./content-tabs/tracks-tab";
import type { Track } from "@prisma/client";

export const UserContent = ({
  user,
  tracks,
}: {
  user: User;
  tracks: Array<Track>;
}) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your content</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Button
            className="max-w-[400px]"
            onClick={() => setIsImportDialogOpen(true)}
          >
            Import your owned content from iRacing
          </Button>

          <Tabs defaultValue="cars">
            <TabsList>
              <TabsTrigger value="cars">Cars</TabsTrigger>
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
            </TabsList>
            <TabsContent value="cars">
              <CarsTab user={user} />
            </TabsContent>
            <TabsContent value="tracks">
              <TracksTab user={user} tracks={tracks} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ImportDialog
        close={() => setIsImportDialogOpen(false)}
        isOpen={isImportDialogOpen}
        user={user}
      />
    </>
  );
};
