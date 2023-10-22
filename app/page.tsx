import getFrontPageProducts from "@/lib/getFrontPageProducts";
import Header from "./widgets/Header";
import SuffledItemView from "./widgets/ShuffledItemView";
import BoxedItemView from "./widgets/BoxedItemView";
import { ProductType } from "@/types";

// Front page only consists of 100 item for now, given the lack of data to show,

const App = async () => {
  const products = await getFrontPageProducts();

  const getSlicedProducts = (start: number, end: number): ProductType[] => {
    return products.slice(start, end);
  };

  return (
    <main className="w-full h-full max_contain overflow-x-hidden overflow-y-auto no_pad_scroll">
      <Header />
      <SuffledItemView products={getSlicedProducts(0, 12)} /> {/* 12 items */}
      <BoxedItemView products={getSlicedProducts(12, 20)} /> {/* 8 items */}
      {/* Total 20 till now */}
      <SuffledItemView products={getSlicedProducts(20, 32)} /> {/* 12 items */}
      <BoxedItemView products={getSlicedProducts(32, 50)} /> {/* 18 items */}
      {/* Total 50 till now */}
      <SuffledItemView products={getSlicedProducts(50, 62)} /> {/* 12 items */}
      <SuffledItemView products={getSlicedProducts(62, 74)} /> {/* 12 items */}
      {/* Above two get 24 items */}
      <BoxedItemView products={getSlicedProducts(74, 100)} /> {/* 18 items */}
      {/* Total 100 items */}
    </main>
  );
};

export default App;
