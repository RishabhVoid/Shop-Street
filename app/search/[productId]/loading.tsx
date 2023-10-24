import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Loading = () => {
  return (
    <div className="w-full flex flex-col h-full max_contain md:flex-row max-w-[90rem] mx-auto overflow-x-hidden overflow-y-auto custom_scroll">
      <Skeleton className="md:w-1/2 bg-slate-300 w-full relative min-h-[70vh] md:h-[100vh] flex items-center justify-center" />
      <div className="md:flex-1 flex flex-col max-w-[30rem] mx-auto mt-4 md:max-w-full md:mx-0 md:mt-0 p-4 bg-slate-100 md:h-full md:overflow-x-hidden md:overflow-y-auto overflow-y-visible custom_scroll">
        <div className="flex md:flex-col flex-col-reverse mb-2">
          <div className="md:mt-[10%] p-4">
            <Skeleton className="flex bg-slate-300 h-[3rem] p-4 rounded-xl items-center text-2xl text-[--primary-accent] font-bold">
              <div className="relative rotate-[180]">
                <RiMoneyDollarCircleFill
                  style={{ color: Colors.ACCENT, fontSize: 28 }}
                />
              </div>
            </Skeleton>
            <Skeleton className="text-xl bg-slate-300 mt-2 font-primary p-4 rounded-xl font-extralight" />
            <Skeleton className="bg-slate-300 p-2 mt-4 rounded-[5px] p-4 rounded-xl" />
            <Skeleton className="bg-slate-300 mt-4 rounded-full px-8 w-fit py-2 text-slate-600">
              Go Back
            </Skeleton>
          </div>
        </div>
        <div className="mx-4 flex flex-col gap-4 md:mt-auto">
          <Skeleton className="bg-[--primary-accent] bg-slate-300 h-[3rem] w-full text-white px-4 py-2 rounded-xl" />
          <Skeleton className="mt-4 bg-slate-300 flex items-center gap-2 text-sm h-[2rem] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
