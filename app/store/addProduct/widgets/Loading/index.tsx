import { Colors } from "@/constants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none backdrop-blur-sm bg-[#ffffff6f] z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4 animate-spin">
          <AiOutlineLoading3Quarters
            style={{ color: Colors.ACCENT, fontSize: 38 }}
          />
        </div>
        <h1 className="font-primary text-2xl">Adding product....</h1>
      </div>
    </div>
  );
};

export default Loading;
