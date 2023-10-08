import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Product from "@/models/Product";
import { ProductType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  try {
    const prodIdsString = searchParams.get("prodIds") || "";
    const prodIds = prodIdsString.split("__");

    if (prodIds[0] === "")
      return new Response(
        JSON.stringify({
          status: ResponseCodes.SUCCESS,
          data: [],
        })
      );

    await connect();

    let products: ProductType[] = await Product.find({
      $and: [{ _id: { $in: prodIds } }],
    });

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: products,
      })
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
