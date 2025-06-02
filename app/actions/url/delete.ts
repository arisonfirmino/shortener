"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { ActionResponse } from "@/types";

interface DeleteShortUrlDTO {
  userId: string;
  shortUrlId: string;
}

export const deleteShortUrl = async ({
  userId,
  shortUrlId,
}: DeleteShortUrlDTO): Promise<ActionResponse> => {
  if (!userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "ID do usuário é obrigatório.",
    };
  }

  if (!shortUrlId) {
    return {
      success: false,
      type: "validation",
      error: "ID da URL encurtada é obrigatório.",
    };
  }

  const [user, shortUrl] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.shortURL.findUnique({
      where: { id: shortUrlId },
      include: { user: true },
    }),
  ]);

  if (!user) {
    return {
      success: false,
      type: "unauthorized",
      error: "Usuário não encontrado.",
    };
  }

  if (!shortUrl) {
    return {
      success: false,
      type: "not_found",
      error: "URL encurtada não encontrada.",
    };
  }

  if (userId !== shortUrl.user.id) {
    return {
      success: false,
      type: "unauthorized",
      error: "Você não tem permissão para excluir esta URL.",
    };
  }

  await db.shortURL.delete({
    where: { id: shortUrlId },
  });

  revalidatePath("/");

  return { success: true };
};
