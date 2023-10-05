import { ProductType } from "@/types";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { BiLinkExternal } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType;
  inSellerView: boolean;
}

const Product = ({ product, inSellerView }: Props) => {
  const imageRef = ref(storage, `${product._id}-main`);
  const [imageUrl, loading] = useDownloadURL(imageRef);

  const router = useRouter();
  const altImage = "/images/loading_skeleton.png";

  if (loading)
    return (
      <div className="w-[180px] h-[300px] max-h-max relative border border-slate-400">
        <Image
          src={altImage}
          fill
          priority
          sizes="320px, 25rem"
          alt="Product image"
          className={
            "object-cover w-full h-full object-center relative animate-pulse"
          }
        />
      </div>
    );

  return (
    <div className="w-[180px] h-[300px] max-h-max flex flex-col relative border border-slate-400">
      <div className="relative h-[40%]">
        <Image
          src={imageUrl!}
          fill
          priority
          sizes="320px, 25rem"
          alt="Product image"
          className={"object-contain w-full h-full object-center relative"}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col bottom-0 h-[60%] transition-all duration-300 hover:h-full w-full overflow-hidden">
        <div className="">
          <h1 className="text-lg">
            <sup>$</sup>
            {product.price}
          </h1>
          <h2 className="text-md relative text-ellipsis h-[75px] overflow-hidden">
            <div className="absolute bottom-0 w-full h-[20%] bg-gradient-to-b from-[#ffffff27] to-[#fff]" />
            {product.title}
          </h2>
          <h2 className="text-white text-md hidden group-hover:block">
            Inventory left : {product.inventory}
          </h2>
          <h2 className="text-white text-md hidden group-hover:block">
            Area covered upto : {product.maxDistance} Km
          </h2>
          <h2 className="text-white text-md hidden group-hover:block">
            Area covered in : {product.deliveryDays} days
          </h2>
          <button
            className="bg-accent transition duration-300 hover:bg-slate-300 p-2 mx-auto rounded-[5px] flex items-center mt-2 text-white"
            onClick={() => {
              router.push(`/store/searchProducts/${product._id}`);
            }}
          >
            <h1 className="mr-2 text-sm">View details</h1>
            <BiLinkExternal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
