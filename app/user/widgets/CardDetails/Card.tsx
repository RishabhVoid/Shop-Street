import { UserType } from "@/types";
import { User } from "firebase/auth";

const AltImage = "/images/blank_account.png";

interface Props {
  user: User | null | undefined;
  loading: boolean;
  userData: UserType | undefined;
  userId: string;
  handleSignOut: () => void;
}

const Card = ({ user, loading, userData, userId, handleSignOut }: Props) => {
  return (
    <div className="relative ml-[2rem] mt-4 md:mt-0 flex items-center max-w-[23rem] rounded-[5px] pr-8 md:w-[95%] bg-[#2a333a] h-[15rem]">
      <div className="relative -left-[1.5rem] md:h-[150px] h-[100px] md:w-[150px] w-[100px] bg-slate-700 -left-[1.9rem] z-30 shadow-md shadow-slate-900 rounded-[5px] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          alt={"user"}
          src={loading || !user || !user?.photoURL ? AltImage : user?.photoURL}
        />
      </div>
      <div className="flex-1 h-full">
        <div className="py-[2.8rem] h-full">
          <div className="w-full mt-[1rem] flex items-center">
            <span className="bg-red-300 w-[40px] h-[40px] rounded-full block opacity-50" />
            <span className="bg-blue-300 w-[40px] h-[40px] relative -left-4 rounded-full block opacity-50" />
            <span className="bg-green-300 w-[40px] h-[40px] relative -left-8 rounded-full block opacity-50" />
          </div>
          <h2 className="text-slate-300 mb-[1rem]">Imaginary bank.CO</h2>
          <h2 className="text-slate-300">{user?.email || "error@gmail.com"}</h2>
          <h2 className="text-slate-300">Balance {userData?.money || NaN}$</h2>
        </div>
        <div className="flex flex-col absolute p-2 w-full h-full top-0 left-0 z-20 rounded-[5px]">
          <div className="flex items-center justify-between">
            <h1 className="text-slate-300 ml-[1rem] text-xl">
              {user?.displayName ||
                (loading ? "Loading..." : "An error occured!")}
            </h1>
            <button
              onClick={handleSignOut}
              className="py-1 px-2 rounded-[2px] bg-red-600 text-white hover:bg-red-400 transition duration-200"
            >
              Sign out
            </button>
          </div>
          <h1 className="text-slate-300 text-base ml-[1rem] mt-auto">
            {userId || "An error occured!"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
