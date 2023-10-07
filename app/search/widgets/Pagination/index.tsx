"use client";

import updateSearchParams from "@/lib/updateSearchParams";
import { useRouter } from "next/navigation";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

interface Props {
  pageNo: string;
  productsLength: number;
}

const Pagination = ({ pageNo, productsLength }: Props) => {
  const router = useRouter();

  const nextPage = () => {
    const updatedPath = updateSearchParams(
      ["pageNo"],
      [String(parseInt(pageNo) + 1)]
    );
    router.push(updatedPath);
  };

  const prevPage = () => {
    if (parseInt(pageNo) === 1) return;
    const updatedPath = updateSearchParams(
      ["pageNo"],
      [String(parseInt(pageNo) - 1)]
    );
    router.push(updatedPath);
  };

  return (
    <div className="mt-4 w-full h-[4rem] flex items-center justify-center">
      <div className="flex items-center">
        <div
          onClick={prevPage}
          className="bg-accent p-4 rounded-full cursor-pointer flex items-center justify-center"
        >
          <AiFillCaretLeft style={{ color: "white" }} />
        </div>
        <h1 className="mx-4 font-primary">Page: {pageNo}</h1>
        {productsLength !== 0 && (
          <div
            onClick={nextPage}
            className="bg-accent p-4 rounded-full cursor-pointer flex items-center justify-center"
          >
            <AiFillCaretRight style={{ color: "white" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
