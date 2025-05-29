import ShortUrlItem from "@/app/(home)/components/short-url-item";

import { ShortURL } from "@prisma/client";

interface ShortUrlListProps {
  shortUrls: ShortURL[];
}

const ShortUrlList = ({ shortUrls }: ShortUrlListProps) => {
  return (
    <ul className="space-y-2.5">
      {shortUrls.map((shortUrl) => (
        <li key={shortUrl.id}>
          <ShortUrlItem shortUrl={shortUrl} />
        </li>
      ))}
    </ul>
  );
};

export default ShortUrlList;
