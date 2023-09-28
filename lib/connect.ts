import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
  } catch (error) {
    console.log(error);
    throw new Error("An error occured while connecting to mongodb");
  }
};

export default connect;
