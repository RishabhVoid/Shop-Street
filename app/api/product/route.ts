import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Product from "@/models/Product";
import { ProductType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  try {
    const skip = parseInt(searchParams.get("skip") || "1");
    const size = parseInt(searchParams.get("size") || "100");
    const sortWay = searchParams.get("sortWay") || "true";
    const sortBy = searchParams.get("sortBy");

    let products: ProductType[] = [];

    const sortingMethod = sortWay === "true" ? -1 : 1;

    await connect();

    if (sortBy === "price") {
      products = await Product.find()
        .skip(skip)
        .limit(size)
        .sort({ price: sortingMethod })
        .exec();
    } else if (sortBy === "rating") {
      products = await Product.find()
        .skip(skip)
        .limit(size)
        .sort({ rating: sortingMethod })
        .exec();
    } else {
      products = await Product.find().skip(skip).limit(size).exec();
    }

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: JSON.stringify(products),
      })
    );
  } catch {
    return new Response(
      JSON.stringify({
        status: ResponseCodes.UNKNOWN_ERROR,
      }),
      { status: 500 }
    );
  }
};
