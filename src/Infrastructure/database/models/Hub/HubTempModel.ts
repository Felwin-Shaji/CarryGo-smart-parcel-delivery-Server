import { Schema, model } from "mongoose";
import { HubTemp } from "../../../../Domain/Entities/Hub/HubTemp";

const hubTempSchema = new Schema<HubTemp>(
    {
        agencyId: { type: String, required: true, index: true },

        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, index: true, trim: true },
        mobile: { type: String, required: true },

        otp: { type: String, required: true },

        role: { type: String, enum: ["hub"], default: "hub" },

        addressLine1: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        pincode: { type: String, default: null },

        location_lat: { type: Number, default: null },
        location_lng: { type: Number, default: null },

        status: {
            type: String,
            enum: ["BASIC-Info", "OTP-Verified"],
            default: "BASIC-Info",
        },

        expiresAt: { type: Date, required: true }
    },
    {
        timestamps: true, 
    }
);

hubTempSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 600 });

export const HubTempModel = model<HubTemp>("HubTemp", hubTempSchema);
