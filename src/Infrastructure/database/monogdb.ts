import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../logger/logger.js";
dotenv.config();


export const connectDB = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI as string);
        logger.info(`mongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        logger.error(`mongoose connection error: ${error}`);
    };
};