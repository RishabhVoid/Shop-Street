import { UserType } from "@/types";
import { User } from "firebase/auth";
import Card from "./Card";
import CartDetails from "./CartDetails";

interface Props {
  user: User | null | undefined;
  loading: boolean;
  userData: UserType | undefined;
  userId: string;
  handleSignOut: () => void;
}

const CardDetails = ({
  user,
  loading,
  userData,
  userId,
  handleSignOut,
}: Props) => {
  return (
    <div className="flex md:flex-row flex-col items-center md:p-4 justify-center">
      <Card
        loading={loading}
        user={user}
        userData={userData}
        userId={userId}
        handleSignOut={handleSignOut}
      />
      <CartDetails userData={userData} />
    </div>
  );
};

export default CardDetails;
