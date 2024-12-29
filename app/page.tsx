import getFrontPageProducts from "@/lib/getUnfinteredItemsSection";
import Header from "./widgets/Header";
import ShuffledItemView from "./widgets/ShuffledItemView";
import BoxedItemView from "./widgets/BoxedItemView";
import getSlicedProducts from "@/lib/getSlicedProducts";
import LoadMore from "./widgets/LoadMore";
import { Fragment } from "react";
import Footer from "./widgets/Footer";

interface Props {
  searchParams: {
    skip: string;
  };
}

const App = async ({ searchParams }: Props) => {
  let skipAmount = 0;

  if (searchParams.skip) {
    try {
      skipAmount = parseInt(searchParams.skip);
    } catch {}
  }

  const products = await getFrontPageProducts(skipAmount);
  const lastChunkValid = products?.reverse()?.[0]?.length >= 20;

  return (
    <main className="w-full h-full max_contain overflow-x-hidden overflow-y-auto no_pad_scroll">
      <Header />
      {products.map((chunk, index) => (
        <Fragment key={index * 2}>
          {chunk.length >= 20 && (
            <>
              <ShuffledItemView products={getSlicedProducts(0, 12, chunk)} />
              <BoxedItemView products={getSlicedProducts(12, 20, chunk)} />
            </>
          )}
        </Fragment>
      ))}
      <LoadMore skip={skipAmount} lastChunkValid={lastChunkValid} />
      <Footer />
    </main>
  );
};

export default App;
