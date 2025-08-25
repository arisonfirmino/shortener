import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(date, "dd MMM yyyy HH:mm", { locale: ptBR });
};

export const getTimeToExpire = (date: Date) => {
  if (new Date() > date) {
    return "expirado";
  } else {
    return `expira em ${formatDistance(date, new Date(), { locale: ptBR }).replace("cerca de", "")}`;
  }
};
