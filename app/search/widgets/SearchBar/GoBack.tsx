"use client";

import { useRouter } from "next/navigation";
import { AiFillCaretLeft } from "react-icons/ai";

const GoBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-accent w-[60px] h-full flex md:hidden items-center justify-center"
    >
      <AiFillCaretLeft style={{ color: "white" }} />
    </button>
  );
};

export default GoBack;
