import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { OrderType, ProductType } from "@/types";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useGetOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const [user, loading] = useAuthState(auth);

  const getOrders = async (email: string) => {
    const rawRes = await fetch(`/api/order?isSeller=true&email=${email}`);
    const jsonRes = await rawRes.json();

    if (jsonRes.status === ResponseCodes.SUCCESS) {
      setOrders(jsonRes.data.orders);
    }
  };

  const getProductsByIds = async (
    idsString: string
  ): Promise<ProductType[]> => {
    const rawRes = await fetch(`/api/productsByIds?prodIds=${idsString}`);
    const jsonRes = await rawRes.json();

    if (jsonRes.status === ResponseCodes.UNKNOWN_ERROR) {
      return [];
    } else if (jsonRes.status === ResponseCodes.SUCCESS) {
      return jsonRes.data as ProductType[];
    } else return [];
  };

  useEffect(() => {
    if (loading || !user || !user.email) return;
    (async () => await getOrders(user.email!))();
  }, [loading, user, user?.email, orders]);

  return {
    orders,
    getProductsByIds,
  };
};

export default useGetOrders;
