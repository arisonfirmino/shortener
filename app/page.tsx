"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

const Home = () => {
  const { data: session } = useSession();

  const handleLogInClick = async () => await signIn("google");
  const handleLogOutClick = async () => await signOut();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Button onClick={session ? handleLogOutClick : handleLogInClick}>
        {session ? "Fazer Logout" : "Fazer Login"}
      </Button>
    </main>
  );
};

export default Home;
