import { OrderDetails } from "@/types";

interface Props {
  detail: OrderDetails;
  handleDeleteOrderDetailPreset: (id: string) => void;
}

const Preset = ({ detail, handleDeleteOrderDetailPreset }: Props) => {
  return (
    <div className="flex flex-col py-4 w-[90%] max-w-[80rem] mx-auto px-6 rounded-[5px] h-fit shadow-md shadow-slate-400">
      <div className="mb-2">
        <h2 className="text-xl">Address</h2>
        <p className="rounded-[5px]">{detail.address}</p>
      </div>
      <div className="mb-2">
        <h2 className="text-xl">Email</h2>
        <p className="rounded-[5px]">{detail.email}</p>
      </div>
      <div className="mb-2">
        <h2 className="text-xl">Phone No</h2>
        <p className="rounded-[5px]">{detail.phoneNo}</p>
      </div>
      <button
        className="mt-4 bg-red-600 w-fit px-4 py-2 rounded-[5px] text-white"
        onClick={() => handleDeleteOrderDetailPreset(detail._id.toString())}
      >
        Delete
      </button>
    </div>
  );
};

export default Preset;
