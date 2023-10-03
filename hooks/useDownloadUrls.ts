import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage } from "@/firebaseConfig";

const useDownloadUrls = (paths: string[]) => {
  const downloadUrls: { [key: string]: string } = {};

  paths.forEach((path) => {
    const [url] = useDownloadURL(ref(storage, path));
    if (url) {
      downloadUrls[path] = url;
    }
  });

  return downloadUrls;
};

export default useDownloadUrls;
