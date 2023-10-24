"use client";

import { Colors } from "@/constants";
import { useRouter } from "next/navigation";
import { IoCaretBackSharp } from "react-icons/io5";

interface Props {
  title: string;
  goBack?: boolean;
}

const Header = ({ title, goBack = false }: Props) => {
  const router = useRouter();

  return (
    <div className="w-full p-2 bg-[--primary-accent] flex items-center">
      <h1 className="font-primary text-xl md:text-2xl text-white">{title}</h1>
      {goBack && (
        <div
          onClick={() => router.back()}
          className="flex ml-auto rounded-full cursor-pointer w-[30px] h-[30px] bg-white items-center justify-center"
        >
          <IoCaretBackSharp style={{ color: Colors.ACCENT }} />
        </div>
      )}
    </div>
  );
};

export default Header;
