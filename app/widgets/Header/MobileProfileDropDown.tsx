"use client";

import { RiAccountCircleFill } from "react-icons/ri";
import { ImCart } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";

const MobileProfileDropDown = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading] = useAuthState(auth);
  const isLoading = loading;
  const isSignedIn = typeof user?.email === "string";

  if (isLoading)
    return (
      <div className="flex lg:hidden ml-auto">
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
    <div className="lg:hidden ml-auto mr-4 flex items-center">
      <Link href="user/dashboard/cart">
        <ImCart style={{ color: "white", fontSize: 24, marginRight: "1rem" }} />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center outline-none">
          {!isSignedIn ? (
            <RiAccountCircleFill
              style={{ color: "white", fontSize: 24, cursor: "pointer" }}
            />
          ) : (
            <img
              src={user.photoURL || ""}
              alt="user"
              className="w-[30px] rounded-full"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white mr-2 rounded-[5px]">
          <DropdownMenuLabel className="font-normal">
            {isSignedIn ? user.displayName : "Not signed in"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!isSignedIn && (
            <DropdownMenuItem
              className="rounded-[5px]"
              onClick={() => signInWithGoogle()}
            >
              Sign In
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className={`rounded-[5px] ${
              !isSignedIn && "text-gray-300 pointer-events-none"
            }`}
          >
            <Link href={"/store/dashboard"}>Your shop</Link>
          </DropdownMenuItem>
          <Link href="/user/dashboard/wishlist">
            <DropdownMenuItem
              className={`rounded-[5px] ${
                !isSignedIn && "text-gray-300 pointer-events-none"
              }`}
            >
              Wishlist
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className={`rounded-[5px] ${
              !isSignedIn && "text-gray-300 pointer-events-none"
            }`}
            onClick={() => signOut(auth)}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileProfileDropDown;
