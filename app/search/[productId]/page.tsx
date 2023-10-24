import { Colors } from "@/constants";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Link from "next/link";
import getProductById from "@/lib/getProductById";
import ProductImagePreview from "@/components/ProductImagePreview";
import GoBackButton from "../widgets/GoBackButton";
import AddToCartToButton from "../widgets/AddToCartButton";
import AddToWishlist from "../widgets/AddToWishlist";

interface Props {
  params: {
    productId: string;
  };
}

const ProductView = async ({ params }: Props) => {
  const product = await getProductById(params.productId);

  const outOfStock = product.inventory <= 0;

  return (
    <div className="w-full flex flex-col h-full max_contain md:flex-row max-w-[90rem] mx-auto overflow-x-hidden overflow-y-auto custom_scroll">
      <div className="md:w-1/2 w-full relative min-h-[70vh] md:h-[100vh] flex items-center justify-center">
        <ProductImagePreview productId={String(product._id)} />
      </div>
      <div className="md:flex-1 flex flex-col max-w-[30rem] mx-auto mt-4 md:max-w-full md:mx-0 md:mt-0 p-4 bg-slate-100 md:h-full md:overflow-x-hidden md:overflow-y-auto overflow-y-visible custom_scroll">
        <div className="flex md:flex-col flex-col-reverse mb-2">
          <div className="flex flex-wrap gap-1 mx-4">
            {product.matchingCategories.map((category) => (
              <span
                key={category}
                className="bg-[--primary-accent] px-2 py-1 rounded-[50px] capitalize text-white"
              >
                #{category}
              </span>
            ))}
          </div>
          <div className="md:mt-[10%] p-4">
            <h1 className="flex items-center text-2xl text-[--primary-accent] font-bold">
              {product.price}
              <div className="relative rotate-[180]">
                <RiMoneyDollarCircleFill
                  style={{ color: Colors.ACCENT, fontSize: 28 }}
                />
              </div>
            </h1>
            <h2 className="text-xl mt-2 font-primary font-extralight">
              {product.title}
            </h2>
            <p className="bg-slate-300 p-2 mt-4 rounded-[5px]">
              {product.desc}
            </p>
            {product.inventory < 20 && product.inventory > 0 && (
              <p className="bg-slate-300 p-2 mt-4 rounded-[5px]">
                Hurry! only {product.inventory} left!
              </p>
            )}
            {product.inventory <= 0 && (
              <p className="text-red-800 p-2 mt-4 rounded-[5px]">
                Out of stock!
              </p>
            )}
            <GoBackButton />
          </div>
        </div>
        <div
          className={`mx-4 flex flex-col gap-4 md:mt-auto ${
            outOfStock && "pointer-events-none"
          }`}
        >
          <Link href={`/placeOrder/${product._id}`}>
            <button
              disabled={outOfStock}
              className={`w-fit text-white px-4 py-2 rounded-full ${
                outOfStock
                  ? "bg-slate-300"
                  : "bg-[--primary-accent] transition duration-200 hover:brightness-[1.1]"
              }`}
            >
              Buy Now
            </button>
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <AddToCartToButton productId={params.productId} />
            <AddToWishlist productId={params.productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
