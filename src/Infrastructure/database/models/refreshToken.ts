import { model, Schema, type Document } from "mongoose";
import type { ITokenModel } from "../../../Domain/Entities/token.js";


const refreshTokenSchema = new Schema<ITokenModel>({
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true },
    role: { type: String, require: true },
    createdAt: { type: Date, enum: ["user", "admin", "agency", "hub", "worker"], default: Date.now },
    expiresAt: {
        type: Date,
        index: { expires: "7d" },
    },
    expiresInSeconds:{type:Number },
});

export const RefreshTokenModel = model<ITokenModel>("RefreshToken", refreshTokenSchema);