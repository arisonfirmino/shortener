"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

import { updateShortId } from "@/app/actions/url/update";

import { toast } from "sonner";

import { ShortURL } from "@prisma/client";

const schema = yup.object({
  shortId: yup
    .string()
    .required("Escolha um identificador para sua URL curta.")
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "Use apenas letras, números, hífen ou underline (sem espaços).",
    )
    .min(3, "O identificador deve ter pelo menos 3 caracteres.")
    .max(30, "O identificador deve ter no máximo 30 caracteres."),
});

type FormData = yup.InferType<typeof schema>;

interface EditFormProps {
  url: Pick<ShortURL, "id" | "shortId">;
  setOpen: (value: boolean) => void;
}

const EditForm = ({ url, setOpen }: EditFormProps) => {
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

    const result = await updateShortId({
      userEmail: session.user.email,
      URLId: url.id,
      shortId: data.shortId,
    });

    if (result?.error) {
      setIsLoading(false);
      setError("shortId", {
        type: "manual",
        message: result.error,
      });
      return;
    }

    reset();
    setIsLoading(false);
    setOpen(false);
    toast.success("URL atualizada com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex w-full items-center text-base font-medium">
          <span>{process.env.NEXT_PUBLIC_BASE_URL}</span>
          <input
            placeholder={url.shortId}
            {...register("shortId")}
            className="text-primary placeholder:text-muted-foreground w-full truncate outline-none"
          />
        </div>

        <Button disabled={isLoading} size="icon" className="min-w-8">
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <MoveRightIcon />
          )}
        </Button>
      </div>

      {errors.shortId && (
        <p className="text-destructive text-xs">{errors.shortId.message}</p>
      )}
    </form>
  );
};

export default EditForm;
