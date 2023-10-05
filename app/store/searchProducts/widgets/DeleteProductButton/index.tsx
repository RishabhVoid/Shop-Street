"use client";

import CustomButton from "@/components/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import { ResponseCodes } from "@/constants";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

const DeleteProductButton = ({ productId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const deleteProduct = async () => {
    const rawRes = await fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
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
