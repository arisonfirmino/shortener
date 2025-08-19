"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateUserDTO {
  name: string;
  email: string;
  avatar?: string;
}

export const createUser = async ({ name, email, avatar }: CreateUserDTO) => {
  if (!name) throw new Error("Name is required.");
  if (!email) throw new Error("Email is required.");

  const isUserExists = await db.user.findUnique({ where: { email } });

  if (isUserExists) {
    await db.user.update({
      where: { email },
      data: { updated_at: new Date() },
    });
  } else {
    await db.user.create({
      data: { name, email, avatar, updated_at: new Date() },
    });
  }

  revalidatePath("/");
};
