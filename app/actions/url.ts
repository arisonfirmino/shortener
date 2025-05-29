"use server";

import { db } from "@/app/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

interface CreateShortUrlProps {
  userId: string;
  title?: string;
  url: string;
}

export const createShortUrl = async ({
  userId,
  title,
  url,
}: CreateShortUrlProps) => {
  if (!userId) return { error: "Usuário não autenticado." };

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return { error: "Usuário não encontrado." };

  const existingUrl = await db.shortURL.findFirst({
    where: {
      originalUrl: url,
      userId: userId,
    },
  });

  if (existingUrl)
    return {
      type: "url",
      error: "Você já criou um link encurtado para essa URL.",
    };

  const expires_at = new Date();
  expires_at.setMonth(expires_at.getMonth() + 1);

  await db.shortURL.create({
    data: { userId, originalUrl: url, shortId: nanoid(8), title, expires_at },
  });

  revalidatePath("/");
};

interface DeleteShortUrlProps {
  userId: string;
  shortURLId: string;
}

export const DeleteShortUrl = async ({
  userId,
  shortURLId,
}: DeleteShortUrlProps) => {
  if (!userId) return { error: "ID do usuário é obrigatório." };
  if (!shortURLId) return { error: "ID da URL encurtada é obrigatório." };

  const [user, shortURL] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.shortURL.findUnique({
      where: { id: shortURLId },
      include: { user: true },
    }),
  ]);

  if (!user) return { error: "Usuário não encontrado." };
  if (!shortURL) return { error: "URL encurtada não encontrada." };

  if (userId !== shortURL.user.id)
    return { error: "Você não tem permissão para excluir esta URL." };

  await db.shortURL.delete({
    where: { id: shortURLId },
  });

  revalidatePath("/");
};

interface ReactivateShortURLProps {
  userId: string;
  shortURLId: string;
}

export const reactivateShortURL = async ({
  userId,
  shortURLId,
}: ReactivateShortURLProps) => {
  if (!userId) return { error: "ID do usuário é obrigatório." };
  if (!shortURLId) return { error: "ID da URL encurtada é obrigatório." };

  const [user, shortURL] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.shortURL.findUnique({
      where: { id: shortURLId },
      include: { user: true },
    }),
  ]);

  if (!user) return { error: "Usuário não encontrado." };
  if (!shortURL) return { error: "URL encurtada não encontrada." };

  if (userId !== shortURL.user.id)
    return { error: "Você não tem permissão para atualizar esta URL." };

  const expires_at = new Date();
  expires_at.setMonth(expires_at.getMonth() + 1);

  await db.shortURL.update({
    where: { id: shortURLId },
    data: {
      expires_at,
    },
  });

  revalidatePath("/");
};

interface IncrementClickCountProps {
  shortId: string;
}

export const incrementClickCount = async ({
  shortId,
}: IncrementClickCountProps) => {
  if (!shortId) return { error: "" };

  const shortURL = await db.shortURL.findUnique({
    where: { shortId },
  });

  if (!shortURL) return { error: "" };

  await db.shortURL.update({
    where: { shortId },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
};
