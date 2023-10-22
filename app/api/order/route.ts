import { NextRequest } from "next/server";
import { ResponseCodes } from "@/constants";
import connect from "@/lib/connect";
import User from "@/models/User";
import Order from "@/models/Order";

export const POST = async (request: NextRequest) =>{
	const {
		placedOn,
	  productIds,
	  email,
		address,
		phoneNo,
		userEmail
	} = await request.json();

	try{
		await connect();

		const newOrder = new Order({
			placedOn,
		  productIds,
		  email,
			address,
			phoneNo,
		});

		if(!newOrder) throw new Error("Error!");


		const user = await User.findOne({ email: userEmail });

		if(!user) throw new Error("User error");

		user.orders = [...user.orders, newOrder._id];

		await newOrder.save();
		await user.save();

		return new Response(JSON.stringify({
			status: ResponseCodes.SUCCESS
		}), { status: 200 })

	} catch {
		return new Response(JSON.stringify({
			status: ResponseCodes.UNKNOWN_ERROR
		}), { status: 500 })
	};
};