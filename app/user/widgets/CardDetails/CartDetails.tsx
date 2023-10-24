import { Colors } from "@/constants";
import { FaCartShopping } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { UserType } from "@/types";

interface Props {
  userData: UserType | undefined;
}

const CartDetails = ({ userData }: Props) => {
  return (
    <div className="max-w-[40rem] items-center justify-center md:justify-start rounded-[5px] flex-1 gap-2 ml-4 h-full p-4 pt-8 flex flex-wrap">
      {/*Cart data*/}
      <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
        <div className="w-full flex items-center">
          <FaCartShopping style={{ color: Colors.ACCENT, fontSize: 32 }} />
          <h1 className="ml-2 text-2xl font-primary text-[--primary-accent]">
            Cart items
          </h1>
        </div>
        <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">
          {userData?.cart.length || 0}
        </h2>
      </div>
      {/*Wishlist data*/}
      <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
        <div className="w-full flex items-center">
          <FaListAlt style={{ color: Colors.ACCENT, fontSize: 32 }} />
          <h1 className="ml-2 text-2xl font-primary text-[--primary-accent]">
            Wishlist items
          </h1>
        </div>
        <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">
          {userData?.wishList.length || 0}
        </h2>
      </div>
      {/*Orders data*/}
      <div className="w-[270px] flex items-center p-4 h-[60px] bg-slate-200 rounded-[5px]">
        <div className="w-full flex items-center">
          <BsFillBoxSeamFill style={{ color: Colors.ACCENT, fontSize: 32 }} />
          <h1 className="ml-2 text-2xl font-primary text-[--primary-accent]">
            Orders items
          </h1>
        </div>
        <h2 className="text-2xl font-primary text-slate-500 mt-auto ml-2">
          {userData?.orders.length || 0}
        </h2>
      </div>
    </div>
  );
};

export default CartDetails;
