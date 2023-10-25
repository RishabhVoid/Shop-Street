import { TbBusinessplan } from "react-icons/tb";
import Card from "./Card";
import { StoreType } from "@/types";
import useGetAverageStorePrice from "../../hooks/useGetAverageStorePrice";
import useGetOrders from "../../hooks/useGetOrders";

interface Props {
  store: StoreType | undefined;
}

const BusinessOverview = ({ store }: Props) => {
  const { storeAvg } = useGetAverageStorePrice(store?._id);
  const { orders } = useGetOrders();

  return (
    <div className="mt-2 w-full px-4 flex flex-col">
      <div className="w-full flex items-center">
        <TbBusinessplan style={{ fontSize: 24 }} />
        <h1 className="font-primary ml-6">Business overview</h1>
      </div>
      <div className="w-full flex flex flex-wrap justify-evenly items-center gap-2 my-4">
        <Card
          img="/icons/box.png"
          imgColor="#ebf0ff"
          title={`${store?.productIds.length || 0} Items`}
          specialTitle="Products your shop avails."
        />
        <Card
          img="/icons/average.png"
          imgColor="#fff8e7"
          title={`$${storeAvg}`}
          specialTitle="Average product price."
        />
        <Card
          img="/icons/money.png"
          imgColor="#feedf3"
          title={`${orders.length} Orders`}
          specialTitle="Total orders from your shop."
        />
      </div>
    </div>
  );
};

export default BusinessOverview;
