import Link from "next/link";

const OrderSuccess = () => {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <img
        src="/svgs/order_got.svg"
        className="max-w-[40rem]"
        alt="Order received"
      />
      <h1 className="font-primary text-2xl">Order received</h1>
      <Link
        href="/"
        replace
        className="bg-[--primary-accent] text-white px-2 py-4 rounded-[5px] mt-2"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default OrderSuccess;
