"use server";

import IracingAPI from "iracing-api";

export const importContent = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const memberInfo = await ir.getMemberInfo();

  return memberInfo;
};
