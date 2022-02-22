export const numberToTime = (time: number) => {
  let aux = String(time);
  aux = aux.padStart(4, '0');
  aux = `${aux.slice(0, 2)}:${aux.slice(2)}`;

  return aux;
};
