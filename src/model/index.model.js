import mongoose from "mongoose";
import config from "../common/config.js";

export const mongoConnection = async ()=>{
  await mongoose.connect(config.MONGO_URL);
    console.log("MongoDB Connected Successfully!")
}