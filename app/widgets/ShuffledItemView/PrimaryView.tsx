import ViewerProductView from "@/components/ViewerProductView";
import { ProductType } from "@/types";

interface Props {
  inverted?: boolean;
  products: ProductType[];
}

const PrimaryView = ({ inverted = false, products }: Props) => {
  return (
    <div
      className={`w-full min-h-[30rem] md:p-4 p-0 flex flex-col ${
        inverted ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex lg:flex-col flex-row flex-wrap md:w-[60%] w-full md:h-[30rem] h-[600px]">
        <div className="relative min-w-[170px] lg:w-1/3 w-1/2 lg:h-full h-1/2">
          <ViewerProductView product={products[0]} />
        </div>
        <div className="relative min-w-[170px] lg:w-1/3 w-1/2 h-1/2">
          <ViewerProductView product={products[1]} />
        </div>
        <div className="relative min-w-[170px] lg:w-1/3 w-1/2 h-1/2">
          <ViewerProductView product={products[2]} />
        </div>
        <div className="relative min-w-[170px] lg:w-1/3 w-1/2 lg:h-full h-1/2">
          <ViewerProductView product={products[3]} />
        </div>
      </div>
      <div className="flex md:flex-col flex-row h-[300px] md:flex-1 md:h-auto md:w-[40%] w-full">
        <div className="relative min-w-[170px] flex-1">
          <ViewerProductView product={products[4]} />
        </div>
        <div className="relative min-w-[170px] flex-1">
          <ViewerProductView product={products[5]} />
        </div>
      </div>
    </div>
  );
};

export default PrimaryView;
