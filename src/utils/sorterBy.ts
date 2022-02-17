export const sorterBy = <Item>(items: Item[], pathName: keyof Item): Item[] =>
  items.sort(({ [pathName]: a }, { [pathName]: b }) => {
    const itemA = isNaN(+a) ? a : +a;
    const itemB = isNaN(+b) ? b : +b;

    if (itemA > itemB) return 1;
    if (itemA < itemB) return -1;
    return 0;
  });
