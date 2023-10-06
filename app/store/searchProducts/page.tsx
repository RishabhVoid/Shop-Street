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
  const [products, setProducts] = useState<ProductType[]>([]);
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();

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

  const getProducts = async (
    pageNo: number,
    searchQuery: string,
    categories: string[],
    priceMin: number,
    priceMax: number,
    sellerEmail: string
  ) => {
    const rawRes = await fetch(
      `/api/product?pageNo=${pageNo}&searchQuery=${searchQuery}&categories=${categories.join(
        "_"
      )}&priceMin=${priceMin}&priceMax=${priceMax}&sellerEmail=${sellerEmail}`,
      {
        cache: "no-store",
      }
    );

    const jsonData = await rawRes.json();

    if (jsonData.status === ResponseCodes.INVALID_CREDENTIALS) {
      toast({
        title: "Seller wasn't found",
        description:
          "Your account wasn't recognized whilst fetching the products, please relogin from the home page.",
      });
    } else if (jsonData.status === ResponseCodes.CONDITIONS_MISMATCHED) {
      toast({
        title: "A seller impersonator!?",
        description: "Your account isn't registed as a seller!",
      });
    } else if (jsonData.status === ResponseCodes.SUCCESS) {
      const products = sortProducts(
        filters.sortBy,
        filters.order,
        jsonData.data.products as ProductType[]
      );
      setProducts(products);
      setTotalProducts(jsonData.data.totalProducts as number);
    } else if (jsonData.status === ResponseCodes.NOT_FOUND) {
      toast({
        title: "Couldn't find any matching data!",
        description:
          "No products matched the filters or page number you requested!",
      });
      setProducts(jsonData.data.products as ProductType[]);
    } else if (jsonData.status === ResponseCodes.UNKNOWN_ERROR) {
      toast({
        title: "The dog stepped on a bee!!",
        description:
          "The products couldn't be loaded due to an internal error! We apologize for any inconveniences, please try in a moment!",
      });
    }

    setAreProductsLoaded(true);
  };

  const nextPage = () => {
    setFilters((filters) => ({ ...filters, pageNo: filters.pageNo + 1 }));
  };

  const prevPage = () => {
    if (filters.pageNo <= 1) return;
    setFilters((filters) => ({ ...filters, pageNo: filters.pageNo - 1 }));
  };

  useEffect(() => {
    if (loading || !user || !user.email) return;
    setAreProductsLoaded(false);
    (async () =>
      await getProducts(
        filters.pageNo,
        filters.searchQuery,
        filters.categories,
        filters.priceMin,
        filters.priceMax,
        user.email || ""
      ))();
  }, [
    loading,
    user,
    filters.pageNo,
    filters.categories.length,
    filters.priceMin,
    filters.priceMax,
    filters.searchQuery,
  ]);

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
              <SheetTrigger className="bg-accent text-sm md:text-1xl p-3 rounded-full text-white">
                <FaFilter />
              </SheetTrigger>
            </div>
          </div>
          {areProductsLoaded ? (
            <div className="flex-1 flex flex-wrap pb-[4rem] md:pb-4 items-center w-full justify-center pt-4 relative overflow-x-hidden overflow-y-auto custom_scroll">
              {filteredProducts.length !== 0 ? (
                filteredProducts.map((product) => (
                  <Product product={product} key={product._id} inSellerView />
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
                  className="bg-accent p-4 rounded-full"
                >
                  <AiFillCaretLeft style={{ color: "white" }} />
                </button>
                <h1 className="font-primary mx-4">Page : {filters.pageNo}</h1>
                {filteredProducts.length !== 0 && (
                  <button
                    onClick={nextPage}
                    className="bg-accent p-4 rounded-full"
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
