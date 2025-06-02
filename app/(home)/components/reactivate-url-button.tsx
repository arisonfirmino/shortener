"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, UnlockIcon } from "lucide-react";

import { reactivateShortUrl } from "@/app/actions/url/reactivate";

import { toast } from "sonner";

const ReactivateUrlButton = ({ shortUrlId }: { shortUrlId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const hansdleReactivate = async () => {
    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    const response = await reactivateShortUrl({
      userId: session.user.id,
      shortUrlId,
    });

    if (!response.success) {
      setIsLoading(false);
      toast(response.error);
      return;
    }

    setIsLoading(false);
    toast("URL reativada com sucesso!");
  };

  return (
    <Button
      size="icon"
      variant="outline"
      disabled={isLoading}
      onClick={hansdleReactivate}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <UnlockIcon />
      )}
    </Button>
  );
};

export default ReactivateUrlButton;
