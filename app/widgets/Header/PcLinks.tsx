"use client";

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { auth } from "@/firebaseConfig";
import PcSignedInLinks from "./PcSignedInLinks";

const PcLinks = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading] = useAuthState(auth);
  const isLoading = loading;
  const isSignedIn = typeof user?.email === "string";

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
          onClick={() => signInWithGoogle()}
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
          displayName={user?.displayName}
          photoURL={user?.photoURL}
        />
      )}
    </div>
  );
};

export default PcLinks;
