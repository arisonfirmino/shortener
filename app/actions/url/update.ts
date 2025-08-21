"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateShortIdDTO {
  userEmail: string;
  URLId: string;
  shortId: string;
}

export const updateShortId = async ({
  userEmail,
  URLId,
  shortId,
}: UpdateShortIdDTO) => {
  if (!userEmail)
    return {
      error: "Usuário não identificado. Faça login para atualizar sua URL.",
    };

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: { urls: true },
  });
  if (!user)
    return {
      error: "Conta de usuário não encontrada. Verifique suas credenciais.",
    };

  if (!URLId) return { error: "Nenhuma URL foi selecionada para edição." };

  const shortURL = await db.shortURL.findUnique({
    where: { id: URLId },
    include: { user: true },
  });
  if (!shortURL)
    return {
      error: "A URL que você tentou editar não existe ou já foi removida.",
    };

  if (shortURL.user.id !== user.id)
    return { error: "Você não tem permissão para editar esta URL." };

  const existingURL = await db.shortURL.findUnique({ where: { shortId } });
  if (existingURL)
    return { error: "Este identificador já está em uso. Escolha outro." };

  await db.shortURL.update({ where: { id: URLId }, data: { shortId } });

  revalidatePath("/");
};
