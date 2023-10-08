"use client";

import updateSearchParams from "@/lib/updateSearchParams";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import GoBack from "./GoBack";

interface Props {
  query: string;
}

const SearchBar = ({ query: QueryTerm }: Props) => {
  const [query, setQuery] = useState(QueryTerm || "");

  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const updatedPath = updateSearchParams(["query"], [query]);
    router.replace(updatedPath);
  };

  return (
    <div className="w-full flex items-center">
      <GoBack />
      <form className="flex-1 flex h-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Super big tv..."
          className="w-full px-2 py-4 border-2 border-b-slate-300 outline-none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="submit"
          className="bg-accent h-full w-[60px] flex cursor-pointer transition duration-200 hover:brightness-110 items-center justify-center"
        >
          <AiOutlineSearch style={{ color: "white", fontSize: 32 }} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
