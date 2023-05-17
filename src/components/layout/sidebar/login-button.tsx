"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

import { Button } from "../../ui/button";
import type { User } from "next-auth";
import { useMemo } from "react";

export const LoginButton = ({ user }: { user: User }) => {
  const handleAuth = () => {
    if (user) {
      void signOut();
    } else {
      void signIn();
    }
  };

  const Icon = useMemo(
    () => (user ? ArrowLeftCircle : ArrowRightCircle),
    [user]
  );

  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={handleAuth}
      size="sm"
      variant="ghost"
    >
      <Icon className="h-4 w-4" />
      <span>{user ? "Log out" : "Log in"}</span>
    </Button>
  );
};
