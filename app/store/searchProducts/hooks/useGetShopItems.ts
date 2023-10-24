import { useToast } from "@/components/ui/use-toast";
import { MaxPrices, MinPrices, ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import sortProducts from "@/lib/sortProducts";
import { ProductType, SearchFilters } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const getProducts = async (
  pageNo: number,
  searchQuery: string,
  categories: string[],
  priceMin: number,
  priceMax: number,
  sellerEmail: string,
  popUp: (title: string, description: string) => void,
  filters: SearchFilters,
  setProducts: (products: ProductType[]) => void,
  setAreProductsLoaded: (condition: boolean) => void,
  setTotalProducts: (numberOfProducts: number) => void
) => {
  const rawRes = await fetch(
    `/api/sellerShop?pageNo=${pageNo}&searchQuery=${searchQuery}&categories=${categories.join(
      "_"
    )}&priceMin=${priceMin}&priceMax=${priceMax}&sellerEmail=${sellerEmail}`,
    {
      cache: "no-store",
    }
  );

  const jsonData = await rawRes.json();

  if (jsonData.status === ResponseCodes.INVALID_CREDENTIALS) {
    popUp(
      "Seller wasn't found",
      "Your account wasn't recognized whilst fetching the products, please relogin from the home page."
    );
  } else if (jsonData.status === ResponseCodes.CONDITIONS_MISMATCHED) {
    popUp(
      "A seller impersonator!?",
      "Your account isn't registed as a seller!"
    );
  } else if (jsonData.status === ResponseCodes.SUCCESS) {
    const products = sortProducts(
      filters.sortBy,
      filters.order,
      jsonData.data.products as ProductType[]
    );
    setProducts(products);
    setTotalProducts(jsonData.data.totalProducts as number);
  } else if (jsonData.status === ResponseCodes.NOT_FOUND) {
    popUp(
      "Couldn't find any matching data!",
      "No products matched the filters or page number you requested!"
    );
    setProducts(jsonData.data.products as ProductType[]);
  } else if (jsonData.status === ResponseCodes.UNKNOWN_ERROR) {
    popUp(
      "The dog stepped on a bee!!",
      "The products couldn't be loaded due to an internal error! We apologize for any inconveniences, please try in a moment!"
    );
  }

  setAreProductsLoaded(true);
};

const useGetShopItems = (filters: SearchFilters) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [areProductsLoaded, setAreProductsLoaded] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();

  const popUp = (title: string, description: string) => {
    toast({
      title,
      description,
    });
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
        user.email || "",
        popUp,
        filters,
        setProducts,
        setAreProductsLoaded,
        setTotalProducts
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

  return {
    products,
    loading,
    user,
    totalProducts,
    areProductsLoaded,
  };
};

export default useGetShopItems;
