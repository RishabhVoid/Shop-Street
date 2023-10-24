import Link from "next/link";
import { MdAttachMoney } from "react-icons/md";
import { ImCart } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlinePlaylistPlay } from "react-icons/md";

interface Props {
  photoURL: string | null;
  displayName: string | null;
}

const PcSignedInLinks = ({ photoURL, displayName }: Props) => {
  return (
    <div className="flex items-center">
      <Tooltip title="Cart">
        <Link href={"/user/dashboard/cart"}>
          <ImCart
            style={{
              color: "white",
              fontSize: 24,
              marginRight: "1rem",
              cursor: "pointer",
            }}
          />
        </Link>
      </Tooltip>

      <Tooltip title="Wishlist">
        <Link href={"/user/dashboard/wishlist"}>
          <MdOutlinePlaylistPlay
            style={{
              color: "white",
              fontSize: 28,
              marginRight: "1rem",
              cursor: "pointer",
            }}
          />
        </Link>
      </Tooltip>

      <Tooltip title="Store">
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
      </Tooltip>

      <Link href={"/user/dashboard/settings"}>
        <div className="flex cursor-pointer group">
          <img
            src={photoURL || ""}
            alt="user"
            className="w-[28px] rounded-full mr-2"
          />
          <h2 className="text-slate-300 group-hover:text-white transition duration-200 text-md">
            {displayName || ""}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default PcSignedInLinks;
