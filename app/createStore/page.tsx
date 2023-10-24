"use client";

import CustomButton from "@/components/CustomButton";
import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { useRef, FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SellerFeatures, Colors } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { StoreNameRules } from "@/constants";
import { AiFillCaretLeft } from "react-icons/ai";

const CreateStore = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const createStore = async (storeName: string, userEmail: string) => {
    const rawRes = await fetch("/api/store", {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        storeName,
      }),
    });

    const jsonRes = await rawRes.json();

    if (jsonRes.status === ResponseCodes.NOT_FOUND) {
      router.replace("/");
    } else if (jsonRes.status === ResponseCodes.SUCCESS) {
      router.replace("/store/dashboard", { scroll: false });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const shopName = inputRef.current.value;
    if (!shopName.trim()) {
      toast({
        title: "Please provide with a valid shop name",
        description: "The shop name you provided contains no characters at all",
      });
      return;
    } else if (shopName.length >= StoreNameRules.max) {
      toast({
        title: "Please provide with a valid shop name",
        description: `The shop name you provided contains more than ${StoreNameRules.max} characters which is the limit!`,
      });
      return;
    } else if (shopName.length < StoreNameRules.min) {
      toast({
        title: "Please provide with a valid shop name",
        description: `The shop name you provided contains less than ${StoreNameRules.min} characters which is the min!`,
      });
      return;
    }
    (async () => await createStore(shopName, user?.email || ""))();
  };

  return (
    <div className="w-full h-[100vh] flex flex-col max_contain">
      <div className="bg-[--primary-accent] flex items-center justify-between w-full text-white text-xl md:text-2xl">
        <h1 className="p-2">Create store</h1>
        <button
          onClick={() => router.replace("/")}
          className="bg-white mr-4 h-[35px] w-[35px] rounded-full flex items-center justify-center"
        >
          <AiFillCaretLeft style={{ color: Colors.ACCENT }} />
        </button>
      </div>
      <div className="w-full h-full flex md:flex-row flex-col overflow-x-hidden overflow-y-auto custom_scroll max-w-[90rem]">
        <div className="w-[100%] md:w-[70%] mx-auto h-full flex flex-col p-4 items-center justify-center">
          <div className="w-[90%] max-w-[30rem] flex flex-col items-center">
            <img
              src="/svgs/become_seller.svg"
              className="w-full"
              alt="become seller"
            />
          </div>
          <div className="mt-4 w-[100%] md:w-[90%]">
            <h1 className="text-xl">Joining us would give you access to,</h1>
            <ul className="p-2 w-[100%] md:w-[90%]">
              {SellerFeatures.map((feature) => (
                <li className="list-decimal text-sm" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form
          className="flex flex-col p-8 mx-auto max-w-[20rem] md:w-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="store_name">
            What would you like to call your store?
          </label>
          <input
            id="store_name"
            type="text"
            ref={inputRef}
            placeholder="Enter store name here..."
            className="bg-slate-100 mt-2 rounded-[5px] text-base py-2 px-4 mb-4 outline-none"
          />
          <CustomButton title="Submit" type="submit" styles="pt-2" />
          <div className="mt-2">
            {StoreNameRules.rules.map((rule) => (
              <h2 key={rule} className="text-sm">
                {rule}
              </h2>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
