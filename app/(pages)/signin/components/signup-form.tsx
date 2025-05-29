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

import { createAccount } from "@/app/actions/user";

const schema = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido."),
  username: yup
    .string()
    .required("O nome de usuário é obrigatório.")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
    .matches(
      /^[a-z0-9]+$/,
      "Use apenas letras minúsculas e números, sem espaços ou símbolos.",
    ),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
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

  const formErrors =
    errors.email?.message ||
    errors.username?.message ||
    errors.password?.message;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const response = await createAccount({
      email: data.email,
      username: data.username,
      password: data.password,
    });

    if (response?.error) {
      if (response.type === "email") {
        setError("email", {
          type: "manual",
          message: response.error,
        });
      }

      if (response.type === "username") {
        setError("username", {
          type: "manual",
          message: response.error,
        });
      }

      if (response.type === "password") {
        setError("password", {
          type: "manual",
          message: response.error,
        });
      }

      setIsLoading(false);
      return;
    }

    await signIn("credentials", {
      redirect: false,
      identifier: data.email,
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
      <Input placeholder="E-mail" {...register("email")} error={errors.email} />

      <Input
        placeholder="Nome de usuário"
        {...register("username")}
        error={errors.username}
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
        {isLoading ? "Carregando" : "Cadastrar"}

        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <MoveRightIcon />
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
