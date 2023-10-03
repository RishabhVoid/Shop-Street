import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MaxPrices, MinPrices } from "@/constants";

interface Props {
  priceRange: {
    min: number;
    max: number;
  };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{
      min: number;
      max: number;
    }>
  >;
}

const PriceRangeSelector = ({ priceRange, setPriceRange }: Props) => {
  const setMax = (max: number) => {
    setPriceRange((priceRange) => ({
      min: priceRange.min,
      max: max,
    }));
  };
  const setMin = (min: number) => {
    setPriceRange((priceRange) => ({
      min: min,
      max: priceRange.max,
    }));
  };

  return (
    <div className="mb-4">
      <label htmlFor="search_product" className="mb-1 font-primary">
        Pricing range MIN-MAX
      </label>
      <div className="w-full flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-accent w-1/2 text-white py-1 mr-1 rounded-[5px]">
            {priceRange.min === 0 ? "MIN" : priceRange.min}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-[5px] overflow-y-scroll custom_scroll">
            {MinPrices.map((price) => (
              <DropdownMenuItem key={price} onClick={() => setMin(price)}>
                {price}$
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-accent w-1/2 text-white py-1 mr-1 rounded-[5px]">
            {priceRange.max === 100_000 ? "Max" : priceRange.max}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-[5px] overflow-y-scroll custom_scroll">
            {MaxPrices.map((price) => (
              <DropdownMenuItem key={price} onClick={() => setMax(price)}>
                {price}$
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
