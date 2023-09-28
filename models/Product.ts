import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  matchingCategories: {
    type: [String],
    required: true,
    default: [],
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  inventory: {
    type: Number,
    required: true,
  },
  maxDistance: {
    type: Number,
    required: true,
  },
  deliveryDays: {
    type: Number,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
