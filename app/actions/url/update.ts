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

interface ReactivateURLDTO {
  userEmail: string;
  URLId: string;
}

export const reactivateURL = async ({ userEmail, URLId }: ReactivateURLDTO) => {
  if (!userEmail)
    throw new Error(
      "Usuário não identificado. Faça login para atualizar sua URL.",
    );

  const user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user)
    throw new Error(
      "Conta de usuário não encontrada. Verifique suas credenciais.",
    );

  if (!URLId) throw new Error("Nenhuma URL foi selecionada para atualização.");

  const url = await db.shortURL.findUnique({
    where: { id: URLId },
    include: { user: true },
  });
  if (!url)
    throw new Error(
      "A URL que você tentou atualizar não existe ou já foi removida.",
    );

  if (url.user.id !== user.id)
    throw new Error("Você não tem permissão para atualizar esta URL.");

  if (new Date() < url.expires_at)
    throw new Error("Esta URL ainda está ativa e não precisa ser reativada.");

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  await db.shortURL.update({
    where: { id: URLId },
    data: {
      expires_at: expiresAt,
    },
  });

  revalidatePath("/");
};

export const incrementClickCount = async ({ shortId }: { shortId: string }) => {
  if (!shortId)
    throw new Error("É necessário informar o identificador da URL.");

  const shortURL = await db.shortURL.findUnique({ where: { shortId } });
  if (!shortURL)
    throw new Error("Não existe uma URL associada a este identificador.");

  await db.shortURL.update({
    where: { shortId },
    data: {
      clicks: { increment: 1 },
    },
  });
};
