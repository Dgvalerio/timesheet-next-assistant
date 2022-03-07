export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':');

  return Number(hours) * 60 + Number(minutes);
};

export const timeToNumber = (time: string): number => {
  const [hours, minutes] = time.split(':');

  return Number(`${hours}.${Math.floor((Number(minutes) * 100) / 60)}`);
};

export const minutesToTime = (number: number): string => {
  const aux = { hours: Math.floor(number / 60), minutes: number % 60 };
  const hours = String(aux.hours).padStart(2, '0');
  const minutes = String(aux.minutes).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const invertDate = (normalDate: string): string => {
  const [day, month, year] = normalDate.split('/');

  return `${year}${month}${day}`;
};
