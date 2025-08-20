"use server";

import { db } from "@/app/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

interface CreateURLDTO {
  userEmail: string;
  url: string;
}

export const createURL = async ({ userEmail, url }: CreateURLDTO) => {
  if (!userEmail)
    return {
      error: "Usuário não identificado. Faça login para criar uma URL.",
    };

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: { urls: true },
  });
  if (!user)
    return {
      error: "Conta de usuário não encontrada. Verifique suas credenciais.",
    };

  if (!url) return { error: "Por favor, insira a URL que deseja encurtar." };

  const existingUrl = user.urls.some((userURL) => userURL.originalUrl === url);
  if (existingUrl)
    return { error: "Essa URL já está na sua lista. Tente encurtar outra." };

  await db.shortURL.create({
    data: {
      userId: user.id,
      originalUrl: url,
      shortId: nanoid(8),
      expires_at: new Date(),
    },
  });

  revalidatePath("/");
};
