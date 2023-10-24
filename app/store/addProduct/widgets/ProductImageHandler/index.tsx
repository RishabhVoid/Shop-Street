import getFileUrl from "@/lib/getFileUrl";
import { ChangeEvent, SetStateAction } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsFillCloudUploadFill } from "react-icons/bs";

interface Props {
  currentImage: number;
  files: File[];
  setFiles: (value: SetStateAction<File[]>) => void;
  goToNextImage: () => void;
  goToPrevImage: () => void;
  popUp: (title: string, description: string) => void;
}

const ProductImageHandler = ({
  currentImage,
  files,
  setFiles,
  goToNextImage,
  goToPrevImage,
  popUp,
}: Props) => {
  const handleFilesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const listOfAcceptedFiles: File[] = [];
    let overSizeFiles = 0;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const currentFile = uploadedFiles[i];
      if (
        currentFile.type === "image/png" ||
        currentFile.type === "image/jpeg"
      ) {
        if (currentFile.size <= 800 * 1024) {
          listOfAcceptedFiles.push(currentFile);
        } else {
          overSizeFiles = overSizeFiles + 1;
        }
      }
    }

    if (overSizeFiles > 0) {
      popUp(
        `${overSizeFiles} files couldn't be uploaded! due to large size!`,
        "You can only upload files which are under 800KB."
      );
    }

    setFiles((files) => {
      const newFileList = [...files, ...listOfAcceptedFiles];
      return newFileList.slice(0, 4);
    });
  };

  return (
    <div className="w-full max-w-[20rem] relative z-10 md:max-w-none md:flex-1 md:mr-2">
      <span className="bg-[--primary-accent] w-[40px] h-[40px] absolute right-2 top-2 rounded-full flex items-center justify-center text-white">
        {currentImage + 1}
      </span>
      <div className="flex absolute top-2 left-2 items-center">
        <h2 className="bg-white md:bg-[--primary-accent] md:text-white p-2 rounded-full">
          {files.length}/4
        </h2>
        <h2 className="bg-white md:bg-[--primary-accent] md:text-white -ml-1 px-2 rounded-r-[5px]">
          Uploaded
        </h2>
      </div>
      <div className="absolute h-full w-[40px] flex items-center justify-center">
        <div
          onClick={() => goToPrevImage()}
          className="bg-[--primary-accent] flex items-center justify-center p-1 rounded-full cursor-pointer"
        >
          <AiFillCaretLeft style={{ fontSize: 28, color: "white" }} />
        </div>
      </div>
      <div className="absolute h-full right-0 w-[40px] flex items-center justify-center">
        <div
          onClick={() => goToNextImage()}
          className="bg-[--primary-accent] flex items-center justify-center p-1 rounded-full cursor-pointer"
        >
          <AiFillCaretRight style={{ fontSize: 28, color: "white" }} />
        </div>
      </div>
      <img
        src={
          !files.length
            ? "/images/no_product_uploads.png"
            : getFileUrl(files[currentImage])
        }
        className="w-[320px] h-[320px] object-contain object-center pointer-events-none md:w-full md:h-full md:max-h-[35rem]"
        alt=""
      />
      <div className="absolute bottom-6 right-2 bg-[--primary-accent] rounded-full p-2">
        <BsFillCloudUploadFill style={{ fontSize: 28, color: "white" }} />
        <input
          type="file"
          className="opacity-0 absolute top-0 left-0 w-full h-full z-50 outline-[--primary-accent]"
          multiple
          onChange={handleFilesUpload}
        />
      </div>
    </div>
  );
};

export default ProductImageHandler;
