import { model, Schema } from "mongoose";
import type { Agency } from "../../../../Domain/Entities/Agency.js";

const agencyModel = new Schema<Agency>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["user", "agency", "admin", "hub", "worker"], default: "agency" },
    kycStatus: { type: String, enum: ["PENDING", "REGISTERED", "APPROVED" , "REJECTED", ], default: "PENDING" },
    walletBalance: { type: Number, required: true, default: 0 },
    commisionRate:{type: Number, required: true, default: 1 },  
    isBlocked: { type: Boolean, required: true, default: false },
},{
    timestamps:true,
});

export const AgencyModel = model<Agency>("Agency",agencyModel);
