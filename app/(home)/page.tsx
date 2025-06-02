import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import Container from "@/app/components/container";
import Header from "@/app/(home)/components/header";
import { Separator } from "@/app/components/ui/separator";
import ShortenerIntro from "@/app/(home)/components/shortener-intro";
import ShortenerForm from "@/app/(home)/components/shortener-form";
import ShortUrlList from "@/app/(home)/components/short-url-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      urls: {
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });

  return user ? (
    <Container>
      <div className="flex w-full max-w-2xl flex-col gap-5 p-5 pb-10 md:px-0 md:pt-10 lg:mt-20">
        <Header user={user} urlCount={user.urls.length} />

        <Separator />

        <div className="space-y-2.5">
          <ShortenerIntro />
          <ShortenerForm userId={user.id} />
        </div>

        <Separator />

        {user.urls.length > 0 ? (
          <ShortUrlList shortUrls={user.urls} />
        ) : (
          <p className="text-foreground/50 text-sm">
            Parece que você ainda não encurtou nenhum link. Crie seu primeiro
            link usando o formulário acima!
          </p>
        )}
      </div>
    </Container>
  ) : (
    <p>Carregando...</p>
  );
};

export default Home;
