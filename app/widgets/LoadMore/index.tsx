"use client";

import { ProductsSectionSize } from "@/constants";
import { ProductType } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  skip: number;
  lastChunkValid: boolean;
}

const LoadMore = ({ skip, lastChunkValid }: Props) => {
  const router = useRouter();

  const loadMore = () => {
    if (!lastChunkValid) return;
    const nextSkip = skip + ProductsSectionSize;
    router.replace(`?skip=${nextSkip}`, { scroll: false });
  };

  return (
    <div className="py-8 w-full flex items-center justify-center">
      <h1
        className={`px-4 py-2 bg-slate-300 rounded-[5px] ${
          lastChunkValid && "cursor-pointer"
        }`}
        onClick={loadMore}
      >
        {lastChunkValid
          ? "Load more products..."
          : "Ooops! no more items it seems!"}
      </h1>
    </div>
  );
};

export default LoadMore;
