"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/components/ui/card";
import Favicon from "@/app/(home)/components/favicon";
import { Button } from "@/app/components/ui/button";
import CopyButton from "@/app/(home)/components/copy-button";
import ReactivateUrlButton from "@/app/(home)/components/reactivate-url-button";
import DeleteUrlButton from "@/app/(home)/components/delete-url-button";

import { DotIcon } from "lucide-react";

import { ShortURL } from "@prisma/client";

import { formatExpiresDate } from "@/app/helpers/formatDate";

interface ShortUrlItemProps {
  shortUrl: ShortURL;
}

const ShortUrlItem = ({ shortUrl }: ShortUrlItemProps) => {
  const shortLink = process.env.NEXT_PUBLIC_BASE_URL + shortUrl.shortId;

  const redirect = () =>
    window.open(shortLink, "_blank", "noopener,noreferrer");

  return (
    <Card>
      <CardHeader>
        <div className="flex max-w-3/5 flex-col">
          <div className="flex items-center gap-1">
            <CardTitle>
              <Favicon url={shortUrl.originalUrl} />
              <p className="truncate">
                {shortUrl.title ? shortUrl.title : "Untitled"}
              </p>
            </CardTitle>

            <DotIcon size={16} className="text-foreground/50" />

            <p className="text-foreground/50 text-xs text-nowrap">
              {shortUrl.clicks} {shortUrl.clicks === 1 ? "visita" : "visitas"}
            </p>
          </div>

          <Button onClick={redirect} size="link" variant="link">
            {shortLink.replace(/^https?:\/\//, "")}
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          <CopyButton shortId={shortUrl.shortId} />
          {new Date() > new Date(shortUrl.expires_at) && (
            <ReactivateUrlButton shortUrlId={shortUrl.id} />
          )}
          <DeleteUrlButton shortUrlId={shortUrl.id} />
        </div>
      </CardHeader>

      <CardFooter>
        <p className="max-w-1/2 truncate">{shortUrl.originalUrl}</p>
        {new Date() > new Date(shortUrl.expires_at) ? (
          <p className="text-red-600">expirado</p>
        ) : (
          <p>{formatExpiresDate(shortUrl.expires_at)} para expirar</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShortUrlItem;
