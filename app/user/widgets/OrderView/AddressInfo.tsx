interface Props {
  address: string;
  email: string;
  phoneNo: string;
  placedOn: string;
  totalAmount: number | undefined;
}

const AddressInfo = ({
  address,
  email,
  phoneNo,
  placedOn,
  totalAmount,
}: Props) => {
  return (
    <div className="w-full p-2 rounded-[5px] bg-slate-100 flex flex-col mb-2">
      <div className="w-full rounded-[5px] bg-slate-100 flex">
        <div className="flex-1 flex flex-col">
          <h2 className="text-sm mb-2">Delivery to: {address}</h2>
          <h2 className="text-sm">Contact no: {phoneNo}</h2>
        </div>
        <div className="flex flex-col text-sm ml-2">
          <h2>Ordered on</h2>
          <h2>{placedOn.replaceAll("-", "/")}</h2>
        </div>
      </div>
      <h2 className="text-sm">Contact email: {email}</h2>
      <h2 className="mt-2 text-red-600 font-primary font-bold">
        Total amount: ${totalAmount || 0}
      </h2>
    </div>
  );
};

export default AddressInfo;
