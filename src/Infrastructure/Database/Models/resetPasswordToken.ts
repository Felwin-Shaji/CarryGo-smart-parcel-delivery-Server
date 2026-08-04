import { model, Schema, type Document } from "mongoose";
import type { IResetPasswordTokenModel } from "../../../Domain/Entities/token.js";

export type ITokenModel = IResetPasswordTokenModel & Document;


const resetPasswordTokenSchema = new Schema<IResetPasswordTokenModel>({
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

export const ResetPasswordTokenModel = model<IResetPasswordTokenModel>("ResetPasswordToken", resetPasswordTokenSchema);