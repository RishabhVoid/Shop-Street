"use client";

import Header from "@/app/user/widgets/Header";
import Form from "./widgets/Form";
import ItemsList from "./widgets/ItemsList";
import useHandleOrder from "./hooks/useHandleOrders";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  params: {
    prodIds: string;
  };
}

const PlaceOrder = ({ params }: Props) => {
  const {
    orderTotal,
    userData,
    address,
    setAddress,
    email,
    setEmail,
    phoneNo,
    setPhoneNo,
    productsData,
    handleAddOrder,
    setPreset,
    changeProductAmount,
    isProcessing,
  } = useHandleOrder(params.prodIds);

  const increaseProdAmount = (id: string) => {
    changeProductAmount(id, "INC");
  };

  const decreaseProdAmount = (id: string) => {
    changeProductAmount(id, "DEC");
  };

  return (
    <div className="h-full max_contain flex flex-col">
      <Header title="Place your order" goBack />
      <div className="h-full relative flex flex-wrap overflow-x-hidden overflow-y-auto md:custom_scroll no_pad_scroll">
        {isProcessing && (
          <div className="backdrop-blur-sm z-[1000] absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center animate-spin">
                <AiOutlineLoading3Quarters style={{ fontSize: "2rem" }} />
              </div>
              <h1 className="font-primary ml-2 text-xl md:text-[2rem]">
                Placing order...
              </h1>
            </div>
          </div>
        )}
        <Form
          address={address}
          email={email}
          phoneNo={phoneNo}
          handleAddOrder={handleAddOrder}
          setAddress={setAddress}
          setEmail={setEmail}
          setPhoneNo={setPhoneNo}
          setPreset={setPreset}
          userData={userData}
          orderTotal={orderTotal}
        />
        <ItemsList
          orderTotal={orderTotal}
          products={productsData}
          userData={userData}
          decreaseProdAmount={decreaseProdAmount}
          increaseProdAmount={increaseProdAmount}
        />
      </div>
    </div>
  );
};

export default PlaceOrder;
