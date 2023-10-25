import { BsBagDash } from "react-icons/bs";
import useGetOrders from "../../hooks/useGetOrders";
import OrderView from "@/app/user/widgets/OrderView";

const OrdersList = () => {
  const { orders, getProductsByIds } = useGetOrders();

  return (
    <div className="mt-2 w-full px-4 flex flex-col h-auto">
      <div className="w-full flex items-center">
        <BsBagDash style={{ fontSize: 24 }} />
        <h1 className="font-primary ml-6">Orders</h1>
      </div>
      <div className="w-full flex flex flex-wrap justify-evenly items-center gap-2 my-4">
        {orders &&
          orders.map((order) => (
            <OrderView
              getProductsByIds={getProductsByIds}
              order={order}
              key={order._id}
            />
          ))}
      </div>
    </div>
  );
};

export default OrdersList;
