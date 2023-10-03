import React, { useEffect } from "react";
import CustomButton from "../CustomButton";

interface Props {
  highToLow: boolean;
  setHighToLow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryDaySorter = ({ highToLow, setHighToLow }: Props) => {
  const setPriceHighToLow = () => {
    setHighToLow(true);
  };
  const setPriceLowToHigh = () => {
    setHighToLow(false);
  };

  return (
    <div className="mb-4">
      <h1 className="font-primary">Delivery days sorter</h1>
      <div className="flex justify-evenly items-center">
        <CustomButton
          title="High to Low"
          styles={`mr-2 text-[.9rem] ${
            !highToLow && "bg-gray-500 text-slate-200"
          }`}
          callback={setPriceHighToLow}
        />
        <CustomButton
          title="Low to High"
          styles={`text-[.9rem] ${highToLow && "bg-gray-500 text-slate-200"}`}
          callback={setPriceLowToHigh}
        />
      </div>
    </div>
  );
};

export default DeliveryDaySorter;
