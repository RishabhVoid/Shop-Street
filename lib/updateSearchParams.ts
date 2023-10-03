const updateSearchParams = (types: string[], values: string[]) => {
  const searchParams = new URLSearchParams(window.location.search);
  types.forEach((type, index) => {
    searchParams.set(type, values[index]);
  });
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export default updateSearchParams;
