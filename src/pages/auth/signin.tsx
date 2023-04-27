import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";

import Button from "@ui/button";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="bg-inherit">
        <CardHeader>
          <CardTitle className="dark:text-slate-50">iRacing Schedule</CardTitle>
          <CardDescription>Log in to iRacing Schedule</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="gap-2">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button onClick={() => void signIn(provider.id)}>
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
