import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  placedOn: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
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
  sellerEmail: {
    type: String,
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
