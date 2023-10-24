import ViewerProductView from "@/components/ViewerProductView";
import { MaxPrices, MinPrices } from "@/constants";
import getSearchedProducts from "@/lib/getSearchedProducts";
import Pagination from "../Pagination";
import FallBack from "../FallBack";

interface Props {
  params: {
    pageNo: string;
    query: string;
    categories: string;
    minPrice: string;
    maxPrice: string;
    sortBy: "price" | "rating";
    highToLow: string;
  };
}

const SearchedItems = async ({ params }: Props) => {
  const products = await getSearchedProducts(
    params.pageNo || "1",
    params.query || "",
    params.categories || "",
    params.minPrice || String(MinPrices[0]),
    params.maxPrice || String(MaxPrices.reverse()[0]),
    params.sortBy || "price",
    params.highToLow || "true"
  );

  return (
    <div className="flex flex-wrap flex-1 items-center justify-center overflow-x-hidden overflow-y-auto no_pad_scroll sm:custom_scroll">
      {products.length !== 0 ? (
        products.map((product) => (
          <div key={product._id} className="relative w-[170px] h-[300px]">
            <ViewerProductView product={product} />
          </div>
        ))
      ) : (
        <div className="w-[90%] max-w-[30rem] flex flex-col items-center">
          <img src="/svgs/no_data.svg" className="w-full" alt="no data" />
          <h1 className="font-primary text-2xl">No data found</h1>
        </div>
      )}
      <Pagination
        pageNo={params.pageNo || "1"}
        productsLength={products.length}
      />
    </div>
  );
};

export default SearchedItems;
