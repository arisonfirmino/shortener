"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, UnlockIcon } from "lucide-react";

import { reactivateShortURL } from "@/app/actions/url";

import { toast } from "sonner";

const ReactivateURLButton = ({ shortURLId }: { shortURLId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const hansdleReactivate = async () => {
    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    await reactivateShortURL({ userId: session.user.id, shortURLId });

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

export default ReactivateURLButton;
