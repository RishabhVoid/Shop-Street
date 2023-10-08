"use client";

import CustomButton from "@/components/CustomButton";
import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { useRef, FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateStore = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [user] = useAuthState(auth);

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
      alert("An error occured!");
    } else if (jsonRes.status === ResponseCodes.SUCCESS) {
      router.replace("/store/dashboard", { scroll: false });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const shopName = inputRef.current.value;
    (async () => await createStore(shopName, user?.email || ""))();
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form className="flex flex-col p-8" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter shop name here..."
          className="shadow-slate-500 rounded-[5px] text-base py-2 px-4 mb-4 shadow-md outline-none"
        />
        <CustomButton title="Submit" type="submit" styles="pt-2" />
      </form>
    </div>
  );
};

export default CreateStore;
