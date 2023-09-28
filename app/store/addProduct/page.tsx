"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import { Categories, ProductViewProfiles, ResponseCodes } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/firebaseConfig";
import { StorageReference, getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import getFileExtension from "@/lib/getFileExtention";
import Loading from "./widgets/Loading";

const AddProduct = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isDis, setIsDis] = useState(false);

  const logsRef = useRef<HTMLDivElement>(null);
  const pictureViewRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const inventorySizeRef = useRef<HTMLInputElement>(null);
  const deliveryDistanceRef = useRef<HTMLInputElement>(null);
  const deliveryTimeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [uploadFile] = useUploadFile();

  const isFormValid: () => string[] | [] = () => {
    if (
      !titleRef.current ||
      !priceRef.current ||
      !inventorySizeRef.current ||
      !deliveryDistanceRef.current ||
      !deliveryTimeRef.current ||
      !descRef.current
    ) {
      return ["Internal error", "Please reload the app!"];
    }

    const errorList: string[] = [];

    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const inventorySize = inventorySizeRef.current.value;
    const deliveryDistance = deliveryDistanceRef.current.value;
    const deliveryTime = deliveryTimeRef.current.value;
    const desc = descRef.current.value;

    if (categories.length < 1) {
      errorList.push("Please add a category!");
    }
    if (files.length !== 4) {
      errorList.push("Please add 4 images!");
    }
    if (!title.trim()) {
      errorList.push("Please give a product name!");
    }
    if (!price.trim() || parseInt(price) < 5) {
      errorList.push("Price cannot be lower than 5$");
    }
    if (!inventorySize.trim() || parseInt(inventorySize) < 1) {
      errorList.push("There should be atleast 1 item in inventory.");
    }
    if (!deliveryDistance.trim() || parseInt(deliveryDistance) < 1) {
      errorList.push("Delivery distance should be atleast 1Km.");
    }
    if (!deliveryTime.trim() || parseInt(deliveryTime) < 1) {
      errorList.push("Delivery time should be atleast 1day.");
    }
    if (!desc.trim()) {
      errorList.push("Description cannot be empty!.");
    }

    return errorList;
  };

  const handleCategoryAdd = (category: string) => {
    if (categories.includes(category.toLowerCase())) {
      setCategories((categories) => {
        return categories.filter((item) => item !== category.toLowerCase());
      });
      return;
    }
    setCategories((categories) => [...categories, category.toLowerCase()]);
  };

  const handleFilesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const listOfAcceptedFiles: File[] = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const currentFile = uploadedFiles[i];
      if (
        currentFile.type === "image/png" ||
        currentFile.type === "image/jpeg"
      ) {
        if (currentFile.size <= 800 * 1024) {
          listOfAcceptedFiles.push(currentFile);
        }
      }
    }

    setFiles((files) => {
      const newFileList = [...files, ...listOfAcceptedFiles];
      return newFileList.slice(0, 4);
    });
  };

  const handleReset = (toShowToast: boolean = true) => {
    if (
      !titleRef.current ||
      !priceRef.current ||
      !inventorySizeRef.current ||
      !deliveryDistanceRef.current ||
      !deliveryTimeRef.current ||
      !descRef.current
    )
      return;

    titleRef.current.value = "";
    priceRef.current.value = "";
    inventorySizeRef.current.value = "";
    deliveryDistanceRef.current.value = "";
    deliveryTimeRef.current.value = "";
    descRef.current.value = "";
    setFiles([]);
    setCurrentImage(0);
    setLogs([]);
    setCategories([]);
    if (toShowToast) {
      toast({
        title: "Cleared the form",
        description:
          "All files have been removed and inputs have been cleared!",
      });
    }
  };

  const uploadImageToStorage = async (ref: StorageReference, file: File) => {
    const result = await uploadFile(ref, file, {
      contentType: "image/jpeg",
    });
  };

  const postProduct = async (
    title: string,
    desc: string,
    price: string,
    matchingCategories: string[],
    inventory: string,
    maxDistance: string,
    deliveryDays: string,
    sellerEmail: string
  ) => {
    const rawRes = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        price,
        matchingCategories,
        inventory,
        maxDistance,
        deliveryDays,
        sellerEmail,
      }),
    });

    const jsonData = await rawRes.json();

    if (jsonData.status === ResponseCodes.INVALID_CREDENTIALS) {
      toast({
        title: "Oops there seems to be a problem!",
        description:
          "Your account wasn't recognized whilst creating the product, please relogin from the home page.",
      });
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.CONDITIONS_MISMATCHED) {
      toast({
        title: "A seller impersonator!?",
        description: "Your account isn't registed as a seller!",
      });
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.SUCCESS) {
      toast({
        title: `Added product ${title}`,
        description: "Product was successfully added to your shop!",
      });
      const productId = jsonData.data.id as string;
      ProductViewProfiles.map((profile, index) => {
        const currentFile = files[index];
        const currentFileExtention = getFileExtension(currentFile);
        if (!currentFileExtention) return;
        const productProfileImageName = `${productId}-${profile}`;
        const imageRef = ref(storage, productProfileImageName);
        uploadImageToStorage(imageRef, currentFile);
      });
      if (!pictureViewRef.current || !logsRef.current) return;
      if (window.innerWidth < 768) {
        pictureViewRef.current.scrollIntoView({ behavior: "smooth" });
      }
      logsRef.current.scrollIntoView({ behavior: "smooth" });
      handleReset(false);
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.UNKNOWN_ERROR) {
      toast({
        title: "The dog stepped on a bee!!",
        description:
          "The product couldn't be added due to an internal error! We apologies for any inconveniences, please try in a moment!",
      });
      setIsDis(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsDis(true);
    if (!pictureViewRef.current || !logsRef.current) return;
    const possibleLogs = isFormValid();
    if (possibleLogs.length) {
      setLogs(possibleLogs);
      if (window.innerWidth < 768) {
        pictureViewRef.current.scrollIntoView({ behavior: "smooth" });
      }
      logsRef.current.scrollIntoView({ behavior: "smooth" });
      setIsDis(false);
      setTimeout(() => {
        setLogs([]);
      }, 10000);
      return;
    }

    if (
      !titleRef.current ||
      !priceRef.current ||
      !inventorySizeRef.current ||
      !deliveryDistanceRef.current ||
      !deliveryTimeRef.current ||
      !descRef.current
    ) {
      return;
    }

    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const inventorySize = inventorySizeRef.current.value;
    const deliveryDistance = deliveryDistanceRef.current.value;
    const deliveryTime = deliveryTimeRef.current.value;
    const desc = descRef.current.value;

    if (!user || !user.email) return;
    const sellerEmail = user.email;
    const matchingCategories = categories;

    (async () =>
      await postProduct(
        title,
        desc,
        price,
        matchingCategories,
        inventorySize,
        deliveryDistance,
        deliveryTime,
        sellerEmail
      ))();
  };

  const getFileUrl: (file: File) => string = (file: File) => {
    const url = URL.createObjectURL(file);
    return url;
  };

  const goToNextImage = () =>
    setCurrentImage((imageIndex) => {
      if (!files.length) return 0;
      if (imageIndex === 3) {
        return 0;
      } else {
        return imageIndex + 1;
      }
    });

  const goToPrevImage = () =>
    setCurrentImage((imageIndex) => {
      if (!files.length) return 0;
      if (imageIndex === 0) {
        return 3;
      } else {
        return imageIndex - 1;
      }
    });

  return (
    <div
      className={
        "h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto md:flex-row md:w-full"
      }
    >
      {isDis && <Loading />}
      <div
        ref={pictureViewRef}
        className="w-full max-w-[20rem] relative z-10 md:max-w-none md:flex-1 md:mr-2"
      >
        <div className="flex absolute top-2 left-2 items-center">
          <h2 className="bg-white md:bg-accent md:text-white p-2 rounded-full">
            {files.length}/4
          </h2>
          <h2 className="bg-white md:bg-accent md:text-white -ml-1 px-2 rounded-r-[5px]">
            Uploaded
          </h2>
        </div>
        <div className="absolute h-full w-[40px] flex items-center justify-center">
          <div
            onClick={() => goToPrevImage()}
            className="bg-accent flex items-center justify-center p-1 rounded-full cursor-pointer"
          >
            <AiFillCaretLeft style={{ fontSize: 28, color: "white" }} />
          </div>
        </div>
        <div className="absolute h-full right-0 w-[40px] flex items-center justify-center">
          <div
            onClick={() => goToNextImage()}
            className="bg-accent flex items-center justify-center p-1 rounded-full cursor-pointer"
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
          className="w-[320px] h-[320px] object-contain object-center md:w-full md:h-full md:max-h-[35rem]"
          alt=""
        />
        <div className="absolute bottom-6 right-2 bg-accent rounded-full p-2">
          <BsFillCloudUploadFill style={{ fontSize: 28, color: "white" }} />
          <input
            type="file"
            className="opacity-0 absolute top-0 left-0 w-full h-full z-50"
            multiple
            onChange={handleFilesUpload}
          />
        </div>
      </div>
      <form
        className="w-[95%] flex flex-col p-2 rounded-t-[5px] bg-white z-20 -mt-4 flex-1 md:flex-none md:w-[20rem] md:h-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col md:overflow-y-auto md:h-full md:py-4 scrollbar custom_scroll">
          <div
            ref={logsRef}
            className="bg-red-400 rounded-[5px] px-2 text-white"
          >
            {logs.map((log, index) => (
              <h2 key={index}>{log}</h2>
            ))}
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Product name
            </label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              className="shadow-sm w-full mt-2 shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
              placeholder="Shadme mobile 3000..."
            />
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Price
            </label>
            <div className="flex items-center mt-2">
              <h2 className="text-[1.7rem] bg-accent text-white mr-2 px-2 rounded-[5px]">
                $
              </h2>
              <input
                type="number"
                id="title"
                ref={priceRef}
                className="shadow-sm w-full shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
                placeholder="1200..."
              />
            </div>
          </div>
          <div className="w-full flex flex-col h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Choose categories
            </label>
            <div className="h-auto flex flex-wrap items-center min-h-[2rem]">
              {categories.map((category, index) => (
                <h2
                  key={index}
                  className="capitalize m-1 bg-blue-600 p-1 rounded-[5px] text-white"
                >
                  #{category}
                </h2>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-primary align-left bg-accent text-white py-2 rounded-[5px]">
                Choose category
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white h-[20rem] rounded-[5px] overflow-y-scroll custom_scroll">
                {Categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className={`capitalize cursor-pointer ${
                      categories.includes(category.toLowerCase()) &&
                      "bg-blue-800 text-white"
                    }`}
                    onClick={() => handleCategoryAdd(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Inventory size
            </label>
            <input
              type="number"
              id="title"
              ref={inventorySizeRef}
              className="shadow-sm w-full mt-2 shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
              placeholder="10"
            />
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Delivery distance
            </label>
            <div className="flex flex-row-reverse items-center mt-2">
              <h2 className="text-[1.7rem] bg-accent font-primary text-white ml-2 px-2 rounded-[5px]">
                Km
              </h2>
              <input
                type="number"
                id="title"
                ref={deliveryDistanceRef}
                className="shadow-sm w-full shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
                placeholder="52..."
              />
            </div>
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Delivery time
            </label>
            <div className="flex flex-row-reverse items-center mt-2">
              <h2 className="text-[1.7rem] font-primary bg-accent text-white ml-2 px-2 rounded-[5px]">
                Days
              </h2>
              <input
                type="number"
                id="title"
                ref={deliveryTimeRef}
                className="shadow-sm w-full shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
                placeholder="5..."
              />
            </div>
          </div>
          <div className="w-full h-auto mb-4">
            <label
              htmlFor="title"
              className="text-slate-600 font-primary text-[1.1rem]"
            >
              Description
            </label>
            <textarea
              id="title"
              ref={descRef}
              className="shadow-sm w-full mt-2 h-[10rem] resize-none shadow-slate-600 text-[1rem] p-2 rounded-[5px]"
              placeholder="Best glossy chair..."
            />
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-600 font-primary rounded-[5px] py-2 text-white"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-red-500 mt-4 font-primary rounded-[5px] py-2 text-white"
              onClick={() => handleReset}
              type="button"
            >
              Reset form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
