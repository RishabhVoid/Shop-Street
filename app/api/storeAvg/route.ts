import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Product from "@/models/Product";
import Store from "@/models/Store";
import { ProductType, StoreType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (reuqest: NextRequest) => {
  const searchParams = reuqest.nextUrl.searchParams;
  const storeId = searchParams.get("id");

  try {
    await connect();
    const store: StoreType | null = await Store.findById(storeId);
    if (!store)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.INVALID_CREDENTIALS,
          data: NaN,
        })
      );

    const productIds = store.productIds;

    const products: ProductType[] | null = await Product.find({
      _id: { $in: productIds },
    });

    if (!products)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.SUCCESS,
          data: 0,
        })
      );

    let totalPrice = 0;

    products.map((product) => {
      totalPrice += product.price;
    });

    const averagePrice = totalPrice / products.length;

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: averagePrice,
      })
    );
  } catch {
    return new Response(
      JSON.stringify({
        status: ResponseCodes.UNKNOWN_ERROR,
        data: NaN,
      })
    );
  }
};
