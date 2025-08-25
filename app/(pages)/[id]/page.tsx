import { notFound, redirect } from "next/navigation";

import { db } from "@/app/lib/prisma";

import { incrementClickCount } from "@/app/actions/url/update";

const RedirectPage = async ({ params }: { params: { id: string } }) => {
  const shortURL = await db.shortURL.findUnique({
    where: { shortId: params.id },
  });

  if (!shortURL) return notFound();
  if (new Date() > shortURL.expires_at) return notFound();

  await incrementClickCount({ shortId: params.id });

  redirect(shortURL.originalUrl);
};

export default RedirectPage;
