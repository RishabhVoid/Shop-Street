import { Order, ProductType, SortBy } from "@/types";

const sortByPrice = (order: Order, products: ProductType[]): ProductType[] => {
  if (order === "high-to-low") {
    return products.sort((a, b) => b.price - a.price);
  } else if (order === "low-to-high") {
    return products.sort((a, b) => a.price - b.price);
  } else {
    throw new Error("Invalid order");
  }
};

const sortByRating = (order: Order, products: ProductType[]): ProductType[] => {
  if (order === "high-to-low") {
    return products.sort((a, b) => b.rating - a.rating);
  } else if (order === "low-to-high") {
    return products.sort((a, b) => a.rating - b.rating);
  } else {
    throw new Error("Invalid order");
  }
};

const sortByInventory = (
  order: Order,
  products: ProductType[]
): ProductType[] => {
  if (order === "high-to-low") {
    return products.sort((a, b) => b.inventory - a.inventory);
  } else if (order === "low-to-high") {
    return products.sort((a, b) => a.inventory - b.inventory);
  } else {
    throw new Error("Invalid order");
  }
};

const sortByMaxDistance = (
  order: Order,
  products: ProductType[]
): ProductType[] => {
  if (order === "high-to-low") {
    return products.sort((a, b) => b.maxDistance - a.maxDistance);
  } else if (order === "low-to-high") {
    return products.sort((a, b) => a.maxDistance - b.maxDistance);
  } else {
    throw new Error("Invalid order");
  }
};

const sortByDeliveryDays = (
  order: Order,
  products: ProductType[]
): ProductType[] => {
  if (order === "high-to-low") {
    return products.sort((a, b) => b.deliveryDays - a.deliveryDays);
  } else if (order === "low-to-high") {
    return products.sort((a, b) => a.deliveryDays - b.deliveryDays);
  } else {
    throw new Error("Invalid order");
  }
};

const sortProducts = (
  sortBy: SortBy,
  order: Order,
  products: ProductType[]
): ProductType[] => {
  switch (sortBy) {
    case "price":
      return sortByPrice(order, products);
    case "rating":
      return sortByRating(order, products);
    case "inventory size":
      return sortByInventory(order, products);
    case "delivery time":
      return sortByDeliveryDays(order, products);
    case "delivery distance":
      return sortByMaxDistance(order, products);
    default:
      return products;
  }
};

export default sortProducts;
