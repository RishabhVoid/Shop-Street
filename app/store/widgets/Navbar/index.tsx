import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { BiSolidExit } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="bg-[--primary-accent] p-2 flex items-center justify-evenly h-[3.5rem] md:h-[100vh] md:flex-col md:justify-end md:w-[3rem]">
      <Link href={"/store/dashboard"} className="cursor-pointer md:mb-4">
        <div className="flex flex-col items-center">
          <BiSolidDashboard style={{ color: "white", fontSize: 24 }} />
          {/* <h1 className="text-white text-xs md:hidden">Dashboard</h1> */}
        </div>
      </Link>
      <Link href={"/store/searchProducts"} className="cursor-pointer md:mb-4">
        <div className="flex flex-col items-center">
          <MdOutlineProductionQuantityLimits
            style={{ color: "white", fontSize: 24 }}
          />
          {/* <h1 className="text-white text-xs md:hidden">Search products</h1> */}
        </div>
      </Link>
      <Link href={"/store/addProduct"} className="cursor-pointer md:mb-4">
        <div className="flex flex-col items-center">
          <IoMdAddCircle style={{ color: "white", fontSize: 24 }} />
          {/* <h1 className="text-white text-xs md:hidden">Add product</h1> */}
        </div>
      </Link>
      <Link href={"/"} className="cursor-pointer">
        <div className="flex flex-col items-center">
          <BiSolidExit style={{ color: "white", fontSize: 24 }} />
          {/* <h1 className="text-white text-xs md:hidden">Add product</h1> */}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
