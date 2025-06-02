"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

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
