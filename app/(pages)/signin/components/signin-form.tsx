"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

import { userExists, isPasswordCorrect } from "@/app/helpers/authValidation";

const schema = yup.object({
  identifier: yup.string().required("O identificador é obrigatório."),
  password: yup.string().required("A senha é obrigatória."),
});

type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formErrors = errors.identifier?.message || errors.password?.message;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const user = await userExists(data.identifier);

    if (!user) {
      setError("identifier", {
        type: "manual",
        message: "Usuário não cadastrado.",
      });

      setIsLoading(false);
      return;
    }

    const password = await isPasswordCorrect(data.identifier, data.password);

    if (!password) {
      setError("password", {
        type: "manual",
        message: "Senha incorreta.",
      });

      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    reset();
    setIsLoading(false);
    router.replace("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2.5 rounded-2xl border border-black/10 bg-white p-2.5 shadow"
    >
      <Input
        placeholder="E-mail ou nome de usuário"
        {...register("identifier")}
        error={errors.identifier}
      />

      <Input
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      {formErrors && (
        <p className="animate-fade-right animate-duration-200 ml-2.5 text-xs text-red-400">
          {formErrors}
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Carregando" : "Entrar"}

        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <MoveRightIcon />
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
