"use client";

import { ResponseCodes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  productId: string;
  styles?: string;
}

const AddToWishlist = ({ productId, styles }: Props) => {
  const { authState } = useAuth();
  const [userData, setUserData] = useState<UserType>();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isDis, setIsDis] = useState(true);

  const checkIfItemInCart = async (email: string, id: string) => {
    const rawRes = await fetch(`/api/user?email=${email}`);
    const jsonData = await rawRes.json();

    if (jsonData.status === ResponseCodes.SUCCESS) {
      const user: UserType = jsonData.data.user;
      setUserData(user);
      const isInCart = user.wishList.includes(id);
      setIsInWishlist(isInCart);
    }
    setIsDis(false);
  };

  const toggleInCart = async () => {
    setIsDis(true);
    if (!userData || !authState?.user || !authState?.user?.email) return;
    let updatedUserData: string[] = [];
    if (userData.wishList.includes(productId)) {
      updatedUserData = userData.wishList.filter(
        (prodId) => prodId !== productId
      );
    } else {
      if (userData.wishList.length === 10) {
        updatedUserData = userData.wishList;
      } else {
        updatedUserData = [...userData.wishList, productId];
      }
    }
    const rawRes = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        email: userData.email,
        wishList: updatedUserData,
        cart: userData.cart,
        orderDetailOptions: userData.orderDetailOptions,
        recentTags: userData.recentTags,
        isSeller: userData.isSeller,
        storeId: userData.storeId,
        money: userData.money,
      }),
    });
    const jsonData = await rawRes.json();

    if (jsonData.status === ResponseCodes.SUCCESS) {
      (async () => await checkIfItemInCart(authState?.user?.email!, productId))();
    }
    setIsDis(false);
  };

  useEffect(() => {
    setIsDis(true);
    if (authState?.isLoading || !authState?.user || !authState?.user?.email || !productId || !productId.trim())
      return;
    (async () => await checkIfItemInCart(authState?.user?.email!, productId))();
  }, [authState?.isLoading, authState?.user?.email, productId]);

  return (
    <button
      onClick={async () => toggleInCart()}
      disabled={isDis}
      className={`border-2 border-[--primary-accent] px-4 py-2 rounded-full transition duration-200 hover:bg-slate-200 ${
        isDis && "opacity-50"
      } ${styles}`}
    >
      {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
};

export default AddToWishlist;
