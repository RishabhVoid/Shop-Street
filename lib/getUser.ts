import connect from "./connect";
import User from "@/models/User";

export default async function getUser(email: string) {
  await connect();
  const user = await User.findOne({ email: email });
  return user;
}
