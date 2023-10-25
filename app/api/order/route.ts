import { NextRequest } from "next/server";
import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import User from "@/models/User";
import Order from "@/models/Order";
import { OrderProductIds, OrderType, UserType } from "@/types";
import decreaseProductInventory from "@/lib/decreaseProductInventory";

export const POST = async (request: NextRequest) => {
  const { placedOn, products, email, address, phoneNo, userEmail, orderTotal } =
    await request.json();

  try {
    await connect();

    const newOrder = new Order({
      placedOn,
      products,
      email,
      address,
      phoneNo,
    });

    if (!newOrder) throw new Error("Error!");

    const user = await User.findOne({ email: userEmail });

    if (!user) throw new Error("User error");

    user.orders = [...user.orders, newOrder._id];

    products.map(async (productData: OrderProductIds) => {
      (async () =>
        await decreaseProductInventory(
          productData.productId,
          productData.amount
        ))();
    });

    user.money = user.money - orderTotal;

    await user.save();
    await newOrder.save();

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
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

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const isSeller = searchParams.get("isSeller");
  const email = searchParams.get("email");

  try {
    let orders: OrderType[] | null = [];

    if (isSeller === "true") {
      orders = await Order.find({
        products: {
          $elemMatch: {
            sellerEmail: email,
          },
        },
      });
    } else {
      const user: UserType | null = await User.findOne({ email: email });
      if (user) {
        const orderIds = user.orders;
        orders = await Order.find({ _id: { $in: orderIds } });
      }
    }

    return new Response(
      JSON.stringify({
        status: ResponseCodes.SUCCESS,
        data: {
          orders,
        },
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
