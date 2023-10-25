const getCustomTimeStamp = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${currentDate}-${month + 1}-${year}`;
};

export default getCustomTimeStamp;
