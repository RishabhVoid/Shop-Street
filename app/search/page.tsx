import FilterBar from "./widgets/FilterBar";
import SearchBar from "./widgets/SearchBar";
import SearchedItems from "./widgets/SearchedItems";
import { Suspense } from "react";
import FallBack from "./widgets/FallBack";

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
  return (
    <>
      <div className="h-full relative w-full flex max_contain">
        <FilterBar />
        <div className="flex-1 h-full flex flex-col">
          <SearchBar query={searchParams.query || ""} />
          <Suspense fallback={<FallBack />}>
            {/* @ts-expect-error */}
            <SearchedItems params={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Search;
