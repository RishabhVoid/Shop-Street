import FilterBar from "./widgets/FilterBar";
import SearchBar from "./widgets/SearchBar";
import getSearchedProducts from "@/lib/getSearchedProducts";
import ViewerProductView from "@/components/ViewerProductView";
import { Colors, MaxPrices, MinPrices } from "@/constants";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Pagination from "./widgets/Pagination";
import ProductSortDrawer from "@/components/ProductSortDrawer";

interface Props {
  searchParams: {
    pageNo: string;
    query: string;
    categories: string;
    minPrice: string;
    maxPrice: string;
    sortBy: "price" | "rating";
    highToLow: string;
  };
}

const Search = async ({ searchParams }: Props) => {
  const products = await getSearchedProducts(
    searchParams.pageNo || "1",
    searchParams.query || "",
    searchParams.categories || "",
    searchParams.minPrice || String(MinPrices[0]),
    searchParams.maxPrice || String(MaxPrices.reverse()[0]),
    searchParams.sortBy || "price",
    searchParams.highToLow || "true"
  );

  return (
    <Sheet>
      <div className="h-full relative w-full flex">
        <SheetTrigger className="absolute block md:hidden bg-accent p-4 rounded-full bottom-2 left-2 z-50">
          <FaFilter style={{ color: "white" }} />
        </SheetTrigger>
        <FilterBar />
        <div className="flex-1 h-full flex flex-col">
          <SearchBar query={searchParams.query || ""} />
          <div className="h-[3rem] w-full p-2 border-2 border-b-slate-300">
            <div className="flex items-center w-fit h-full">
              <h1 className="text-xl mr-2">Items: {products.length}</h1>
              <BsFillBoxSeamFill
                style={{ color: Colors.ACCENT, fontSize: 20 }}
              />
            </div>
          </div>
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
              pageNo={searchParams.pageNo || "1"}
              productsLength={products.length}
            />
          </div>
        </div>
      </div>
      <ProductSortDrawer
        pageNo={searchParams.pageNo}
        isClientComponent={false}
      />
    </Sheet>
  );
};

export default Search;
