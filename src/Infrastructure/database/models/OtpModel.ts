import { Document, model, Schema } from "mongoose";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";

const otpSchema = new Schema<IOtpModel>({
    name: { type: String },
    email: { type: String, unique: true, required: true, index: true },
    mobile: { type: String },
    password: { type: String },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})


otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

export const OtpModel = model<IOtpModel>("Otp", otpSchema);