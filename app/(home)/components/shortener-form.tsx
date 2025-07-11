"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, MoveRightIcon } from "lucide-react";

import { createShortUrl } from "@/app/actions/url/create";

import { toast } from "sonner";

const schema = yup.object({
  title: yup.string(),
  url: yup
    .string()
    .required("A URL é obrigatória.")
    .url("Informe uma URL válida, como https://exemplo.com"),
});

type FormData = yup.InferType<typeof schema>;

const ShortenerForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const response = await createShortUrl({ ...data, userId });

    if (!response.success) {
      if (response.type === "conflict") {
        setError("url", {
          type: "manual",
          message: response.error,
        });
      } else {
        toast(response.error);
      }

      setIsLoading(false);
      return;
    }

    toast("URL encurtada com sucesso!");
    reset();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      <div className="flex flex-col items-center gap-2.5 md:flex-row">
        <Input
          placeholder="Título"
          {...register("title")}
          className="md:max-w-40"
        />

        <Input placeholder="URL" {...register("url")} error={errors.url} />

        <Button type="submit" disabled={isLoading} className="w-full md:w-fit">
          Salvar
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin md:hidden" />
          ) : (
            <MoveRightIcon className="md:hidden" />
          )}
        </Button>
      </div>

      {errors.url && (
        <p className="animate-fade-right animate-duration-200 ml-2.5 text-xs text-red-400">
          {errors.url.message}
        </p>
      )}
    </form>
  );
};

export default ShortenerForm;
