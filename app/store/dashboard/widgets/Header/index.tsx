import { Colors } from "@/constants";
import Link from "next/link";
import { IoCaretBackCircleSharp } from "react-icons/io5";

interface Props {
  displayName: string | undefined | null;
  storeName: string | undefined;
  imageUrl: string | undefined | null;
}

const Header = ({ displayName, storeName, imageUrl }: Props) => {
  return (
    <div className="w-full flex items-center p-2">
      <h1 className="hidden md:block text-lg font-primary bg-[--primary-accent] text-white z-[1000] rounded-[10px] py-2 px-4">
        Dashboard
      </h1>
      <div className="flex items-center w-[100vw] md:w-auto md:ml-auto">
        <img
          src={imageUrl || ""}
          alt="X"
          className="w-[30px] h-[30px] rounded-full mr-2 md:h-[35px] md:w-[35px]"
        />
        <div className="flex flex-col md:mr-4">
          <h1 className="text-sm md:text-base">
            {!storeName && "Loading..."}
            {storeName?.slice(0, 20)}
            {(storeName?.length || 0) > 20 && "..."}
          </h1>
          <h2 className="text-xs md:text-sm -mt-1">{displayName}</h2>
        </div>
        <Link href={"/"} replace className="ml-auto">
          <IoCaretBackCircleSharp
            style={{ marginLeft: "auto", fontSize: 32, color: Colors.ACCENT }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
