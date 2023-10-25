import { OrderType, ProductType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import AddressInfo from "./AddressInfo";
import ViewerProductView from "@/components/ViewerProductView";

interface Props {
  order: OrderType;
  getProductsByIds: (ids: string) => Promise<ProductType[]>;
}

const OrderView = ({ order, getProductsByIds }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const setProductsData = async (idsString: string) => {
    const prods = await getProductsByIds(idsString);
    setProducts(prods);
  };

  const getProductAmount = (id: string) => {
    let amount = 0;
    order.products.map((product) => {
      if (product.productId === id) {
        amount = product.amount;
      }
    });
    return amount;
  };

  const totalAmount = useMemo(() => {
    let total = 0;
    if (!products.length) return;
    products.map((product) => {
      total += product.price * getProductAmount(product._id);
    });

    return total;
  }, [order.address, products.length]);

  useEffect(() => {
    const ids = order.products.map((productData) => {
      return productData.productId;
    });
    const idsString = ids.join("__");
    (async () => await setProductsData(idsString))();
  }, [order.address]);

  return (
    <div className="w-[98%] mx-auto mb-4">
      <AddressInfo
        address={order.address}
        email={order.email}
        phoneNo={order.phoneNo}
        placedOn={order.placedOn}
        totalAmount={totalAmount}
      />
      <div className="w-full flex flex-wrap">
        {products &&
          products.map((product) => (
            <div className="relative w-[170px] h-[300px]" key={product._id}>
              <span className="absolute min-w-[30px] w-fit p-2 h-[30px] rounded-full bg-[--primary-accent] text-white flex items-center justify-center z-[1000] top-2 left-2">
                X{getProductAmount(product._id)}
              </span>
              <ViewerProductView product={product} willBeHorizontle />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderView;
