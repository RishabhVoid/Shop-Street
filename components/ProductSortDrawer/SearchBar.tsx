interface Props {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor="search_product" className="mb-1 font-primary">
        Search product
      </label>
      <input
        id="search_product"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="rounded-[5px] bg-slate-100 w-full text-[1rem] p-2 focus:outline-[--primary-accent]"
        placeholder="Search for items..."
      />
    </div>
  );
};

export default SearchBar;
