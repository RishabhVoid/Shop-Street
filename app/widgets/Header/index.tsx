import MobileProfileDropDown from "./MobileProfileDropDown";
import SearchBar from "./SearchBar";
import PcLinks from "./PcLinks";

const Header = () => {
  return (
    <header className="bg-accent h-2/3 p-4">
      <nav className="border border-red-500 flex items-center lg:h-[3.5rem] h-auto flex-col lg:flex-row">
        <div className="flex items-center w-full lg:w-auto">
          <h1 className="text-white font-primary font-extrabold text-2xl">
            Shop Street
          </h1>
          <MobileProfileDropDown />
        </div>
        <SearchBar />
        <PcLinks />
      </nav>
    </header>
  );
};

export default Header;
