import { Categories, ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Store from "@/models/Store";
import User from "@/models/User";
import Product from "@/models/Product";
import { StoreType, UserType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  let pageNo = parseInt(params.get("pageNo") || "1");
  const searchQuery = params.get("searchQuery");
  let categories = (params.get("categories") || "").split("_");
  const priceMin = params.get("priceMin");
  const priceMax = params.get("priceMax");
  const sellerEmail = params.get("sellerEmail");

  if (categories[0] === "") categories = Categories;

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

    const store: StoreType | null = await Store.findOne({
      _id: seller.storeId,
    });
    if (!store)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.CONDITIONS_MISMATCHED,
        }),
        { status: 403 }
      );

    const products = store.productIds;

    const searchRegExp = new RegExp(searchQuery || "", "i");

    const productList = await Product.find({
      $and: [
        { _id: { $in: products } },
        {
          $or: [{ title: searchRegExp }, { desc: searchRegExp }],
        },
        { matchingCategories: { $in: categories } },
        { price: { $gte: priceMin, $lte: priceMax } },
      ],
    })
      .skip((pageNo - 1) * 100)
      .limit(pageNo * 100)
      .exec();

    if (!productList.length)
      return new Response(
        JSON.stringify({
          status: ResponseCodes.NOT_FOUND,
          data: {
            products: [],
          },
        })
      );

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: {
          products: productList,
        },
      })
    );
  } catch (error) {
    console.log("Get products error", error);
    return new Response(
      JSON.stringify({
        status: ResponseCodes.UNKNOWN_ERROR,
      }),
      { status: 500 }
    );
  }
};

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
  } catch {
    return new Response(
      JSON.stringify({
        status: ResponseCodes.UNKNOWN_ERROR,
      }),
      { status: 500 }
    );
  }
};
