import "~/styles/globals.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";

import { Button } from "@ui/button";
import { Input } from "~/components/ui/input";
import Providers from "~/components/providers";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";
import { useState } from "react";

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        disabled
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@example.com"
        value={email}
      />
      <Input
        disabled
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        value={password}
      />
      <Button disabled>Sign in with email</Button>
    </>
  );
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Providers>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Card className="flex min-w-[350px] flex-col items-center bg-inherit">
          <CardHeader>
            <CardTitle className="self-center dark:text-slate-50">
              iRacing Schedule
            </CardTitle>
            <CardDescription>Sign in to iRacing Schedule</CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            <div className="flex flex-col gap-2">
              <EmailSignIn />

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    className="w-full dark:text-slate-300"
                    onClick={() => void signIn(provider.id)}
                    variant="outline"
                  >
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Providers>
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
