export const SignInFeatures = [
  "Place and manage orders by signin in with us.",
  "Create a store and start selling your own products!",
];

export const ResponseCodes = {
  INVALID_CREDENTIALS: "invalid_credentials",
  SUCCESS: "success",
  UNKNOWN_ERROR: "unknown_error",
  NOT_FOUND: "requested_data_not_found",
  CONDITIONS_MISMATCHED: "conditions_did_not_match",
};

export const Colors = {
  ACCENT: "#ff8a16",
};

export const Categories = [
  "electronic",
  "art",
  "fashion",
  "home-furniture",
  "health-beauty",
  "sports-outdoors",
  "books-media",
  "toys-games",
  "automotive",
  "food-grocery",
  "travel-luggage",
  "office-school-supplies",
  "jewelry-watches",
  "hobbies-collectibles",
];

export const sortOptions = [
  "price",
  "rating",
  "inventory size",
  "delivery distance",
  "delivery time",
];

export const ProductViewProfiles = ["main", "left", "right", "top"];

export const MinPrices = [0, 100, 500, 1000, 2000, 5000];

export const MaxPrices = [500, 1000, 2000, 5000, 10000, 100000];

export const Specials = [
  {
    title: "The best collectables from all over the world.",
    description: "Finest of the gems from around the world!",
    image: "collectables",
    bgImage: "",
    color: "#BAB86C",
    search: "premium watch",
  },
  {
    title: "Industry beasts for max productiveness.",
    description: "Get the meatiest laptops one can get.",
    image: "beast",
    bgImage: "apple.jpg",
    color: "#587894",
    search: "macbook",
  },
  {
    title: "Step out in style with our exclusive shoe collection.",
    description:
      "Discover the latest trends and finest craftsmanship in our shoe specials.",
    image: "shoes",
    bgImage: "",
    color: "#f4c506",
    search: "sneakers",
  },
];

export const SellerFeatures = [
  "Effortless Product Management: Query and filter items effortlessly. Managing your products is a breeze with our intuitive interface.",
  "Convenient Online Listing: Add your products directly from our website. No hassle, no complications. Just a few clicks and your item is live for the world to see.",
  "Boost Your Visibility: Our unique rating-based system ensures that quality shines. Higher ratings mean higher placement, giving your items the attention they deserve.",
  "Trustworthy Seller Verification: Gain credibility and trust with our verification process. Verified sellers rank higher, making them the preferred choice for discerning buyers."
]

const StoreNameMin = 4;
const StoreNameMax = 24;

export const StoreNameRules = {
  min: StoreNameMin,
  max: StoreNameMax,
  rules: [
    `Minimum characters : ${StoreNameMin}`,
    `Max characters : ${StoreNameMax}`
  ]
}