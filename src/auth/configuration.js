import mongoose from "mongoose";
import 'dotenv/config'
import { indication } from "../helper/constents/message.js";

export const dbConfiguration = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(indication.DB_CONNECTED);
  } catch (error) {
    console.log(indication.DB_NOT_CONNECTED);
  }
};
