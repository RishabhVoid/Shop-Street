"use client";

import { useRouter } from "next/navigation";
import { AiFillCaretLeft } from "react-icons/ai";

const GoBack = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="bg-accent w-[60px] h-full flex md:hidden items-center justify-center"
    >
      <AiFillCaretLeft style={{ color: "white" }} />
    </div>
  );
};

export default GoBack;
