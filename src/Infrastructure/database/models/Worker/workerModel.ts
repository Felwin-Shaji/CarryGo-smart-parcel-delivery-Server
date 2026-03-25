import { model, Schema } from "mongoose";
import { HubWorker } from "../../../../Domain/Entities/Worker/Worker.js";

const hubWorkerModel = new Schema<HubWorker>({
    hubId: { type: Schema.Types.ObjectId, ref: "Hub", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["user", "agency", "admin", "hub", "worker"], default: "user" },
    workerRole: { type: String, enum: ["PICKUP", "TRANSPORT", "OUT_FOR_DELIVERY"], required: true, },
    workingStatus: { type: String, enum: ["AVAILABLE", "BUSY", "OFF_DUTY", "ON_LEAVE", "BREAK"], default: "AVAILABLE", index: true, },
    kycStatus: { type: String, enum: ["PENDING", "REGISTERED", "APPROVED", "REJECTED",], default: "PENDING" },
    walletBalance: { type: Number, required: true, default: 0 },
    isBlocked: { type: Boolean, required: true, default: false },
    tokenVersion: { type: Number, required: true, default: 0 },
}, {
    timestamps: true
});

export const HubWorkerModel = model<HubWorker>("HubWorker", hubWorkerModel);