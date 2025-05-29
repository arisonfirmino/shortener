"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const handleSignOutClick = async () => await signOut();

  return (
    <Button onClick={handleSignOutClick} className="max-w-10 md:max-w-fit">
      <span className="hidden md:flex">Desconectar</span>
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
