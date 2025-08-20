"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

import { createURL } from "@/app/actions/url/create";
import { toast } from "sonner";

const schema = yup.object({
  url: yup
    .string()
    .required("Por favor, insira a URL que deseja encurtar.")
    .url("Digite uma URL válida, por exemplo: https://exemplo.com"),
});

type FormData = yup.InferType<typeof schema>;

const ShortenerForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session) {
      toast.error("Usuário não identificado. Faça login para criar uma URL.");
      return;
    }

    setIsLoading(true);

    const result = await createURL({
      userEmail: session.user.email,
      url: data.url,
    });

    if (result?.error) {
      setIsLoading(false);
      setError("url", {
        type: "manual",
        message: result.error,
      });
      return;
    }

    reset();
    setIsLoading(false);
    toast.success("URL criada com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2.5">
      <div
        className={cn(
          "bg-background flex items-center gap-2.5 rounded-xl border p-2.5 shadow-xs",
          errors.url && "border-destructive",
        )}
      >
        <input
          placeholder="Insira a URL original"
          {...register("url")}
          className="placeholder:text-muted-foreground h-full w-full truncate text-base outline-none md:text-sm"
        />

        <Button
          type="submit"
          disabled={isLoading}
          size="icon-lg"
          className="min-w-10"
        >
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <MoveRightIcon />
          )}
        </Button>
      </div>

      {errors.url && (
        <p className="text-destructive text-xs">{errors.url.message}</p>
      )}
    </form>
  );
};

export default ShortenerForm;
