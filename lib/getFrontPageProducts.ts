import Product from "@/models/Product";
import connect from "./connect";
import { ProductType } from "@/types";

const getFrontPageProducts = async (): Promise<ProductType[]> => {
  await connect();

  const products = await Product.aggregate([{ $sample: { size: 100 } }]);
  if (!products) throw new Error("No products found");

  return products;
};

export default getFrontPageProducts;
