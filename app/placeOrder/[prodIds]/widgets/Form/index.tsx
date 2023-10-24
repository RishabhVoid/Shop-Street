import CustomButton from "@/components/CustomButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { UserType } from "@/types";

interface Props {
  userData: UserType | null;
  setPreset: (preset: string) => void;
  handleAddOrder: () => void;
  email: string;
  phoneNo: string;
  address: string;
  setEmail: (email: string) => void;
  setAddress: (email: string) => void;
  setPhoneNo: (email: string) => void;
  orderTotal: number;
}

const Form = ({
  userData,
  setPreset,
  handleAddOrder,
  setEmail,
  setAddress,
  setPhoneNo,
  email,
  phoneNo,
  address,
  orderTotal,
}: Props) => {
  const notEnoughBalance = orderTotal > (userData?.money || 0);

  return (
    <div className="h-full flex mx-auto md:p-8">
      <div className="h-[86%] w-[2rem] block flex-col items-center hidden md:flex">
        <span className="bg-[--primary-accent] block h-[50px] w-[50px] rounded-full" />
        <span className="bg-[--primary-accent] flex-1 w-[3px] rounded-[2px] relative -top-[25px]" />
      </div>
      <div className="flex flex-col ml-0 p-0 mx-auto md:ml-4 md:p-4 pt-4">
        <h1 className="font-primary text-2xl mb-4">Place your order</h1>
        <div className="mb-2">
          <Select onValueChange={(value) => setPreset(value)}>
            <SelectTrigger className="bg-[--primary-accent] border-0 text-white">
              Choose preset
            </SelectTrigger>
            <SelectContent className="bg-white rounded-[5px] w-[300px]">
              {userData &&
                userData.orderDetailOptions.map((preset, index) => (
                  <SelectItem key={index * 10} value={JSON.stringify(preset)}>
                    <h2>{preset.address}</h2>
                    <h2>{preset.phoneNo}</h2>
                    <h2>{preset.email}</h2>
                  </SelectItem>
                ))}
              <SelectItem
                value={JSON.stringify({
                  address: "",
                  phoneNo: "",
                  email: "",
                })}
              >
                <h2>Clear</h2>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col mb-2">
          <label className="text-lg">Contact email</label>
          <input
            type="email"
            placeholder="Contact email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="px-2 w-[300px] py-4 bg-slate-200 outline-[--primary-accent]"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="text-lg">Contact number</label>
          <input
            type="number"
            placeholder="Contact number..."
            value={phoneNo}
            onChange={(event) => setPhoneNo(event.target.value)}
            className="px-2 w-[300px] py-4 bg-slate-200 outline-[--primary-accent]"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="text-lg">Address</label>
          <textarea
            placeholder="Delivery address..."
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="px-2 w-[300px] resize-none h-[10rem] py-4 bg-slate-200 outline-[--primary-accent]"
          />
        </div>
        <CustomButton
          title="Place order"
          styles="py-4"
          callback={handleAddOrder}
          disabled={notEnoughBalance}
        />
      </div>
    </div>
  );
};

export default Form;
