"use server";

import { db } from "@/app/lib/prisma";

export const userExists = async (identifier: string) => {
  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  return user;
};

export const isPasswordCorrect = async (
  identifier: string,
  password: string,
) => {
  const user = await userExists(identifier);

  if (!user) return false;

  return user.password === password;
};
