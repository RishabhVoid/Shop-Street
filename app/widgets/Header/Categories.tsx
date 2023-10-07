import { Categories as cats } from "@/constants";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="flex items-center p-2 relative overflow-x-auto gap-0 md:gap-2 overflow-y-hidden no_scroll">
      {cats.map((category) => (
        <Link href={`/search?pageNo=1&categories=${category}`}>
          <div
            key={category}
            className="min-w-[100px] h-[100px] cursor-pointer p-2 transition duration-300 border border-transparent rounded-[5px] hover:border-slate-50 flex flex-col items-center justify-center"
          >
            <img
              src={`/categories/${category}.png`}
              alt={category}
              className="w-1/2 h-1/2"
            />
            <h2 className="text-xs md:text-sm mt-2 text-center text-white capitalize">
              {category.replaceAll("-", " ")}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
