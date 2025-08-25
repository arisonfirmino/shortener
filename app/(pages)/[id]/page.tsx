import { db } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";

const RedirectPage = async ({ params }: { params: { id: string } }) => {
  const shortURL = await db.shortURL.findUnique({
    where: { shortId: params.id },
  });

  if (!shortURL) return notFound();
  if (new Date() > shortURL.expires_at) return notFound();

  redirect(shortURL.originalUrl);
};

export default RedirectPage;
