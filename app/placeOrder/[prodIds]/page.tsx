"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import { ResponseCodes } from "@/constants"; 
import { ProductType, OrderProductIds } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getCustomTimeStamp from "@/lib/getCustomTimeStamp";
import isValidEmail from "@/lib/isValidEmail";
import CustomButton from "@/components/CustomButton";

interface Props {
	params: {
		prodIds: string;
	}
}

const PlaceOrder = ({ params }: Props) => {
	const [userData, setUserData] = useState<UserType>();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);

  const orderTotal = useMemo(()=>{
  	let total = 0;
  	if(!products.length){
  		total = 0
  	} else {
  		products.map(product=>{
  			total = total + product.price
  		})
  	}
  	return total;
  }, [products.length]);

  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const getUser = async (email: string) => {
    const rawRes = await fetch(`/api/user?email=${email}`);
    const jsonData = await rawRes.json();
    if(
      (jsonData.status===ResponseCodes.INVALID_CREDENTIALS) ||
      (jsonData.status===ResponseCodes.NOT_FOUND)
    ){
      router.replace("/");
      return;
    } else if(jsonData.status===ResponseCodes.SUCCESS){
      setUserData(jsonData.data.user as UserType);
      return;
    };
  };

  const postOrder = async (address: string, email: string, phoneNo: string, productIds: OrderProductIds[], placedOn: string) => {
    const newOrder = {
    	placedOn,
		  productIds,
		  email,
		  address,
		  phoneNo,
    };

    if(userData===null || userData===undefined || !user || !user?.email) return;

    const rawRes = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        placedOn,
			  productIds,
			  email,
			  address,
			  phoneNo,
			  userEmail: user?.email
      })
    });

    const jsonData = await rawRes.json();
    if(jsonData.status===ResponseCodes.SUCCESS){
      setAddress("");
      setEmail("");
      setPhoneNo("");
      router.replace("/placeOrder/orderSuccess");
    };
  };

  const getOrderedItems = async (email: string) => {
    const prodRawRes = await fetch(
      `/api/productsByIds?prodIds=${params.prodIds}`
    );
    const prodJsonData = await prodRawRes.json();
    let prods: ProductType[] = [];
    if (prodJsonData.status === ResponseCodes.SUCCESS) {
      prods = prodJsonData.data;
    } else {
      prods = [];
      return;
    }
    setProducts(prods);
  };

  const handleAddOrder = () => {
    const isValidAddress = Boolean(address.trim());
    const isEmailValid = Boolean(isValidEmail(email) && email.trim());
    const isValidPhoneNo = Boolean(phoneNo.toString().length===10);
    if(!isValidAddress || !isEmailValid || !isValidPhoneNo) return;
    const timeStamp = getCustomTimeStamp();
    if(orderTotal>userData?.money){
    	alert("Too poor!");
    	return;
    };
    if(!products.length || !products || products.length===0) return;
    const productIds: OrderProductIds[] = [];
    try{
    	products.map(product=>{
	    	productIds.push({
			   	productId: product._id,
			   	sellerEmail: product.sellerEmail
    		});
    	});
    } catch (error) {
    	console.log(error.message);
    };
    (async ()=> await postOrder(address, email, phoneNo, productIds, timeStamp))();
  };

  const setPreset = (email: string, phoneNo: string, address: string) =>{
  	setEmail(email);
  	setAddress(address);
  	setPhoneNo(phoneNo);
  };

  useEffect(()=>{
    if(loading || !user || !user?.email) return;
    (async ()=> await getUser(user.email!))();
    (async ()=> await getOrderedItems(user.email!))();
  }, [loading, user?.email]);

	return (
		<div className="h-full flex flex-col">
			<h1 className="w-full p-2 font-primary text-xl md:text-2xl bg-accent text-white">Place your order</h1>
			<div className="h-full flex flex-wrap overflow-x-hidden overflow-y-auto md:custom_scroll no_pad_scroll">
				<div className="h-full flex mx-auto md:p-8">
					<div className="h-[86%] w-[2rem] flex flex-col items-center hidden md:block">
						<span className="bg-accent block h-[50px] w-[50px] rounded-full" />
						<span className="bg-accent block flex-1 w-[3px] rounded-[2px] relative -top-[25px]" />
					</div>
					<div className="flex flex-col ml-0 p-0 mx-auto md:ml-4 md:p-4 pt-4">
						<h1 className="font-primary text-2xl mb-4">Place your order</h1>
						<div className="mb-2">
							<Select onValueChange={(value)=> setPreset(value.email, value.phoneNo, value.address)}>
								<SelectTrigger className="bg-accent border-0 text-white">Choose preset</SelectTrigger>
								<SelectContent className="bg-white rounded-[5px] w-[300px]">
									{
										userData && userData.orderDetailOptions.map((preset, index)=>(
											<SelectItem key={index*10} value={preset}>
												<h2>{preset.address}</h2>
												<h2>{preset.phoneNo}</h2>
												<h2>{preset.email}</h2>
											</SelectItem>
										))
									}	
									<SelectItem value={{ address: "", phoneNo: "", email: "" }}>
										<h2>Clear</h2>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col mb-2">
							<label className="text-lg">Contact email</label>
							<input type="email" placeholder="Contact email..." value={email} onChange={(event)=> setEmail(event.target.value)} className="px-2 w-[300px] py-4 bg-slate-200 outline-accent" />
						</div>
						<div className="flex flex-col mb-2">
							<label className="text-lg">Contact number</label>
							<input type="number" placeholder="Contact number..." value={phoneNo} onChange={(event)=> setPhoneNo(event.target.value)} className="px-2 w-[300px] py-4 bg-slate-200 outline-accent" />
						</div>
						<div className="flex flex-col mb-2">
							<label className="text-lg">Address</label>
							<textarea type="text" placeholder="Delivery address..." value={address} onChange={(event)=> setAddress(event.target.value)} className="px-2 w-[300px] resize-none h-[10rem] py-4 bg-slate-200 outline-accent" />
						</div>
						<CustomButton title="Place order" styles="py-4" callback={handleAddOrder} />
					</div>
				</div>
				<div className="h-full mx-auto md:p-8">
				<h1 className="w-full mb-4 font-primary text-2xl">Items</h1>
					<div className="flex flex-col w-[300px] overflow-x-hidden overflow-y-auto no_pad_scroll">
						{
							products.length!==0 && products.map(product=>(
								<div key={product._id} className="w-[300px] flex items-center justify-between border-b-2 mb-2 border-b-slate-300">
									<h2>{product.title}</h2>
									<h2 className="ml-2">{product.price}$</h2>
								</div>
							))
						}
						<div className="w-[300px] flex items-center justify-between border-b-2 mb-2 border-b-slate-500">
							<h2>Total</h2>
							<h2 className="ml-2">{orderTotal}$</h2>
						</div>
						<h2 className="ml-auto">{orderTotal>userData?.money && "Not enough balance"}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;