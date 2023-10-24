import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FallBack = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex items-center">
        <div className="flex items-center justify-center animate-spin">
          <AiOutlineLoading3Quarters style={{ fontSize: "2rem" }} />
        </div>
        <h1 className="font-primary ml-2 text-xl md:text-[2rem]">
          Getting products...
        </h1>
      </div>
    </div>
  );
};

export default FallBack;
