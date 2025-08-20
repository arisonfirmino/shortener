import { db } from "@/app/lib/prisma";

export const getUser = async (email: string) => {
  if (!email) return null;

  const user = await db.user.findUnique({
    where: { email },
    include: { urls: { orderBy: { created_at: "desc" } } },
  });

  if (!user) return null;

  return user;
};
