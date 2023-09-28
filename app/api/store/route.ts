import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import Store from "@/models/Store";
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
