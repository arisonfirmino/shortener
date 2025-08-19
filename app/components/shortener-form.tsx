"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

const schema = yup.object({
  url: yup
    .string()
    .required("A URL é obrigatória")
    .url("Digite uma URL válida, por exemplo: https://exemplo.com"),
});

type FormData = yup.InferType<typeof schema>;

const ShortenerForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (!session) {
      return;
    }

    setIsLoading(true);

    console.log(data);

    reset();
    setIsLoading(false);
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
