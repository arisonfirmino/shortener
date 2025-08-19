import { Main } from "@/app/components/ui/main";
import CreateLink from "@/app/components/create-link";

const Home = () => {
  return (
    <Main>
      <section className="w-full border-r"></section>
      <section className="to-muted from-background w-full max-w-xs bg-gradient-to-t">
        <CreateLink />
      </section>
    </Main>
  );
};

export default Home;
