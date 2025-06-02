export const getExpirationDate = (months = 1) => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
};
