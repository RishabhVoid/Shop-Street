const parseCustomTimeStamp = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getCustomTimeDiff = (
  dateString1: string,
  dateString2: string
): number => {
  const date1 = parseCustomTimeStamp(dateString1).getTime();
  const date2 = parseCustomTimeStamp(dateString2).getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));

  return diffDays;
};

export default getCustomTimeDiff;
