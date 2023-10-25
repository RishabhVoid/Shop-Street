"use client";

import useHandleOrders from "../../hooks/useHandleOrders";
import Header from "../../widgets/Header";
import OrderView from "../../widgets/OrderView";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Orders = () => {
  const { orders, getProductsByIds, pageLoading } = useHandleOrders();

  return (
    <div className="h-[100vh] flex flex-col overflow-hidden">
      <Header title="My Orders" />
      <div className="w-full h-full pt-4 relative">
        {pageLoading && (
          <div className="absolute z-[1010] top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center animate-spin">
                <AiOutlineLoading3Quarters style={{ fontSize: 28 }} />
              </div>
              <h2 className="font-primary text-[1rem] md:text-[2rem] ml-2">
                Getting orders data...
              </h2>
            </div>
          </div>
        )}
        <div className="w-full h-full overflow-x-hidden overflow-y-auto custom_scroll pb-[8rem]">
          {orders &&
            orders.map((order) => (
              <OrderView
                key={order._id}
                order={order}
                getProductsByIds={getProductsByIds}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
