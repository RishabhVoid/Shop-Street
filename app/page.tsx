import getFrontPageProducts from "@/lib/getFrontPageProducts";
import Header from "./widgets/Header";
import SuffledItemView from "./widgets/ShuffledItemView";

const App = async () => {
  const products = await getFrontPageProducts();

  return (
    <main className="w-full h-full overflow-x-hidden overflow-y-auto no_pad_scroll">
      <Header />
      <SuffledItemView products={products.slice(0, 12)} />
    </main>
  );
};

export default App;
