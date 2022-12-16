//  import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(uri);
  console.log("DB Connection established");
}

main().catch((error) => console.log("DB Connection error", error));
