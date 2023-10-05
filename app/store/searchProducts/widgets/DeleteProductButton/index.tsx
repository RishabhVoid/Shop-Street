"use client";

import CustomButton from "@/components/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import { ResponseCodes } from "@/constants";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  productId: string;
}

const DeleteProductButton = ({ productId }: Props) => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  const { toast } = useToast();

  const deleteProduct = async () => {
    if (loading) return;
    const rawRes = await fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify({ productId, userEmail: user?.email || "" }),
    });
    const jsonRes = await rawRes.json();
    if (jsonRes.status === ResponseCodes.SUCCESS) {
      router.back();
    } else {
      toast({
        title: "Internal server error!",
        description:
          "The product due to some problems couldn't be deleted, please try again later",
      });
    }
  };

  return (
    <CustomButton
      title="Delete product"
      styles="mt-[10px] text-sm py-1 bg-red-500"
      callback={deleteProduct}
    />
  );
};

export default DeleteProductButton;
