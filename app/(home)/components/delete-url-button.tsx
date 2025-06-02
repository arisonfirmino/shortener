"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

import { deleteShortUrl } from "@/app/actions/url/delete";

import { toast } from "sonner";

const DeleteUrlButton = ({ shortUrlId }: { shortUrlId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    const response = await deleteShortUrl({
      userId: session.user.id,
      shortUrlId,
    });

    if (!response.success) {
      setIsLoading(false);
      toast(response.error);
      return;
    }

    setIsLoading(false);
    toast("URL deletada com sucesso!");
  };

  return (
    <Button
      size="icon"
      variant="outline"
      disabled={isLoading}
      onClick={handleDelete}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
};

export default DeleteUrlButton;
