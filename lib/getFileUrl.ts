const getFileUrl: (file: File) => string = (file: File) => {
  const url = URL.createObjectURL(file);
  return url;
};

export default getFileUrl;
