"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import EditForm from "@/app/components/edit-form";

import { EditIcon } from "lucide-react";

import { ShortURL } from "@prisma/client";

const EditURL = ({ url }: { url: ShortURL }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <EditIcon />
      </SheetTrigger>

      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Editar URL</SheetTitle>
          <SheetDescription>
            Altere o identificador da sua URL curta. O link antigo deixará de
            funcionar após a atualização.
          </SheetDescription>
        </SheetHeader>

        <EditForm url={url} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default EditURL;
