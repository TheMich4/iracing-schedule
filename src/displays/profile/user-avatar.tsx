"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import type { User } from "next-auth";

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar className="h-16 w-16 overflow-hidden rounded-md">
      <AvatarImage src={user?.image} />
      <AvatarFallback className="dark:text-slate-200">
        {user?.name?.charAt(0) ?? "U"}
      </AvatarFallback>
    </Avatar>
  );
};
