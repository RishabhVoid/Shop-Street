"use client";

import { BsSearch } from "react-icons/bs";
import { FormEvent } from "react";

const SearchBar = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert("he");
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
      />
      <button
        type="submit"
        className="p-3 pr-4 rounded-e-3lg h-full cursor-pointer hover:bg-slate-300 transition-all duration-200"
      >
        <BsSearch />
      </button>
    </form>
  );
};

export default SearchBar;
