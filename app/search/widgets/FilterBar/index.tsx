"use client";

import CategoryChooser from "@/components/ProductSortDrawer/CategoryChooser";
import PriceRangeSelector from "@/components/ProductSortDrawer/PriceRangeSelector";
import { MaxPrices, MinPrices } from "@/constants";
import { MdFilterList } from "react-icons/md";
import { SortBy } from "@/types";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "@/components/CustomButton";
import updateSearchParams from "@/lib/updateSearchParams";
import { useRouter } from "next/navigation";

const sortOptions = ["price", "rating"];

const FilterBar = () => {
  const [priceRange, setPriceRange] = useState({
    max: MaxPrices.reverse()[0],
    min: MinPrices[0],
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("price");
  const [highToLow, setHighToLow] = useState(true);

  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    const updatedPath = updateSearchParams(
      ["minPrice", "maxPrice", "categories", "sortBy", "highToLow"],
      [
        String(priceRange.min),
        String(priceRange.max),
        categories.join("_"),
        sortBy,
        String(highToLow),
      ]
    );

    router.replace(updatedPath);
  };
  const clearFilters = () => {
    const updatedPath = updateSearchParams(
      ["query", "minPrice", "maxPrice", "categories", "sortBy", "highToLow"],
      ["", "0", "100000", "", "price", "true"]
    );

    setPriceRange({
      max: MaxPrices.reverse()[0],
      min: MinPrices[0],
    });
    setCategories([]);
    setSortBy("price");
    setHighToLow(true);

    router.replace(updatedPath);
  };

  const handleGoBack = () => {
    router.replace("/");
  };

  return (
    <>
      <div className={`h-full flex-col p-4 w-[20rem] absolute md:relative bg-white z-50 md:flex border-2 border-r-slate-300 transition-all duration-300 ${!isFilterBarVisible ? "-left-[100%] md:left-0" : "left-0"}`}>
        <h1 className="font-primary text-2xl mb-4">Filters</h1>
        <div className="flex items-center w-full">
          <PriceRangeSelector
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        <CategoryChooser categories={categories} setCategories={setCategories} />
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
                  <SelectItem key={option} className="capitalize" value={option}>
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
          <button
            className="border-2 mr-2 border-slate-500 hidden md:block bg-white text-black mb-2 md:mb-0 py-2 w-full text-center mt-4 rounded-[5px]"
            onClick={handleGoBack}
          >
            Go back
          </button>
          <button
            className="border-2 border-accent bg-white text-black mb-2 md:mb-0 py-2 w-full text-center mt-4 rounded-[5px]"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
        <CustomButton
          callback={handleSubmit}
          styles="bg-accent mr-4 text-white py-2 w-full text-center mt-auto rounded-[5px]"
          title="Apply filters"
        />
      </div>
      <button onClick={()=> setIsFilterBarVisible(!isFilterBarVisible)} className="absolute block md:hidden bg-accent p-4 rounded-full bottom-2 left-2 z-50">
        <FaFilter style={{ color: "white" }} />
      </button> 
    </>
  );
};

export default FilterBar;
