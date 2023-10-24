const getChunkedArray = <T>(skipSize: number, array: T[]): T[][] => {
  const result: T[][] = [];
  for (let index = 0; index < array.length; index += skipSize) {
    result.push(array.slice(index, index + skipSize));
  }
  return result;
};

export default getChunkedArray;
