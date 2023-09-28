import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Store from "@/models/Store";
import User from "@/models/User";
import Product from "@/models/Product";
import { StoreType, UserType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {};

export const POST = async (request: NextRequest) => {
  const {
    title,
    desc,
    price,
    matchingCategories,
    inventory,
    maxDistance,
    deliveryDays,
    sellerEmail,
  } = await request.json();

  try {
    await connect();

    const seller: UserType | null = await User.findOne({ email: sellerEmail });
    if (!seller)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.INVALID_CREDENTIALS,
        }),
        { status: 401 }
      );

    const store = await Store.findOne({ _id: seller.storeId });
    if (!store)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.CONDITIONS_MISMATCHED,
        }),
        { status: 403 }
      );

    const newProduct = new Product({
      title,
      desc,
      price,
      matchingCategories,
      inventory,
      maxDistance,
      deliveryDays,
    });

    await newProduct.save();

    const productId = newProduct._id;

    store.productIds.push(productId);

    await store.save();

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: {
          id: productId,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: ResponseCodes.UNKNOWN_ERROR,
      }),
      { status: 500 }
    );
  }
};
