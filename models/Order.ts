import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: String,
  sellerEmail: String,
  amount: Number,
});

const orderSchema = new mongoose.Schema({
  placedOn: {
    type: String,
    required: true,
  },
  products: {
    type: [productSchema],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "shipped",
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
