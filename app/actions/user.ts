"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export type CreateUserResponse =
  | { success: true }
  | { success: false; type: "email" | "username" | "password"; error: string };

export const createUser = async ({
  email,
  username,
  password,
}: CreateUserDTO): Promise<CreateUserResponse> => {
  if (!email)
    return {
      success: false,
      type: "email",
      error: "O e-mail é obrigatório.",
    };

  if (!username)
    return {
      success: false,
      type: "username",
      error: "O nome de usuário é obrigatório.",
    };

  if (!password)
    return {
      success: false,
      type: "password",
      error: "A senha é obrigatória.",
    };

  const [existingEmailUser, existingUsernameUser] = await Promise.all([
    db.user.findUnique({ where: { email } }),
    db.user.findUnique({ where: { username } }),
  ]);

  if (existingEmailUser) {
    return {
      success: false,
      type: "email",
      error: "Este e-mail já está em uso.",
    };
  }

  if (existingUsernameUser) {
    return {
      success: false,
      type: "username",
      error: "Este nome de usuário já está em uso.",
    };
  }

  await db.user.create({
    data: { email, username, password },
  });

  revalidatePath("/");

  return { success: true };
};
