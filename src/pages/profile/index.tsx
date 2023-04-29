import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Head from "next/head";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const { data: sessionData } = useSession();

  console.log({ sessionData });

  return (
    <>
      <Head>
        <title>iRacing Schedule</title>
        <meta content="Plan your iRacing Schedule!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <div className="flex flex-col gap-2 overflow-auto p-4">
          <Card className="bg-inherit">
            <CardHeader>
              <CardTitle className="dark:text-slate-50">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage src={sessionData?.user?.image} />
                  <AvatarFallback className="dark:text-slate-200">
                    {sessionData?.user?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-bold dark:text-slate-50">
                    {sessionData?.user?.name}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                    {sessionData?.user.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
