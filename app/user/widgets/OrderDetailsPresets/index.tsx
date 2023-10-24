import CustomButton from "@/components/CustomButton";
import { UserType } from "@/types";
import InputSection from "./InputSection";
import Preset from "./Preset";

interface Props {
  address: string;
  setAddress: (address: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNo: string;
  setPhoneNo: (email: string) => void;
  handleAddOrderDetailPreset: () => void;
  handleDeleteOrderDetailPreset: (id: string) => void;
  userData: UserType | undefined;
}

const OrderDetailsPresets = ({
  address,
  setAddress,
  email,
  setEmail,
  phoneNo,
  setPhoneNo,
  handleAddOrderDetailPreset,
  userData,
  handleDeleteOrderDetailPreset,
}: Props) => {
  return (
    <div className="w-full mb-[4rem] flex flex-col">
      <h1 className="text-2xl p-4 w-full mt-8 mb-4 font-primary max-w-[67rem] mx-auto">
        Add order detail preset
      </h1>
      <div className="flex items-center flex-wrap mx-auto gap-2 items-center justify-center">
        <InputSection
          type="text"
          label="Address"
          placeholder="address..."
          value={address}
          setValue={setAddress}
        />
        <InputSection
          type="email"
          label="Contact email"
          placeholder="email of reciever..."
          value={email}
          setValue={setEmail}
        />
        <InputSection
          type="number"
          label="Contact ph"
          placeholder="number of reciever..."
          value={phoneNo}
          setValue={setPhoneNo}
        />
        <div className="w-full flex justify-center">
          <CustomButton
            callback={handleAddOrderDetailPreset}
            title="Submit"
            type="submit"
            styles={`px-2 py-4 w-[300px] ${
              userData === undefined && "bg-slate-500 pointer-events-none"
            }`}
          />
        </div>
      </div>
      <h1 className="text-2xl p-4 w-full mt-8 mb-4 font-primary max-w-[67rem] mx-auto">
        Order detail presets
      </h1>
      <div className="flex flex-col items-center w-full gap-2">
        {userData &&
          userData.orderDetailOptions.map((detail) => (
            <Preset
              detail={detail}
              handleDeleteOrderDetailPreset={handleDeleteOrderDetailPreset}
              key={detail._id}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderDetailsPresets;
