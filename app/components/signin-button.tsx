"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogInIcon } from "lucide-react";

const SignInButton = () => {
  const handleSignInClick = async () => await signIn("googles");

  return (
    <Button onClick={handleSignInClick} variant="outline">
      <LogInIcon /> Fazer login
    </Button>
  );
};

export default SignInButton;
