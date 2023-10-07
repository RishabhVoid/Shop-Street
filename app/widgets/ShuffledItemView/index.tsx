import { ProductType } from "@/types";
import PrimaryView from "./PrimaryView";

interface Props {
  products: ProductType[];
}

const SuffledItemView = ({ products }: Props) => {
  return (
    <>
      <PrimaryView products={products.slice(0, 6)} />
      <PrimaryView inverted products={products.slice(6, 12)} />
    </>
  );
};

export default SuffledItemView;
