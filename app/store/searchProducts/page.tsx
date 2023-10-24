"use client";

import ProductSortDrawer from "@/components/ProductSortDrawer";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useMemo, useState } from "react";
import { ProductType, SearchFilters } from "@/types";
import { Colors, MaxPrices, MinPrices, ResponseCodes } from "@/constants";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import Product from "@/components/Product";
import sortProducts from "@/lib/sortProducts";
import useGetShopItems from "./hooks/useGetShopItems";

const SearchProducts = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    pageNo: 1,
    searchQuery: "",
    categories: [],
    priceMin: MinPrices[0],
    priceMax: MaxPrices.reverse()[0],
    sortBy: "price",
    order: "high-to-low",
  });

  const { products, loading, user, totalProducts, areProductsLoaded } =
    useGetShopItems(filters);

  const filteredProducts = useMemo(() => {
    return sortProducts(filters.sortBy, filters.order, products);
  }, [
    areProductsLoaded,
    products.length,
    loading,
    user,
    filters.pageNo,
    filters.categories.length,
    filters.priceMin,
    filters.priceMax,
    filters.searchQuery,
    filters.sortBy,
    filters.order,
  ]);

  const nextPage = () => {
    setFilters((filters) => ({ ...filters, pageNo: filters.pageNo + 1 }));
  };

  const prevPage = () => {
    if (filters.pageNo <= 1) return;
    setFilters((filters) => ({ ...filters, pageNo: filters.pageNo - 1 }));
  };

  return (
    <Sheet>
      <div className="w-full md:h-full flex-1 relative flex overflow-hidden">
        <div className="absolute flex flex-col items-center top-0 left-0 w-full h-[100vh]">
          <div className="w-full h-[3.5rem] p-8 flex items-center justify-between border-b border-slate-400">
            <h1 className="font-primary text-2xl flex">Products</h1>
            <div className="flex items-center gap-2  ml-auto mr-8">
              <div className="flex items-center">
                <h2 className="mr-2">
                  {filteredProducts.length} of {totalProducts}
                </h2>
                <BsFillBoxSeamFill
                  style={{
                    color: Colors.ACCENT,
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div className="flex w-auto justify-between">
              <SheetTrigger className="bg-[--primary-accent] text-sm md:text-1xl p-3 rounded-full text-white">
                <FaFilter />
              </SheetTrigger>
            </div>
          </div>
          {areProductsLoaded ? (
            <div className="flex-1 flex flex-wrap pb-[4rem] md:pb-4 items-center w-full justify-center pt-4 relative overflow-x-hidden overflow-y-auto custom_scroll">
              {filteredProducts.length !== 0 ? (
                filteredProducts.map((product) => (
                  <Product product={product} key={product._id} />
                ))
              ) : (
                <div className="w-[90%] max-w-[30rem] flex flex-col items-center">
                  <img
                    src="/svgs/no_data.svg"
                    className="w-full"
                    alt="no data"
                  />
                  <h1 className="font-primary text-2xl">No data found</h1>
                </div>
              )}
              <div className="w-[90%] mx-auto h-[4rem] mt-4 flex items-center justify-center">
                <button
                  onClick={prevPage}
                  className="bg-[--primary-accent] p-4 rounded-full"
                >
                  <AiFillCaretLeft style={{ color: "white" }} />
                </button>
                <h1 className="font-primary mx-4">Page : {filters.pageNo}</h1>
                {filteredProducts.length !== 0 && (
                  <button
                    onClick={nextPage}
                    className="bg-[--primary-accent] p-4 rounded-full"
                  >
                    <AiFillCaretRight style={{ color: "white" }} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center justify-center animate-spin">
                <AiOutlineLoading3Quarters style={{ fontSize: 32 }} />
              </div>
              <h1 className="text-2xl ml-4">Getting products data...</h1>
            </div>
          )}
        </div>
        <ProductSortDrawer isClientComponent setFilters={setFilters} />
      </div>
    </Sheet>
  );
};

export default SearchProducts;
