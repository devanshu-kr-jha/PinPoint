import mongoose from "mongoose";

export default async function connectMongo() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Connected to mongo atlas");
  } catch (error) {
    console.error(error);
  }
}
