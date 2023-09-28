import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import isValidEmail from "@/lib/isValidEmail";
import Store from "@/models/Store";
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

  if (!user.isSeller) {
    return new Response(
      JSON.stringify({
        status: ResponseCodes.CONDITIONS_MISMATCHED,
      }),
      { status: 401 }
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
  const { userEmail, storeName } = await request.json();

  await connect();

  const user = await User.findOne({ email: userEmail });

  if (!user)
    return new Response(
      JSON.stringify({
        status: ResponseCodes.NOT_FOUND,
      }),
      { status: 404 }
    );

  const newStore = new Store({
    storeName,
  });

  await newStore.save();

  user.storeId = newStore._id;
  user.isSeller = true;

  user.save();

  return new Response(
    JSON.stringify({
      status: ResponseCodes.SUCCESS,
    }),
    { status: 200 }
  );
}
