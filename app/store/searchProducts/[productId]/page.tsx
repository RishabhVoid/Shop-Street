import { Colors } from "@/constants";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import getProductById from "@/lib/getProductById";
import ProductImagePreview from "@/components/ProductImagePreview";
import DeleteProductButton from "../widgets/DeleteProductButton";
import Link from "next/link";

interface Props {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const product = await getProductById(params.productId);

  return (
    <div className="w-full flex flex-col h-auto md:flex-row max-w-[90rem] mx-auto overflow-x-hidden overflow-y-auto custom_scroll">
      <div className="md:w-1/2 w-full relative min-h-[70vh] md:h-[100vh] flex items-center justify-center">
        <ProductImagePreview productId={String(product._id)} />
      </div>
      <div className="md:flex-1 flex flex-col p-4 bg-slate-100 md:h-full md:overflow-x-hidden md:overflow-y-auto overflow-y-visible custom_scroll">
        <div className="flex md:flex-col flex-col-reverse mb-2">
          <div className="flex flex-wrap gap-1 mx-4">
            {product.matchingCategories.map((category) => (
              <span
                key={category}
                className="bg-accent px-2 py-1 rounded-[50px] capitalize text-white"
              >
                #{category}
              </span>
            ))}
          </div>
          <div className="md:mt-[10%] p-4">
            <h1 className="flex items-center text-2xl text-accent font-bold">
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
          </div>
        </div>
        <div className="bg-slate-300 p-4 rounded-[5px] mx-4">
          <h1 className="font-primary">Seller options only!</h1>
          <p className="text-xs ">This data is only visible to you</p>
          <div className="mt-2">
            <h2 className="text-sm">Sotck left: {product.inventory}</h2>
            <h2 className="text-sm">Good ratings: {product.rating}</h2>
            <h2 className="text-sm">
              Distance covered for delivery: {product.maxDistance}
            </h2>
            <h2 className="text-sm">
              Avg days for delivery: {product.deliveryDays}
            </h2>
          </div>
          <DeleteProductButton productId={String(product._id)} />
          <Link
            href={"/store/searchProducts"}
            replace
            className="ml-2 px-4 py-1 text-sm text-white rounded-[5px] bg-slate-700"
          >
            Go back
          </Link>
        </div>
        <div className="mt-4 mx-4 flex flex-wrap gap-4 pointer-events-none opacity-30 md:mt-8">
          <button className="bg-accent text-white px-4 py-2 rounded-full transition duration-200 hover:brightness-[1.1]">
            Buy Now
          </button>
          <button className="border-2 border-accent px-4 py-2 rounded-full transition duration-200 hover:bg-slate-200">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
