import Product from "@/models/Product";
import connect from "./connect";
import { ProductType } from "@/types";

const getProductById = async (productId: string): Promise<ProductType> => {
  await connect();

  const product: ProductType | null = await Product.findOne({ _id: productId });
  if (!product) throw new Error("Requested product doesn't exsts!");

  return product;
};

export default getProductById;
