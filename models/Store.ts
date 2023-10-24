import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  productIds: {
    type: [String],
    required: true,
    default: [],
  },
});

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
