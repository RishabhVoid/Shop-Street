interface Props {
  amount: number;
  prodId: string;
  increaseProdAmount: (id: string) => void;
  decreaseProdAmount: (id: string) => void;
}

const Counter = ({
  amount,
  prodId,
  increaseProdAmount,
  decreaseProdAmount,
}: Props) => {
  return (
    <div className="flex w-full px-2 py-4">
      <button
        onClick={() => decreaseProdAmount(prodId)}
        className="bg-[--primary-accent] cursor-pointer w-[30px] h-[30px] flex items-center justify-center font-primary text-xl text-white rounded-full"
      >
        -
      </button>
      <h1 className="font-primary mx-4">{amount}</h1>
      <button
        onClick={() => increaseProdAmount(prodId)}
        className="bg-[--primary-accent] cursor-pointer w-[30px] h-[30px] flex items-center justify-center font-primary text-xl text-white rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
