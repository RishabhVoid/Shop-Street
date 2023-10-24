"use client";

import { Categories as cats } from "@/constants";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();

  const pushToCategory = (category: string) => {
    const url = `/search?pageNo=1&query=&categories=${category}`;
    router.push(url);
  };

  return (
    <div className="flex items-center p-2 relative overflow-x-auto gap-0 md:gap-2 overflow-y-hidden no_scroll">
      {cats.map((category) => (
        <div
          onClick={() => pushToCategory(category)}
          key={category}
          className="min-w-[70px] h-[70px] cursor-pointer m-2 p-2 rounded-[5px] transition duration-200 hover:scale-[1.2] flex flex-col items-center justify-center"
        >
          <img
            src={`/categories/${category}.png`}
            alt={category}
            className="w-1/2 h-1/2 object-contain object-center"
          />
          <h2 className="text-xs mt-2 text-center text-white capitalize">
            {category.replaceAll("-", " ")}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
