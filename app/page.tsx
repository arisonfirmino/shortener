import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/helpers/getUser";

import { Main } from "@/app/components/ui/main";
import CreateLink from "@/app/components/create-link";
import URLList from "@/app/components/url-list";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const user = await getUser(session.user.email);
  if (!user) return null;

  return (
    <Main>
      <section className="w-full border-r">
        <div className="grid gap-4 p-5">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium uppercase">Seus links salvos</p>
            <span className="text-muted-foreground text-xs">
              {user.urls.length} {user.urls.length === 1 ? "URL" : "URLs"}
            </span>
          </div>

          <URLList urls={user.urls} />
        </div>
      </section>

      <section className="to-muted from-background w-full max-w-xs bg-gradient-to-t">
        <CreateLink />
      </section>
    </Main>
  );
};

export default Home;
