import { model, Schema } from "mongoose";
import { HubWorker } from "../../../../Domain/Entities/Worker/Worker.js";

const hubWorkerModel = new Schema<HubWorker>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["user", "agency", "admin", "hub", "worker"], default: "user" },
    kycStatus: { type: String, enum: ["PENDING", "REGISTERED", "APPROVED", "REJECTED",], default: "PENDING" },
    walletBalance: { type: Number, required: true, default: 0 },
    isBlocked: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

export const HubWorkerModel = model<HubWorker>("HubWorker", hubWorkerModel);