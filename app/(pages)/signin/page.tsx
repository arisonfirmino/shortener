"use client";

import { useState } from "react";

import Container from "@/app/components/container";
import SignInForm from "@/app/(pages)/signin/components/signin-form";
import SignUpForm from "@/app/(pages)/signin/components/signup-form";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Container showCopyright className="md:justify-center">
      <div className="mt-10 flex w-full max-w-4/5 flex-col gap-2.5 rounded-2xl md:mt-0 md:max-w-80">
        {isSignUp ? <SignUpForm /> : <SignInForm />}

        <div className="text-center text-sm">
          <span className="text-black/50">
            {isSignUp ? "Já tem uma conta?" : "Ainda não tem uma conta?"}
          </span>
          &nbsp;
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer font-medium hover:underline"
          >
            {isSignUp ? "Fazer login" : "Criar conta"}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
