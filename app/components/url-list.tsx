import URLItem from "@/app/components/url-item";

import { ShortURL } from "@prisma/client";

const URLList = ({ urls }: { urls: ShortURL[] }) => {
  return (
    <ul className="flex flex-col gap-3">
      {urls.map((url) => (
        <li key={url.id}>
          <URLItem url={url} />
        </li>
      ))}
    </ul>
  );
};

export default URLList;
