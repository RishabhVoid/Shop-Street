export default function getFileExtension(file: File): string | undefined {
  const fileName = file.name;
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex !== -1) {
    // Extract the extension from the file name
    return fileName.slice(dotIndex + 1);
  }

  // If there's no dot in the file name, return undefined or handle the case accordingly
  return undefined;
}
