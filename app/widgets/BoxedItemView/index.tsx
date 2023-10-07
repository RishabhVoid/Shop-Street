import ViewerProductView from "@/components/ViewerProductView";
import { ProductType } from "@/types";

interface Props {
  products: ProductType[];
}

const BoxedItemView = ({ products }: Props) => {
  return (
    <div className="md:p-4 p-0 w-full flex flex-wrap items-center justify-center">
      {products.map((product: ProductType) => (
        <div
          key={product._id}
          className="relative min-w-[170px] w-[100%] md:w-[200px] h-[300px]"
        >
          <ViewerProductView willBeHorizontle product={product} />
        </div>
      ))}
    </div>
  );
};

export default BoxedItemView;
