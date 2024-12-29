import { storage } from "@/appwriteConfig";
import ResponseWrapper, { ResponseWrapperType } from "@/utils/responseWrapper";
import { Models } from "appwrite";

const BUCKET_ID = "6764f3ae000e673c1b04";

const useFileStorage = () => {

  const uploadFile = async (
    id: string,
    file: File
  ): Promise<ResponseWrapperType<null>> => {
    try {
      await storage.createFile(
        BUCKET_ID,
        id,
        file
      );
      return ResponseWrapper.success(null, "", "");
    } catch (error: any) {
      return ResponseWrapper.failure(null, error?.toString(), "");
    };
  };

  const getFile = async (
    id: string
  ): Promise<ResponseWrapperType<Models.File | null>> => {
    try {
      let file = await storage.getFile(BUCKET_ID, id);
      return ResponseWrapper.success(file, "", "");
    } catch (error: any) {
      return ResponseWrapper.failure(null, error?.toString(), "");
    };
  };

  return {
    uploadFile,
    getFile
  };
};

export default useFileStorage;
