import { Document, model, Schema } from "mongoose";
import type { Otp } from "../../../Application/Dto/otp.dto.js";

const otpSchema = new Schema<Otp>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})


otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

export const OtpModel = model<Otp>("Otp", otpSchema);