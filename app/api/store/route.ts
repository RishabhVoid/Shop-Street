import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Store from "@/models/Store";
import User from "@/models/User";
import { StoreType } from "@/types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.searchParams;
  const storeId = url.get("id");

  await connect();

  const store: StoreType | null = await Store.findOne({ _id: storeId });

  if (!store) {
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
        store: store,
      },
    }),
    { status: 200 }
  );
};

export async function POST(request: Request) {
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
