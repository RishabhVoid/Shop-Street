"use client";

import SearchBar from "./SearchBar";
import PriceRangeSelector from "./PriceRangeSelector";
import CategoryChooser from "./CategoryChooser";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchFilters, SortBy } from "@/types";
import { MaxPrices, MinPrices, sortOptions } from "@/constants";
import { MdFilterList } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import updateSearchParams from "@/lib/updateSearchParams";

interface Props {
  isClientComponent: boolean;
  setFilters?: React.Dispatch<React.SetStateAction<SearchFilters>>;
  pageNo?: string;
}

const ProductSortDrawer = ({
  isClientComponent,
  setFilters,
  pageNo,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100_000,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("price");
  const [highToLow, setHighToLow] = useState(true);

  const router = useRouter();

  const handleSubmit = () => {
    const minPrice = priceRange.min > priceRange.max ? 0 : priceRange.min;
    const maxPrice = priceRange.min > priceRange.max ? 100_000 : priceRange.max;
    if (isClientComponent && setFilters) {
      setFilters((filters) => ({
        pageNo: filters.pageNo,
        priceMin: minPrice,
        priceMax: maxPrice,
        searchQuery: searchTerm,
        categories: categories,
        order: highToLow ? "high-to-low" : "low-to-high",
        sortBy: sortBy,
      }));
      return;
    }
    const searchUrl = updateSearchParams(
      ["minPrice", "maxPrice", "categories", "sortBy", "highToLow"],
      [
        String(minPrice),
        String(maxPrice),
        categories.join("_"),
        sortBy,
        String(highToLow),
      ]
    );
    router.replace(searchUrl, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    if (isClientComponent && setFilters) {
      setFilters((filters) => ({
        pageNo: filters.pageNo,
        searchQuery: "",
        priceMin: MinPrices[0],
        priceMax: MaxPrices.reverse()[0],
        categories: [],
        order: "high-to-low",
        sortBy: "price",
      }));
      setSearchTerm("");
      setPriceRange({
        min: 0,
        max: 100_000,
      });
      setCategories([]);
      setSortBy("price");
      setHighToLow(true);
      return;
    }
    router.replace(`/search?page=${pageNo}`);
  };

  return (
    <SheetContent className="bg-white w-[90%] sm:w-[30rem] p-2 h-full">
      <div className="h-full overflow-y-auto flex-col pt-4 custom_scroll">
        {isClientComponent && (
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        <PriceRangeSelector
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <CategoryChooser
          categories={categories}
          setCategories={setCategories}
        />
        <div className="mb-2">
          <Select
            defaultValue={sortBy}
            onValueChange={(value) => setSortBy(value as SortBy)}
          >
            <div className="flex justify-between">
              <label htmlFor="Choose categories" className="font-primary">
                Sort by
              </label>
              {highToLow ? <h1>High to low</h1> : <h1>Low to high</h1>}
            </div>
            <div className="flex items-center">
              <SelectTrigger className="w-full bg-accent text-white rounded-[5px]">
                <SelectValue placeholder="Sort by" className="capitalize" />
              </SelectTrigger>
              <SelectContent className="text-white bg-accent rounded-[5px]">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option}
                    className="capitalize"
                    value={option}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
              <div
                className={`bg-accent h-full p-2 ml-2 rounded-[5px] transition-transform duration-300 cursor-pointer ${
                  highToLow ? "rotate-0" : "rotate-180"
                }`}
                onClick={() => setHighToLow(!highToLow)}
              >
                <MdFilterList style={{ color: "white", fontSize: 22 }} />
              </div>
            </div>
          </Select>
        </div>
        <div className="flex mt-8">
          <SheetClose
            onClick={handleSubmit}
            className="bg-accent mr-4 text-white py-2 w-full text-center mt-4 rounded-[5px]"
          >
            Search with filters
          </SheetClose>
          <SheetClose
            onClick={clearFilters}
            className="border-2 border-accent py-2 w-full text-center mt-4 rounded-[5px]"
          >
            Clear filters
          </SheetClose>
        </div>
      </div>
    </SheetContent>
  );
};

export default ProductSortDrawer;
