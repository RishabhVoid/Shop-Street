import Product from "@/models/Product";
import connect from "./connect";
import { ProductType } from "@/types";
import getChunkedArray from "./getChunkedArray";
import { ProductsSectionSize } from "@/constants";

const getFrontPageProducts = async (skip: number): Promise<ProductType[][]> => {
  await connect();

  const products: ProductType[] = await Product.aggregate([
    { $sort: { rating: -1 } },
    { $limit: skip + 20 },
  ]);

  if (!products || products.length === 0) return [];

  const chunkedProducts = getChunkedArray(ProductsSectionSize, products);

  const stringifiedProductData = JSON.stringify(chunkedProducts);

  return JSON.parse(stringifiedProductData);
};

export default getFrontPageProducts;
