import Product from "@/models/Product";
import Store from "@/models/Store";
import User from "@/models/User";

const decreaseProductInventory = async (id: string, amount: number) => {
  const prod = await Product.findById(id);

  if (!prod) return;

  const price = prod.price;

  const totalAmount = price * amount;

  const result = await User.findOneAndUpdate(
    { email: prod.sellerEmail },
    { $inc: { money: totalAmount } }
  );

  prod.inventory = prod.inventory - amount;
  prod.save();
};

export default decreaseProductInventory;
