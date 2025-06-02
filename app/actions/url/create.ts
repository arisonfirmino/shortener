"use server";

import { db } from "@/app/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import { ActionResponse } from "@/types";

import { getExpirationDate } from "@/app/helpers/getExpirationDate";

interface CreateShortUrlDTO {
  userId: string;
  title?: string;
  url: string;
}

export const createShortUrl = async ({
  userId,
  title,
  url,
}: CreateShortUrlDTO): Promise<ActionResponse> => {
  if (!userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "Você precisa estar autenticado para encurtar URLs.",
    };
  }

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    return {
      success: false,
      type: "not_found",
      error: "Usuário não encontrado.",
    };
  }

  const existingUrl = await db.shortURL.findFirst({
    where: { originalUrl: url, userId },
  });

  if (existingUrl) {
    return {
      success: false,
      type: "conflict",
      error: "Você já encurtou essa URL anteriormente.",
    };
  }

  await db.shortURL.create({
    data: {
      userId,
      originalUrl: url,
      shortId: nanoid(8),
      title,
      expires_at: getExpirationDate(),
    },
  });

  revalidatePath("/");

  return { success: true };
};
