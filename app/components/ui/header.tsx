"use client";

import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";

import SignInButton from "@/app/components/signin-button";
import SignOutButton from "@/app/components/signout-button";
import UserBadge from "@/app/components/user-badge";

function Header({ className, ...props }: React.ComponentProps<"header">) {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "flex w-full max-w-4xl items-center justify-between border-x border-b p-5",
        className,
      )}
      {...props}
    >
      <h1 className="text-base font-medium uppercase">Encurtador de URL</h1>

      <div className="flex items-center gap-4">
        {session ? <SignOutButton /> : <SignInButton />}
        {session && <UserBadge user={session.user} />}
      </div>
    </header>
  );
}

export { Header };
