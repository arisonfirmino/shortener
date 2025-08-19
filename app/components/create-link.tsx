import ShortenerForm from "@/app/components/shortener-form";

import { LinkIcon } from "lucide-react";

const CreateLink = () => {
  return (
    <div className="grid gap-3 border-b p-5">
      <div className="flex items-center gap-2">
        <p className="text-base font-medium uppercase">Criar novo link</p>
        <LinkIcon size={16} />
      </div>

      <span className="text-muted-foreground text-xs">
        Crie, encurte e gerencie seus links
      </span>

      <ShortenerForm />
    </div>
  );
};

export default CreateLink;
