"use client";

import CustomButton from "../CustomButton";

interface Props {
  reset: () => void;
  error: Error & { digest?: string };
}

const ErrorPage = ({ reset, error }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-x-hidden overflow-y-auto custom_scroll">
      <div className="flex flex-col relative items-center">
        <div className="flex flex-col items-center animate-spin-slow">
          <h1 className="text-slate-500 drop-shadow-md text-2xl font-bold rotate-[20deg]">
            NANI?!
          </h1>
          <img
            src="/images/nani.png"
            alt="nani?!"
            className="w-[90%] max-w-[20rem]"
          />
        </div>
        <div className="max-w-[25rem] w-[90%] p-4 rounded-[5px] bg-slate-300 relative z-50">
          <h2 className="rounded-[5px] font-primary text-md">
            Something went wrong! Contact the team with given error if it
            persues to happen!
          </h2>
          <p className="p-2 text-sm ">Error message : {error.message}</p>
          <CustomButton title="Try again!" callback={reset} styles="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
