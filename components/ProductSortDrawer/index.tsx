"use client";

import SearchBar from "./SearchBar";
import PriceRangeSelector from "./PriceRangeSelector";
import CategoryChooser from "./CategoryChooser";
import RatingSorter from "./RatingSorter";
import InventorySorter from "./InventorySorter";
import DeliveryDistanceSorter from "./DeliveryDistanceSorter";
import DeliveryDaySorter from "./DeliveryDaySorter";
import PriceSorter from "./PriceSorter";
import updateSearchParams from "@/lib/updateSearchParams";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchFilters } from "@/types";
import { MaxPrices, MinPrices } from "@/constants";

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
  const [priceHighToLow, setPriceHighToLow] = useState(true);
  const [ratingHighToLow, setRatingHighToLow] = useState(true);
  const [inventoryHighToLow, setInventoryHighToLow] = useState(true);
  const [distanceHighToLow, setDistanceHighToLow] = useState(true);
  const [daysHighToLow, setDaysHighToLow] = useState(true);

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
        priceHighToLow: priceHighToLow,
        ratingHighToLow: ratingHighToLow,
        inventoryHighToLow: inventoryHighToLow,
        distanceHighToLow: distanceHighToLow,
        daysHighToLow: daysHighToLow,
      }));
      return;
    }
    const searchUrl = updateSearchParams(
      [
        "query",
        "minPrice",
        "maxPrice",
        "categories",
        "priceHighToLow",
        "ratingHighToLow",
        "inventoryHighToLow",
        "distanceHighToLow",
        "daysHighToLow",
      ],
      [
        searchTerm,
        String(minPrice),
        String(maxPrice),
        categories.join("%20"),
        String(priceHighToLow),
        String(ratingHighToLow),
        String(inventoryHighToLow),
        String(distanceHighToLow),
        String(daysHighToLow),
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
        priceHighToLow: true,
        ratingHighToLow: true,
        daysHighToLow: false,
        distanceHighToLow: false,
        inventoryHighToLow: true,
      }));
      return;
    }
    router.replace(`/store/searchProducts?page=${pageNo}`);
  };

  return (
    <SheetContent className="bg-white w-[90%] sm:w-[30rem] p-2">
      <div className="h-full overflow-y-auto flex-col pt-4 custom_scroll">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PriceRangeSelector
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <CategoryChooser
          categories={categories}
          setCategories={setCategories}
        />
        <PriceSorter
          highToLow={priceHighToLow}
          setHighToLow={setPriceHighToLow}
        />
        <RatingSorter
          highToLow={ratingHighToLow}
          setHighToLow={setRatingHighToLow}
        />
        <InventorySorter
          highToLow={inventoryHighToLow}
          setHighToLow={setInventoryHighToLow}
        />
        <DeliveryDistanceSorter
          highToLow={distanceHighToLow}
          setHighToLow={setDistanceHighToLow}
        />
        <DeliveryDaySorter
          highToLow={daysHighToLow}
          setHighToLow={setDaysHighToLow}
        />
        <div className="flex">
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
