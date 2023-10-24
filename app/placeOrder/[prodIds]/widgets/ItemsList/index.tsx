import { UserType } from "@/types";
import { ProductsData } from "../../hooks/useHandleOrders";
import Counter from "./Counter";

interface Props {
  products: ProductsData[];
  orderTotal: number;
  userData: UserType | null;
  increaseProdAmount: (id: string) => void;
  decreaseProdAmount: (id: string) => void;
}

const ItemsList = ({
  products,
  orderTotal,
  userData,
  increaseProdAmount,
  decreaseProdAmount,
}: Props) => {
  return (
    <div className="h-full mx-auto md:p-8">
      <h1 className="w-full mb-4 font-primary text-2xl">Items</h1>
      <div className="flex flex-col w-[300px] overflow-x-hidden overflow-y-auto no_pad_scroll">
        {products.length !== 0 &&
          products.map((productData) => (
            <div
              key={productData.product._id}
              className="w-[300px] flex flex-col border-b-2 mb-2 border-b-slate-300"
            >
              <div className="flex items-center justify-between w-full">
                <h2>{productData.product.title}</h2>
                <h2 className="ml-2">
                  {productData.product.price * productData.amount}$
                </h2>
              </div>
              <Counter
                amount={productData.amount}
                prodId={productData.product._id}
                increaseProdAmount={increaseProdAmount}
                decreaseProdAmount={decreaseProdAmount}
              />
            </div>
          ))}
        <div className="w-[300px] flex items-center justify-between border-b-2 mb-2 border-b-slate-500">
          <h2>Total</h2>
          <h2 className="ml-2">{orderTotal}$</h2>
        </div>
        <h2 className="ml-auto">
          {orderTotal > (userData?.money || 0) && "Not enough balance"}
        </h2>
      </div>
    </div>
  );
};

export default ItemsList;
