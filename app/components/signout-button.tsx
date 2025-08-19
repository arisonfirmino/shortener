"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const handleSignOutClick = async () => await signOut();

  return (
    <Button onClick={handleSignOutClick} size="icon" variant="outline">
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
