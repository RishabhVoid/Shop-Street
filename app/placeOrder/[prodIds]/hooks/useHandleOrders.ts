import { useToast } from "@/components/ui/use-toast";
import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import getCustomTimeStamp from "@/lib/getCustomTimeStamp";
import isValidEmail from "@/lib/isValidEmail";
import {
  OrderDetailPresetType,
  OrderProductIds,
  ProductType,
  UserType,
} from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export interface ProductsData {
  product: ProductType;
  amount: number;
}

const useHandleOrder = (prodIds: string) => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [productsData, setProductsData] = useState<ProductsData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [ghostToggle, setGhostToggle] = useState(false);

  const orderTotal = useMemo(() => {
    let total = 0;
    if (!productsData.length) {
      total = 0;
    } else {
      productsData.map((productData) => {
        total = total + productData.product.price * productData.amount;
      });
    }
    return total;
  }, [productsData.length, ghostToggle]);

  const router = useRouter();

  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();

  const getUser = async (email: string) => {
    const rawRes = await fetch(`/api/user?email=${email}`);
    const jsonData = await rawRes.json();
    if (
      jsonData.status === ResponseCodes.INVALID_CREDENTIALS ||
      jsonData.status === ResponseCodes.NOT_FOUND
    ) {
      router.replace("/");
      return;
    } else if (jsonData.status === ResponseCodes.SUCCESS) {
      setUserData(jsonData.data.user as UserType);
      return;
    }
  };

  const getOrderedItems = async () => {
    const prodRawRes = await fetch(`/api/productsByIds?prodIds=${prodIds}`);
    const prodJsonData = await prodRawRes.json();
    let prods: ProductType[] = [];
    if (prodJsonData.status === ResponseCodes.SUCCESS) {
      prods = prodJsonData.data;
    } else {
      prods = [];
      return;
    }
    const data: ProductsData[] = prods.map((prod) => {
      return {
        product: prod,
        amount: 1,
      };
    });

    setProductsData(data);
  };

  const postOrder = async (
    address: string,
    email: string,
    phoneNo: string,
    products: OrderProductIds[],
    placedOn: string
  ) => {
    if (userData === null || userData === undefined || !user || !user?.email) {
      setIsProcessing(false);
      return;
    }

    const rawRes = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        placedOn,
        products,
        email,
        address,
        phoneNo,
        userEmail: user?.email,
        orderTotal,
      }),
    });

    const jsonData = await rawRes.json();
    if (jsonData.status === ResponseCodes.SUCCESS) {
      setAddress("");
      setEmail("");
      setPhoneNo("");
      router.replace("/placeOrder/orderSuccess");
      setIsProcessing(false);
    }
  };

  const popUp = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const handleAddOrder = () => {
    setIsProcessing(true);
    const isValidAddress = Boolean(address.trim());
    const isEmailValid = Boolean(isValidEmail(email) && email.trim());
    const isValidPhoneNo = Boolean(phoneNo.toString().length === 10);
    if (!isValidAddress || !isEmailValid || !isValidPhoneNo) {
      setIsProcessing(false);
      return;
    }
    const timeStamp = getCustomTimeStamp();
    if (!userData) {
      setIsProcessing(false);
      popUp("Woah woah, who are thou!?", "Sign in first to order/buy items :>");
      return;
    }
    if (orderTotal > userData?.money) {
      setIsProcessing(false);
      popUp("Woah woah, no moni!?", "You're too broke to buy all this >:D");
      return;
    }
    if (!productsData.length || !productsData || productsData.length === 0) {
      setIsProcessing(false);
      return;
    }
    const productIds: OrderProductIds[] = [];
    try {
      productsData.map((productData) => {
        productIds.push({
          productId: productData.product._id,
          sellerEmail: productData.product.sellerEmail,
          amount: productData.amount,
        });
      });
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
    (async () =>
      await postOrder(address, email, phoneNo, productIds, timeStamp))();
  };

  const setPreset = (preset: string) => {
    const presetObj = JSON.parse(preset) as OrderDetailPresetType;
    setEmail(presetObj.email);
    setAddress(presetObj.address);
    setPhoneNo(presetObj.phoneNo);
  };

  const changeProductAmount = (prodId: string, action: "INC" | "DEC") => {
    const updatedProductsData = productsData.map((productData) => {
      if (productData.product._id !== prodId) return productData;
      let updatedAmount = productData.amount;

      if (action === "INC") {
        if (productData.product.inventory >= updatedAmount + 1) {
          updatedAmount = updatedAmount + 1;
        }
      } else {
        if (updatedAmount > 1) {
          updatedAmount = updatedAmount - 1;
        }
      }

      const newProductData = {
        amount: updatedAmount,
        product: productData.product,
      };
      setGhostToggle(!ghostToggle);
      return newProductData;
    });

    setProductsData(updatedProductsData);
  };

  useEffect(() => {
    if (loading || !user || !user?.email) return;
    (async () => await getUser(user.email!))();
    (async () => await getOrderedItems())();
  }, [loading, user?.email]);

  return {
    orderTotal,
    userData,
    address,
    setAddress,
    email,
    setEmail,
    phoneNo,
    setPhoneNo,
    productsData,
    handleAddOrder,
    setPreset,
    changeProductAmount,
    isProcessing,
  };
};

export default useHandleOrder;
