import { Categories, MaxPrices, MinPrices } from "@/constants";
import Product from "@/models/Product";
import { ProductType } from "@/types";
import connect from "./connect";

const getSearchedProducts = async (
  pageNo: string,
  query: string,
  categories: string,
  minPrice: string,
  maxPrice: string,
  sortBy: "price" | "rating",
  highToLow: string
): Promise<ProductType[]> => {
  let priceMin: number = MinPrices[0];
  let priceMax: number = MaxPrices.reverse()[0];

  if (maxPrice > minPrice) {
    priceMax = parseInt(maxPrice);
    priceMin = parseInt(minPrice);
  }

  const searchTerms = query ? query.split(/\s+/) : [];
  const searchRegex = searchTerms.map((term) => `(?=.*${term})`).join("");

  const searchRegExp = new RegExp(searchRegex, "i");

  let categoriesList = categories.split("_");

  if (categoriesList[0] === "") categoriesList = Categories;

  let productList: ProductType[] | null = [];

  await connect();

  if (sortBy === "price") {
    productList = await Product.find({
      $and: [
        {
          title: { $regex: searchRegExp },
        },
        { matchingCategories: { $in: categoriesList } },
        { price: { $gte: priceMin, $lte: priceMax } },
      ],
    })
      .sort({ price: -1 })
      .skip((parseInt(pageNo) - 1) * 100)
      .limit(parseInt(pageNo) * 100)
      .exec();
  } else if (sortBy === "rating") {
    productList = await Product.find({
      $and: [
        {
          title: { $regex: searchRegExp },
        },
        { matchingCategories: { $in: categoriesList } },
        { price: { $gte: priceMin, $lte: priceMax } },
      ],
    })
      .sort({ rating: -1 })
      .skip((parseInt(pageNo) - 1) * 100)
      .limit(parseInt(pageNo) * 100)
      .exec();
  }

  const stringifiedProductData = JSON.stringify(productList);

  if (highToLow === "true") {
    return JSON.parse(stringifiedProductData);
  } else {
    return JSON.parse(stringifiedProductData).reverse();
  }
};

export default getSearchedProducts;
