"use client";

import ListItem from "../../widgets/ListItem";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/constants";
import { useEffect, useState } from "react";
import { ProductType, UserType } from "@/types";
import { IoIosAddCircle } from "react-icons/io";
import Header from "../../widgets/Header";
import useAuth from "@/hooks/useAuth";

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();

  const { authState } = useAuth();

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

  const orderCurrentCart = () => {
    if (!products) return;
    if (products.length === 0) return;
    const prodIds = products.map((prod) => {
      return prod._id;
    });
    const prodIdString = prodIds.join("__");
    router.push(`/placeOrder/${prodIdString}`);
  };

  useEffect(() => {
    if (authState?.isLoading || !authState?.user || !authState?.user?.email) return;
    (async () => getWishListItems(authState?.user?.email!))();
  }, [authState?.isLoading, authState?.user?.email]);

  return (
    <div className="h-full flex flex-col">
      <Header title="My Cart" />
      <div className="flex-1 w-full flex flex-wrap pb-[6rem] overflow-x-hidden overflow-y-auto no_pad_scroll md:custom_scroll">
        {products.map((product) => {
          if (product.inventory <= 0) return null;

          return (
            <ListItem
              product={JSON.stringify(product)}
              key={product._id}
              cartProd
            />
          );
        })}
        <div
          onClick={orderCurrentCart}
          className="w-[170px] mb-[3rem] cursor-pointer h-[344px] bg-[--primary-accent] flex flex-col items-center justify-center"
        >
          <div>
            <IoIosAddCircle style={{ color: "white", fontSize: 48 }} />
          </div>
          <h2 className="w-[70%] text-center mt-2 text-white">
            Place an order with the current cart.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
