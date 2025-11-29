import { model, Schema } from "mongoose";
import { HubWorkersTemp } from "../../../../Domain/Entities/Worker/WrokersTemp.js";

const hubWorkerTempModel = new Schema<HubWorkersTemp>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    otp: { type: String, required: true, select: true },
    role: { type: String, enum: ["user", "agency", "admin", "hub", "worker"], default: "user" },
    hubId: { type: String, required: true },
    status: {
        type: String,
        enum: ["BASIC-Info", "OTP-Verified"],
        default: "BASIC-Info",
    },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true
});

hubWorkerTempModel.index({ updatedAt: 1 }, { expireAfterSeconds: 600 });
export const HubWorkerTempModel = model<HubWorkersTemp>("HubWorkersTemp", hubWorkerTempModel);