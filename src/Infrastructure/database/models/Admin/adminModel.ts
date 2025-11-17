import { model, Schema } from "mongoose";
import type { Admin } from "../../../../Domain/Entities/admin.js";

const adminModel = new Schema<Admin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ["admin"] ,default:"admin"},
    isAdmin: { type: Boolean, required: true, default: true },
    walletBalance: { type: Number, required: true, default: 0 },
    isBlocked: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

export const AdminModel = model<Admin>("Admin", adminModel);