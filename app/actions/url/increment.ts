"use server";

import { db } from "@/app/lib/prisma";

export const incrementClickCount = async ({ shortId }: { shortId: string }) => {
  if (!shortId) return { error: "ID da URL encurtada ausente." };

  const shortUrl = await db.shortURL.findUnique({
    where: { shortId },
  });

  if (!shortUrl) return { error: "URL encurtada não encontrada." };

  await db.shortURL.update({
    where: { shortId },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
};
