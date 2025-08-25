import { cn } from "@/app/lib/utils";
import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import EditURL from "@/app/components/edit-url";
import ReactivateUrlButton from "@/app/components/reactivate-url-button";
import { Separator } from "@/app/components/ui/separator";

import { ClockIcon, MousePointerClickIcon, SendIcon } from "lucide-react";

import { getTimeToExpire } from "@/app/helpers/formatDate";

import { ShortURL } from "@prisma/client";

const URLItem = ({ url }: { url: ShortURL }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Card>
      <CardHeader>
        <a
          href={baseURL + url.shortId}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("text-sm font-semibold hover:underline")}
        >
          {baseURL?.replace(/^https?:\/\//, "")}
          <span className="text-primary">{url.shortId}</span>
        </a>

        <div className="flex items-center gap-2.5">
          <EditURL url={url} />
          {new Date() > url.expires_at ? (
            <ReactivateUrlButton URLId={url.id} />
          ) : (
            <Button size="icon">
              <SendIcon />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardFooter>
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-muted-foreground line-clamp-1 w-fit text-xs hover:underline",
          )}
        >
          {url.originalUrl}
        </a>

        <Separator className="my-3" />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <ClockIcon size={14} /> {getTimeToExpire(url.expires_at)}
          </span>

          <span className="text-primary flex items-center gap-1.5 text-xs font-medium">
            <MousePointerClickIcon size={14} /> {url.clicks}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default URLItem;
