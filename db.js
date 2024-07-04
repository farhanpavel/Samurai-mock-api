import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
let dbConnect;
export const connectionToDb = async () => {
  try {
    const client = await MongoClient.connect(url);
    dbConnect = client.db("mock");
  } catch (err) {
    console.log("server loading error");
    throw err;
  }
};
export const getDb = () => dbConnect;
