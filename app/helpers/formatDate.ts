import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatExpiresDate = (date: Date) => {
  const distance = formatDistance(new Date(), date, { locale: ptBR });
  return distance.replace(/^cerca de /, "");
};
