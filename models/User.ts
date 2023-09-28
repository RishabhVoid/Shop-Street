import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  wishList: {
    type: [String],
    required: true,
    default: [],
  },
  cart: {
    type: [String],
    required: true,
    default: [],
  },
  orderDetailOptions: {
    type: [
      {
        address: String,
        email: String,
      },
    ],
    required: true,
    default: [],
  },
  recentTags: {
    type: {},
    required: true,
    default: {},
  },
  isSeller: {
    type: Boolean,
    required: true,
    default: false,
  },
  storeId: {
    type: String,
    required: true,
    default: "default",
  },
  money: {
    type: Number,
    required: true,
    default: 27000,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
