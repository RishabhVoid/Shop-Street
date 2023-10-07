"use client";

import { BsSearch } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?pageNo=1&query=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-2/4 mt-2 lg:ml-auto lg:mt-0 bg-white rounded-3xl flex items-center"
    >
      <input
        type="text"
        placeholder="Full hd tv..."
        className="flex-1 h-full outline-none ml-4 mr-4"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="submit"
        className="p-3 pr-4 rounded-e-3lg h-full cursor-pointer transition-all duration-200"
      >
        <BsSearch />
      </button>
    </form>
  );
};

export default SearchBar;
