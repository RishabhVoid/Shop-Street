"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { StoreType, UserType } from "@/types";
import Header from "./widgets/Header";
import BusinessOverview from "./widgets/BusinessOverview";
import OrdersList from "./widgets/OrdersList";

const StoreDashboard = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [seller, setSeller] = useState<UserType>();
  const [store, setStore] = useState<StoreType>();

  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const getUser = async (email: string) => {
    const rawRes = await fetch(`/api/seller?email=${email}`);
    const jsonRes = await rawRes.json();
    if (jsonRes.status === ResponseCodes.INVALID_CREDENTIALS) {
      router.push("/", { scroll: false });
    } else if (jsonRes.status === ResponseCodes.SUCCESS) {
      setSeller(jsonRes.data.user as UserType);
    } else if (jsonRes.status === ResponseCodes.NOT_FOUND) {
      router.push("/createStore", { scroll: false });
    } else if (jsonRes.status === ResponseCodes.CONDITIONS_MISMATCHED) {
      router.push("/createStore", { scroll: false });
    }
    setPageLoading(false);
  };

  const getStore = async (storeId: string) => {
    const rawRes = await fetch(`/api/store?id=${storeId}`);
    const jsonRes = await rawRes.json();

    if (jsonRes.status === ResponseCodes.NOT_FOUND) {
      throw new Error("Store not found!");
    } else if (jsonRes.status === ResponseCodes.SUCCESS) {
      setStore(jsonRes.data.store as StoreType);
    }
  };

  useEffect(() => {
    if (loading) return;
    (async () => await getUser(user?.email || ""))();
  }, [loading]);

  useEffect(() => {
    if (!seller?.storeId || !seller) return;
    if (seller.storeId === "default") return;
    (async () => await getStore(seller.storeId))();
  }, [seller?.storeId]);

  if (loading || pageLoading) return <LoadingOverlay />;

  return (
    <div className="w-full flex flex-col h-full overflow-x-hidden overflow-y-auto no_pad_scroll">
      <Header
        displayName={user?.displayName}
        storeName={store?.storeName}
        imageUrl={user?.photoURL}
      />
      <BusinessOverview store={store} />
      <OrdersList />
    </div>
  );
};

export default StoreDashboard;
