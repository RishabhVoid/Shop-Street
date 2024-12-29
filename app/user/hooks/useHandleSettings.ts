import { ResponseCodes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import isValidEmail from "@/lib/isValidEmail";
import { OrderDetails, UserType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const useHandleSettings = () => {
  const [userData, setUserData] = useState<UserType>();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const router = useRouter();

  const { authState, logOut } = useAuth();

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

  const postOrderDetails = async (
    address: string,
    email: string,
    phoneNo: string
  ) => {
    const orderDetailPreset = {
      address,
      email,
      phoneNo: parseInt(phoneNo),
    };

    if (userData === null || userData === undefined || !authState?.user || !authState?.user?.email)
      return;

    const rawRes = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        email: authState?.user?.email,
        wishList: userData.wishList,
        cart: userData.cart,
        orderDetailOptions: [...userData.orderDetailOptions, orderDetailPreset],
        recentTags: userData.recentTags,
        isSeller: userData.isSeller,
        storeId: userData.storeId,
        money: userData.money,
        orders: userData.orders,
      }),
    });

    const jsonData = await rawRes.json();
    if (jsonData.status === ResponseCodes.SUCCESS) {
      setAddress("");
      setEmail("");
      setPhoneNo("");
      (async () => await getUser(authState?.user?.email!))();
    }
  };

  const removeOrderDetails = async (id: string) => {
    if (userData === null || userData === undefined) return;
    const orderDetailPresets: OrderDetails[] =
      userData.orderDetailOptions.filter((detail) => detail._id !== id);
    if (userData === null || !authState?.user || !authState?.user?.email) return;
    const rawRes = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        email: authState?.user?.email,
        wishList: userData.wishList,
        cart: userData.cart,
        orderDetailOptions: orderDetailPresets,
        recentTags: userData.recentTags,
        isSeller: userData.isSeller,
        storeId: userData.storeId,
        money: userData.money,
        orders: userData.orders,
      }),
    });

    const jsonData = await rawRes.json();
    if (jsonData.status === ResponseCodes.SUCCESS) {
      setAddress("");
      setEmail("");
      setPhoneNo("");
      (async () => await getUser(authState?.user?.email!))();
    }
  };

  const handleAddOrderDetailPreset = () => {
    const isValidAddress = Boolean(address.trim());
    const isEmailValid = Boolean(isValidEmail(email) && email.trim());
    const isValidPhoneNo = Boolean(phoneNo.toString().length === 10);
    if (!isValidAddress || !isEmailValid || !isValidPhoneNo) return;
    (async () => await postOrderDetails(address, email, phoneNo))();
  };

  const handleDeleteOrderDetailPreset = (id: string) => {
    (async () => await removeOrderDetails(id))();
  };

  const handleSignOut = () => {
    logOut();
    router.replace("/");
  };

  useEffect(() => {
    if (authState?.isLoading || !authState?.user || !authState?.user?.email) return;
    (async () => await getUser(authState?.user?.email!))();
  }, [authState?.isLoading, authState?.user?.email]);

  const userId = useMemo(() => {
    if (!userData) return "Loading...";
    return `${userData._id.slice(0, 4)} ${userData._id.slice(
      4,
      8
    )} ${userData._id.slice(8, 12)} ${userData._id.slice(
      12,
      16
    )} ${userData._id.slice(16, 200)} `;
  }, [userData?._id]);

  return {
    loading: authState.isLoading,
    user: authState.user,
    userData,
    userId,
    handleSignOut,
    address,
    email,
    phoneNo,
    handleAddOrderDetailPreset,
    handleDeleteOrderDetailPreset,
    setAddress,
    setEmail,
    setPhoneNo,
  };
};

export default useHandleSettings;
