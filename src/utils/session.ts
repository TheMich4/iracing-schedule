import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
