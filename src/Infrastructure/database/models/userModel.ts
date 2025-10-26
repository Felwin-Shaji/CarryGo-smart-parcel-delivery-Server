import { google } from "googleapis";
import { model, Schema } from "mongoose";
import type { User } from "../../../Domain/Entities/User.js";

const userModel = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    authProvider: { type: String, required: true, default: "local" }, 
    kycStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    walletBalance: { type: Number, required: true, default: 0 },
    isBlocked: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

export const UserModel = model<User>("User",userModel)