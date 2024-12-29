"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import PcSignedInLinks from "./PcSignedInLinks";
import useAuth from "@/hooks/useAuth";
import { useRef } from "react";
import { AuthFormHandler } from "./AuthForm";

const PcLinks = () => {
  const authFormRef = useRef<AuthFormHandler>(null);
  const { authState } = useAuth();
  const isLoading = authState?.isLoading;
  const isSignedIn = typeof authState?.user?.email === "string";

  const openAuthForm = () => {
    authFormRef.current?.openDialog("register");
  };

  if (isLoading)
    return (
      <div className="hidden lg:flex ml-4">
        <div className="animate-spin flex items-center justify-center mr-2">
          <AiOutlineLoading3Quarters
            style={{
              color: "white",
              fontSize: 24,
              cursor: "pointer",
            }}
          />
        </div>
        <h1 className="text-white">Loading user...</h1>
      </div>
    );

  return (
    <div className="hidden lg:flex items-center ml-8 mr-4">
      {!isSignedIn ? (
        <div
          className="flex items-center group"
          onClick={openAuthForm}
        >
          <div className="flex items-center mr-2 justify-center">
            <RiLoginCircleFill
              style={{
                color: "white",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </div>
          <h2 className="text-slate-300 group-hover:text-white cursor-pointer transition duration-200">
            Sign in
          </h2>
        </div>
      ) : (
        <PcSignedInLinks
          displayName={authState?.user?.name ?? "NULL"}
          photoURL={""}
        />
      )}
    </div>
  );
};

export default PcLinks;
