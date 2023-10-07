import MobileProfileDropDown from "./MobileProfileDropDown";
import SearchBar from "./SearchBar";
import PcLinks from "./PcLinks";
import Categories from "./Categories";
import Specials from "./Specials";

const Header = () => {
  return (
    <header className="bg-accent h-2/3 flex flex-col overflow-hidden">
      <nav className="flex items-center mx-4 mb-2 lg:h-[3.5rem] h-auto flex-col lg:flex-row pt-2 md:pt-0">
        <div className="flex items-center w-full lg:w-auto">
          <h1 className="text-white font-primary font-extrabold text-2xl">
            Shop Street
          </h1>
          <MobileProfileDropDown />
        </div>
        <SearchBar />
        <PcLinks />
      </nav>
      <Categories />
      <div className="relative flex-1">
        <Specials />
      </div>
    </header>
  );
};

export default Header;
