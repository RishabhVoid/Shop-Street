import Product from "@/models/Product";
import connect from "./connect";
import { ProductType } from "@/types";

const getFrontPageProducts = async (): Promise<ProductType[]> => {
  await connect();

  const products = await Product.aggregate([
    { $sort: { rating: -1 } },
    { $sample: { size: 100 } },
  ]);

  if (!products || products.length === 0) {
    throw new Error("No products found");
  }

  return products;
};

export default getFrontPageProducts;
