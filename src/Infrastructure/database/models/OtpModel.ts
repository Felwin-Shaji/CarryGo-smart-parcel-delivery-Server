import { Document, model, Schema } from "mongoose";
import type { IOtpModel } from "../../../Domain/Entities/Iotp.js";

const otpSchema = new Schema<IOtpModel>({
    name: { type: String },
    email: { type: String, unique: true, required: true, index: true },
    mobile: { type: String },
    password: { type: String },
    otp: { type: String, required: true },
    role: { type: String, enum: ["user", "agency", "admin", "hub", "worker"], },
    expiresAt: { type: Date, required: true  },
},
    { timestamps: true }
);


otpSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 300 });

export const OtpModel = model<IOtpModel>("Otp", otpSchema);