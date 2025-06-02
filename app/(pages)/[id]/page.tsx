import { db } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";

import { incrementClickCount } from "@/app/actions/url/increment";

const RedirectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const shortId = (await params).id;

  const shortURL = await db.shortURL.findUnique({
    where: { shortId },
  });

  if (!shortURL || new Date() > new Date(shortURL.expires_at)) notFound();

  await incrementClickCount({ shortId });

  redirect(shortURL.originalUrl);
};

export default RedirectPage;
