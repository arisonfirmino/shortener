import Container from "@/app/components/container";
import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

const NotFound = () => {
  return (
    <Container showCopyright className="justify-center gap-10 text-center">
      <div className="space-y-2.5">
        <span className="text-7xl font-bold">404</span>
        <p className="text-lg font-medium">Page Not Found.</p>
      </div>

      <p>Ops! Parece que este link é inválido ou já expirou.</p>

      <Link href="/" className={cn(buttonVariants())}>
        Voltar para o ínicio
      </Link>
    </Container>
  );
};

export default NotFound;
