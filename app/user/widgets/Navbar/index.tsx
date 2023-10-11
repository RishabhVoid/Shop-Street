import { FaCartShopping } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiSolidExit } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="absolute justify-center bottom-0 mx-auto flex items-center w-full bg-accent md:bg-transparent">
      <div className="bg-accent flex items-center px-4 py-3 w-full md:mb-4 md:rounded-full md:w-[95%] z-[110] max-w-[25rem] justify-evenly">
        <Link href={"/user/dashboard/cart"} replace>
          <FaCartShopping style={{ fontSize: 20, color: "white" }} />
        </Link>
        <Link href={"/user/dashboard/wishlist"} replace>
          <FaListAlt style={{ fontSize: 20, color: "white" }} />
        </Link>
        <Link href={"/user/dashboard/orders"} replace>
          <BsFillBoxSeamFill style={{ fontSize: 20, color: "white" }} />
        </Link>
        <Link href={"/user/dashboard/settings"} replace>
          <IoSettings style={{ fontSize: 20, color: "white" }} />
        </Link>
        <Link href={"/"} replace>
          <BiSolidExit style={{ fontSize: 20, color: "white" }} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
