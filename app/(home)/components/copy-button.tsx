"use client";

import { Button } from "@/app/components/ui/button";

import { CopyIcon } from "lucide-react";

import { toast } from "sonner";

const CopyButton = ({ shortId }: { shortId: string }) => {
  const copy = async () => {
    const shortURL = `https://${process.env.NEXT_PUBLIC_BASE_URL + shortId}`;
    await navigator.clipboard
      .writeText(shortURL)
      .then(() => toast("Link copiado para a área de transferência!"));
  };

  return (
    <Button size="icon" variant="outline" onClick={copy}>
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;
