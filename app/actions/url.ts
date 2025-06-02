"use server";

import { db } from "@/app/lib/prisma";

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
