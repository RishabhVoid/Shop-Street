export interface RecentTags {
  [key: string]: string;
}

export type CategoriesType =
  | "electronic"
  | "art"
  | "fashion"
  | "electronics"
  | "home-furniture"
  | "health-beauty"
  | "sports-outdoors"
  | "books-media"
  | "toys-games"
  | "automotive"
  | "pets"
  | "art-craft"
  | "food-grocery"
  | "travel-luggage"
  | "office-school-supplies"
  | "jewelry-watches"
  | "hobbies-collectibles";

export type OrderStatus = "shipped" | "on-way" | "delivered";

export interface OrderDetails {
  address: string;
  email: string;
}

export interface UserType {
  _id: string;
  email: string;
  wishList: string[];
  cart: string[];
  orderDetailOptions: OrderDetails[];
  recentTags: RecentTags;
  isSeller: boolean;
  storeId: string;
  money: number;
}

export interface StoreType {
  _id: string;
  storeName: string;
  isVerified: boolean;
  productIds: string[];
}

export interface ProductType {
  _id: string;
  title: string;
  desc: string;
  price: number;
  matchingCategories: CategoriesType[];
  rating: number;
  inventory: number;
  maxDistance: number;
  deliveryDays: number;
}

export interface OrderType {
  _id: string;
  placedOn: string;
  productId: string;
  status: OrderStatus;
  email: string;
  address: string;
}

export interface CustomButtonType {
  title?: string;
  disabled?: boolean;
  styles?: string;
  callback?: () => void;
  type?: "button" | "submit";
  icon?: string;
}

export type SortBy =
  | "price"
  | "rating"
  | "inventory size"
  | "delivery distance"
  | "delivery time";

export type Order = "low-to-high" | "high-to-low";

export interface SearchFilters {
  pageNo: number;
  searchQuery: string;
  priceMin: number;
  priceMax: number;
  categories: string[];
  sortBy: SortBy;
  order: Order;
}
