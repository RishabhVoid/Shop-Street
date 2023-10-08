"use client";

import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { ProductType, UserType } from "@/types";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ListItem from "../../widgets/ListItem";

const Wishlist = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [user, loading] = useAuthState(auth);

  const getWishListItems = async (email: string) => {
    const rawRes = await fetch(`/api/user?email=${email}`);
    const jsonData = await rawRes.json();

    let wishlistIds: string[] = [];
    let prods: ProductType[] = [];

    if (jsonData.status === ResponseCodes.SUCCESS) {
      const user: UserType = jsonData.data.user;
      wishlistIds = user.wishList;
    } else {
      prods = [];
      return;
    }

    const prodRawRes = await fetch(
      `/api/productsByIds?prodIds=${wishlistIds.join("__")}`
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
          <ListItem product={JSON.stringify(product)} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
