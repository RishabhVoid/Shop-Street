const getSlicedProducts = <T>(start: number, end: number, array: T[]): T[] => {
  return array.slice(start, end);
};

export default getSlicedProducts;
