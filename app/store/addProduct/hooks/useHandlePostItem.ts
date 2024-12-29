import { useToast } from "@/components/ui/use-toast";
import { ProductViewProfiles, ResponseCodes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import useFileStorage from "@/hooks/useFileStorage";
import getFileExtension from "@/lib/getFileExtention";
import { FormEvent, useRef, useState } from "react";

const useHandlePostItem = () => {
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
  const { authState } = useAuth();
  const fileUploader = useFileStorage();

  const popUp = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

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
      popUp(
        "Cleared the form",
        "All files have been removed and inputs have been cleared!"
      );
    }
  };

  const uploadImageToStorage = async (id: string, file: File) => {
    await fileUploader.uploadFile(id, file);
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
    const rawRes = await fetch("/api/sellerShop", {
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
      popUp(
        "Oops there seems to be a problem!",
        "Your account wasn't recognized whilst creating the product, please relogin from the home page."
      );
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.CONDITIONS_MISMATCHED) {
      popUp(
        "A seller impersonator!?",
        "Your account isn't registed as a seller!"
      );
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.SUCCESS) {
      popUp(
        `Added product ${title}`,
        "Product was successfully added to your shop!"
      );
      const productId = jsonData.data.id as string;
      ProductViewProfiles.map((profile, index) => {
        const currentFile = files[index];
        const currentFileExtention = getFileExtension(currentFile);
        if (!currentFileExtention) return;
        const productProfileImageName = `${productId}-${profile}`;
        // const imageRef = ref(storage, productProfileImageName);
        uploadImageToStorage(productProfileImageName, currentFile);
      });
      if (!pictureViewRef.current || !logsRef.current) return;
      if (window.innerWidth < 768) {
        pictureViewRef.current.scrollIntoView({ behavior: "smooth" });
      }
      logsRef.current.scrollIntoView({ behavior: "smooth" });
      handleReset(false);
      setIsDis(false);
    } else if (jsonData.status === ResponseCodes.UNKNOWN_ERROR) {
      popUp(
        "The dog stepped on a bee!!",
        "The product couldn't be added due to an internal error! We apologies for any inconveniences, please try in a moment!"
      );
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
      } else {
        logsRef.current.scrollIntoView({ behavior: "smooth" });
      }
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

    if (!authState?.user || !authState?.user?.email) return;
    const sellerEmail = authState?.user?.email;
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

  const goToNextImage = () =>
    setCurrentImage((imageIndex) => {
      if (!files.length) return 0;
      if (files.length - 1 === imageIndex) return imageIndex;
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
        return files.length - 1;
      } else {
        return imageIndex - 1;
      }
    });

  return {
    isDis,
    pictureViewRef,
    currentImage,
    files,
    setFiles,
    goToNextImage,
    goToPrevImage,
    popUp,
    handleSubmit,
    logsRef,
    logs,
    titleRef,
    priceRef,
    categories,
    inventorySizeRef,
    deliveryDistanceRef,
    deliveryTimeRef,
    handleCategoryAdd,
    descRef,
    handleReset,
  };
};

export default useHandlePostItem;
