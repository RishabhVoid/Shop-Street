"use client";

import ListItem from "../../widgets/ListItem";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/constants";
import { useEffect, useState } from "react";
import { ProductType, UserType } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import { IoIosAddCircle } from "react-icons/io";

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();

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

  const orderCurrentCart = () =>{
    if(!products) return;
    if(products.length === 0) return;
    const prodIds = products.map(prod=>{
      return prod._id;
    })
    const prodIdString = prodIds.join("__");
    router.push(`/placeOrder/${prodIdString}`);
  };

  useEffect(() => {
    if (loading || !user || !user.email) return;
    (async () => getWishListItems(user.email!))();
  }, [loading, user?.email]);

  return (
    <div className="h-full flex flex-col">
      <h1 className="w-full p-2 font-primary text-xl md:text-2xl bg-accent text-white">My Cart</h1>
      <div className="flex-1 w-full flex flex-wrap pb-[6rem] overflow-x-hidden overflow-y-auto no_pad_scroll md:custom_scroll">
        {products.map((product) => (
          <ListItem product={JSON.stringify(product)} key={product._id} cartProd />
        ))}
        <div onClick={orderCurrentCart} className="w-[170px] mb-[3rem] cursor-pointer h-[344px] bg-accent flex flex-col items-center justify-center">
          <div>
            <IoIosAddCircle style={{ color:"white", fontSize: 48 }} />
          </div>
          <h2 className="w-[70%] text-center mt-2 text-white">Place an order with the current cart.</h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
