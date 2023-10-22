"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import { UserType, OrderDetails } from "@/types";
import { ResponseCodes, Colors } from "@/constants";
import { useState, useEffect, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import { signOut } from "firebase/auth";
import isValidEmail from "@/lib/isValidEmail";
import CustomButton from "@/components/CustomButton";

const AltImage = "/images/blank_account.png"

const Settings = () => {
  const [userData, setUserData] = useState<UserType>();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

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

  const postOrderDetails = async (address: string, email: string, phoneNo: string) => {
    const orderDetailPreset = {
      address, email, phoneNo: parseInt(phoneNo)
    };

    if(userData===null || userData===undefined || !user || !user?.email) return;

    const rawRes = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        email: user?.email,
        wishList: userData.wishList,
        cart: userData.cart,
        orderDetailOptions: [...userData.orderDetailOptions, orderDetailPreset],
        recentTags: userData.recentTags,
        isSeller: userData.isSeller,
        storeId: userData.storeId,
        money: userData.money,
        orders: userData.orders
      })
    });

    const jsonData = await rawRes.json();
    if(jsonData.status===ResponseCodes.SUCCESS){
      setAddress("");
      setEmail("");
      setPhoneNo("");
      (async ()=> await getUser(user.email!))();
    };
  };

  const removeOrderDetails = async (id: string) => {
    if(userData===null || userData===undefined) return;
    const orderDetailPresets: OrderDetails[] = userData.orderDetailOptions.filter(detail=> detail._id !== id);
    if(userData===null || !user || !user?.email) return;
    const rawRes = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        email: user?.email,
        wishList: userData.wishList,
        cart: userData.cart,
        orderDetailOptions: orderDetailPresets,
        recentTags: userData.recentTags,
        isSeller: userData.isSeller,
        storeId: userData.storeId,
        money: userData.money,
        orders: userData.orders
      })
    });

    const jsonData = await rawRes.json();
    if(jsonData.status===ResponseCodes.SUCCESS){
      setAddress("");
      setEmail("");
      setPhoneNo("");
      (async ()=> await getUser(user.email!))();
    };
  };

  const handleAddOrderDetailPreset = () => {
    const isValidAddress = Boolean(address.trim());
    const isEmailValid = Boolean(isValidEmail(email) && email.trim());
    const isValidPhoneNo = Boolean(phoneNo.toString().length===10);
    if(!isValidAddress || !isEmailValid || !isValidPhoneNo) return;
    (async ()=> await postOrderDetails(address, email, phoneNo))();
  };

  const handleDeleteOrderDetailPreset = (id: string) =>{
    (async ()=> await removeOrderDetails(id))();
  };

  const handleSignOut = () =>{
    signOut(auth);
    router.replace("/");
  };

  useEffect(()=>{
    if(loading || !user || !user?.email) return;
    (async ()=> await getUser(user.email!))();
  }, [loading, user?.email]);

  const userId = useMemo(()=>{
    if(!userData) return "Loading..."
    return `${userData._id.slice(0, 4)} ${userData._id.slice(4, 8)} ${userData._id.slice(8, 12)} ${userData._id.slice(12, 16)} ${userData._id.slice(16, 200)} `
  }, [userData?._id])

  return (
    <div className="h-full flex flex-col overflow-x-hidden overflow-y-auto no_pad_scroll md:custom_scroll">
      <h1 className="w-full p-2 font-primary text-xl md:text-2xl bg-accent text-white">My Settings</h1>
    {/*Card details*/}
      <div className="flex md:flex-row flex-col items-center md:p-4 justify-center">
        <div className="relative ml-[2rem] mt-4 md:mt-0 flex items-center max-w-[23rem] rounded-[5px] pr-8 md:w-[95%] bg-[#2a333a] h-[15rem]">
          <div className="relative -left-[1.5rem] md:h-[150px] h-[100px] md:w-[150px] w-[100px] bg-slate-700 -left-[1.9rem] z-30 shadow-md shadow-slate-900 rounded-[5px] overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              alt={"user"}
              src={(loading || !user || !user?.photoURL) ? AltImage : user?.photoURL}
            />
          </div>
          <div className="flex-1 h-full">
            <div className="py-[2.8rem] h-full">
              <div className="w-full mt-[1rem] flex items-center">
                <span className="bg-red-300 w-[40px] h-[40px] rounded-full block opacity-50" />
                <span className="bg-blue-300 w-[40px] h-[40px] relative -left-4 rounded-full block opacity-50" />
                <span className="bg-green-300 w-[40px] h-[40px] relative -left-8 rounded-full block opacity-50" />
              </div>
              <h2 className="text-slate-300 mb-[1rem]">Imaginary bank.CO</h2>
              <h2 className="text-slate-300">{user?.email || "error@gmail.com"}</h2>
              <h2 className="text-slate-300">Balance {userData?.money || NaN}$</h2>
            </div>
            <div className="flex flex-col absolute p-2 w-full h-full top-0 left-0 z-20 rounded-[5px]">
              <h1 className="text-slate-300 text-xl ml-[1rem]">{user?.displayName || (loading ? "Loading..." : "An error occured!")}</h1>
              <h1 className="text-slate-300 text-base ml-[1rem] mt-auto">{userId || "An error occured!"}</h1>
            </div>
          </div>
        </div>
        <div className="max-w-[40rem] rounded-[5px] flex-1 gap-2 ml-4 h-full p-4 pt-8 flex flex-wrap">
        {/*Cart data*/}
          <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
            <div className="w-full flex items-center">
              <FaCartShopping style={{ color: Colors.ACCENT, fontSize: 32 }} />
              <h1 className="ml-2 text-2xl font-primary text-accent">Cart items</h1>
            </div>
            <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">{userData?.cart.length || 0}</h2>
          </div>
        {/*Wishlist data*/}
          <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
            <div className="w-full flex items-center">
              <FaListAlt style={{ color: Colors.ACCENT, fontSize: 32 }} />
              <h1 className="ml-2 text-2xl font-primary text-accent">Wishlist items</h1>
            </div>
            <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">{userData?.cart.length || 0}</h2>
          </div>
        {/*Orders data*/}
          <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
            <div className="w-full flex items-center">
              <BsFillBoxSeamFill style={{ color: Colors.ACCENT, fontSize: 32 }} />
              <h1 className="ml-2 text-2xl font-primary text-accent">Orders items</h1>
            </div>
            <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">{userData?.cart.length || 0}</h2>
          </div>
        </div>
      </div>
    {/*Order data*/}
      <div className="w-full mb-[4rem] flex flex-col">
        <h1 className="text-2xl p-4 w-full mt-8 mb-4 font-primary max-w-[67rem] mx-auto">Add order detail preset</h1>
        <div className="flex items-center flex-wrap mx-auto gap-2 items-center justify-center">
          <div className="flex flex-col">
            <label htmlFor="address" className="text-xl mb-2">Address</label>
            <input value={address} onChange={(event)=> setAddress(event.target.value)} id="address" type="text" className="py-4 px-2 outline-none bg-slate-200 w-[300px] rounded-[5px]" placeholder="Address..." />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl mb-2">Contact email</label>
            <input value={email} onChange={(event)=> setEmail(event.target.value)} id="email" type="email" className="py-4 px-2 outline-none bg-slate-200 w-[300px] rounded-[5px]" placeholder="Contact email..." />
          </div>
          <div className="flex flex-col">
            <label htmlFor="number" className="text-xl mb-2">Contact number</label>
            <input value={phoneNo} onChange={(event)=> setPhoneNo(event.target.value)}  id="number" type="number" className="py-4 px-2 outline-none bg-slate-200 w-[300px] rounded-[5px]" placeholder="Contact number..." />
          </div>
          <div className="w-full flex justify-center">
            <CustomButton callback={handleAddOrderDetailPreset} title="Submit" type="submit" styles={`px-2 py-4 w-[300px] ${userData===undefined && "bg-slate-500 pointer-events-none"}`} />
          </div>
        </div>
        <h1 className="text-2xl p-4 w-full mt-8 mb-4 font-primary max-w-[67rem] mx-auto">Order detail presets</h1>
        <div className="flex flex-col items-center p-4 w-full gap-2">
          {
            userData && userData.orderDetailOptions.map(detail=>(
              <div key={detail.email} className="flex flex-col py-2 w-[90%] max-w-[80rem] mx-auto px-6 rounded-[5px] bg-slate-300 h-fit">
                <div>
                  <h2 className="text-xl">Address</h2>
                  <p className="bg-slate-400 p-2 rounded-[5px]">{detail.address}</p>
                </div>
                <div>
                  <h2 className="text-xl">Email</h2>
                  <p className="bg-slate-400 p-2 rounded-[5px]">{detail.email}</p>
                </div>
                <div>
                  <h2 className="text-xl">Phone No</h2>
                  <p className="bg-slate-400 p-2 rounded-[5px]">{detail.phoneNo}</p>
                </div>
                <button className="mt-8 bg-red-400 w-fit px-4 py-2 rounded-[5px]" onClick={()=> handleDeleteOrderDetailPreset(detail._id.toString())}>Delete</button>
              </div>
            ))
          }
        </div>
        <div className="p-4 max-w-[65rem] mx-auto">
          <CustomButton styles="bg-red-700" callback={handleSignOut} title="Sign out" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
