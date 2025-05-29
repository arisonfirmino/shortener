"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAccountProps {
  email: string;
  username: string;
  password: string;
}

export const createAccount = async ({
  email,
  username,
  password,
}: CreateAccountProps) => {
  if (!email) return { type: "email", error: "O e-mail é obrigatório." };
  if (!username)
    return { type: "username", error: "O nome de usuário é obrigatório." };
  if (!password) return { type: "password", error: "A senha é obrigatória." };

  const [userByEmail, userByUsername] = await Promise.all([
    db.user.findUnique({ where: { email } }),
    db.user.findUnique({ where: { username } }),
  ]);

  if (userByEmail)
    return { type: "email", error: "Este e-mail já está em uso." };
  if (userByUsername)
    return { type: "username", error: "Este nome de usuário já está em uso." };

  await db.user.create({
    data: { email, username, password },
  });

  revalidatePath("/");
};
