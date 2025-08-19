import { Button } from "@/app/components/ui/button";

import { LinkIcon, MoveRightIcon } from "lucide-react";

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

      <form className="bg-background flex items-center gap-2.5 rounded-xl border p-2.5 shadow-xs">
        <input
          placeholder="Insira a URL original"
          className="placeholder:text-muted-foreground h-full w-full truncate text-base outline-none md:text-sm"
        />
        <Button size="icon-lg" className="min-w-10">
          <MoveRightIcon />
        </Button>
      </form>
    </div>
  );
};

export default CreateLink;
