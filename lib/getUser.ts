import { MongoClient } from "mongodb";

export default async function getUser(email: string) {
  const client = new MongoClient(process.env.DB_URI!);
  const db = client.db("shop_street");
  const users = db.collection("users");
  const user = await users.findOne({ email: email });
  client.close();
  return user;
}
