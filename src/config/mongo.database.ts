import mongoose from "mongoose";

export const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Database connected");
};