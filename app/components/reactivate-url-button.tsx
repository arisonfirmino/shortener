"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { LockOpenIcon, LoaderCircleIcon } from "lucide-react";

import { reactivateURL } from "@/app/actions/url/update";

import { toast } from "sonner";

const ReactivateUrlButton = ({ URLId }: { URLId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleReactivateUrl = async () => {
    if (!session) {
      toast.error("Usuário não identificado. Faça login para criar uma URL.");
      return;
    }

    setIsLoading(true);

    await toast.promise(
      reactivateURL({ userEmail: session.user.email, URLId }),
      {
        loading: "Reativando sua URL...",
        success: "Sua URL foi reativada por mais 30 dias!",
        error: (error) =>
          error.message || "Não foi possível reativar a URL. Tente novamente",
      },
    );

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading}>
        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <LockOpenIcon />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reativar URL expirada</AlertDialogTitle>
          <AlertDialogDescription>
            Isso vai estender a validade do seu link por mais 30 dias. Seus
            dados permanecerão intactos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleReactivateUrl}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReactivateUrlButton;
