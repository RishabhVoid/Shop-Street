"use client";

import { ResponseCodes } from "@/constants";
import { useEffect, useState } from "react";
import ListItem from "../../widgets/ListItem";
import { ProductType, UserType } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [user, loading] = useAuthState(auth);

  const getWishListItems = async (email: string) => {
    const rawRes = await fetch(`/api/user?email=${email}`);
    const jsonData = await rawRes.json();

    let cartlistIds: string[] = [];
    let prods: ProductType[] = [];

    if (jsonData.status === ResponseCodes.SUCCESS) {
      const user: UserType = jsonData.data.user;
      cartlistIds = user.cart;
    } else {
      prods = [];
      return;
    }

    const prodRawRes = await fetch(
      `/api/productsByIds?prodIds=${cartlistIds.join("__")}`
    );
    const prodJsonData = await prodRawRes.json();
    if (prodJsonData.status === ResponseCodes.SUCCESS) {
      prods = prodJsonData.data;
    } else {
      prods = [];
      return;
    }

    setProducts(prods);
  };

  useEffect(() => {
    if (loading || !user || !user.email) return;
    (async () => getWishListItems(user.email!))();
  }, [loading, user?.email]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 w-full flex flex-wrap pb-[6rem] items-center justify-center overflow-x-hidden overflow-y-auto custom_scroll">
        {products.map((product) => (
          <ListItem
            product={JSON.stringify(product)}
            key={product._id}
            cartProd
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
