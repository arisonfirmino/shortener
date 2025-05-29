import { getFaviconUrl } from "@/app/helpers/getFaviconUrl";

const Favicon = ({ url }: { url: string }) => {
  return <img src={getFaviconUrl(url)} alt="Favicon" height={14} width={14} />;
};

export default Favicon;
