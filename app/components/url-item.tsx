import { cn } from "@/app/lib/utils";
import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";

import { ClockIcon, EditIcon, SendIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";

import { ShortURL } from "@prisma/client";

const URLItem = ({ url }: { url: ShortURL }) => {
  return (
    <Card>
      <CardHeader>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("text-sm font-semibold hover:underline")}
        >
          <span className="text-primary">shortenerbr</span>/{url.shortId}
        </a>

        <div className="flex items-center gap-2.5">
          <Button size="icon">
            <EditIcon />
          </Button>
          <Button size="icon">
            <SendIcon />
          </Button>
        </div>
      </CardHeader>

      <CardFooter>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-muted-foreground line-clamp-1 text-xs hover:underline",
          )}
        >
          {url.originalUrl}
        </a>

        <Separator className="my-3" />

        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <ClockIcon size={14} /> {formatDate(url.created_at)}
        </span>
      </CardFooter>
    </Card>
  );
};

export default URLItem;
