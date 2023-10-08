"use client";

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdAttachMoney } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

const PcLinks = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading] = useAuthState(auth);
  const isLoading = loading;
  const isSignedIn = typeof user?.email === "string";

  const router = useRouter();

  const goToLink = (link: string) => {
    router.push(link);
  };

  if (isLoading)
    return (
      <div className="hidden lg:flex ml-4">
        <RiAccountCircleFill
          style={{
            color: "white",
            fontSize: 28,
            marginRight: "5px",
            cursor: "pointer",
          }}
        />
        <h1 className="text-white">Loading user...</h1>
      </div>
    );

  return (
    <div className="hidden lg:flex items-center ml-8 mr-4">
      {!isSignedIn ? (
        <h1
          className="cursor-pointer text-white hover:text-gray-100"
          onClick={() => signInWithGoogle()}
        >
          Sign in
        </h1>
      ) : (
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => goToLink("/user/dashboard/cart")}>
                <ImCart
                  style={{
                    color: "white",
                    fontSize: 24,
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white rounded-[5px]">
                Cart
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => goToLink("/user/dashboard/wishlist")}
              >
                <MdOutlinePlaylistPlay
                  style={{
                    color: "white",
                    fontSize: 28,
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white rounded-[5px]">
                Wishlist
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/store/dashboard"}>
                  <MdAttachMoney
                    style={{
                      color: "white",
                      fontSize: 24,
                      marginRight: "4rem",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-white rounded-[5px]">
                Your shop
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex cursor-pointer group">
            <img
              src={user?.photoURL || ""}
              alt="user"
              className="w-[28px] rounded-full mr-2"
            />
            <h2 className="text-white text-md group-hover:text-gray-300">
              {user?.displayName || ""}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcLinks;
