"use client";

import { storage } from "@/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/types";
import { ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType;
  willBeHorizontle?: boolean;
}

const ViewerProductView = ({ product, willBeHorizontle = false }: Props) => {
  const router = useRouter();

  const [downloadUrl, loading] = useDownloadURL(
    ref(storage, `${product?._id}-main`)
  );

  const goToItem = () => {
    router.push(`/search/${product._id}`);
  };

  if (loading)
    return (
      <div className="w-full h-full p-1 flex flex-col justify-evenly">
        <Skeleton className="w-full h-[55%] bg-slate-300 rounded-[5px]" />
        <Skeleton className="w-[30%] h-[15%] bg-slate-300 rounded-[5px]" />
        <Skeleton className="w-full h-[15%] bg-slate-300 rounded-[5px]" />
      </div>
    );

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden h-full flex flex-wrap border border-slate-300">
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <div
          className="relative w-full h-[100%] group flex flex-col cursor-pointer"
          onClick={goToItem}
        >
          <div className="relative w-full h-[60%]">
            <Image
              src={downloadUrl!}
              className={`${
                willBeHorizontle
                  ? "object-contain"
                  : "object-cover group-hover:object-contain"
              } object-center w-full h-full`}
              alt="product"
              sizes="200px, 350px"
              fill
              priority
            />
          </div>
          <div className="w-[100%] h-[40%] transition duration-200 group-hover:bg-slate-200 flex flex-col p-4 justify-center">
            <h1 className="text-xl">
              <sup>$</sup>
              {product.price}
            </h1>
            <h2 className="text-sm">{product.title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerProductView;
