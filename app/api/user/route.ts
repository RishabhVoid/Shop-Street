import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import isValidEmail from "@/lib/isValidEmail";
import User from "@/models/User";
import { UserType } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams;
  const userEmail = url.get("email");

  const isEmailValid = isValidEmail(userEmail);

  if (!isEmailValid)
    return new Response(
      JSON.stringify({
        status: ResponseCodes.INVALID_CREDENTIALS,
      }),
      { status: 403 }
    );

  await connect();

  const user: UserType | null = await User.findOne({ email: userEmail });

  if (!user) {
    const newUser = new User({
      email: userEmail,
    });
    await newUser.save();
    return new Response(
      JSON.stringify({
        status: ResponseCodes.NOT_FOUND,
      }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({
      status: ResponseCodes.SUCCESS,
      data: {
        user: user,
      },
    }),
    { status: 200 }
  );
}

export async function PATCH(request: Request) {
  const {
    email,
    wishList,
    cart,
    orderDetailOptions,
    recentTags,
    isSeller,
    storeId,
    money,
    orders,
  } = await request.json();

  await connect();

  const isUpdated = await User.updateOne(
    { email },
    {
      email,
      wishList,
      cart,
      orderDetailOptions,
      recentTags,
      isSeller,
      storeId,
      money,
      orders
    }
  );

  return new Response(
    JSON.stringify({
      status: ResponseCodes.SUCCESS,
    }),
    { status: 200 }
  );
}
