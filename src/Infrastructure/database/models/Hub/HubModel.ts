import { model, Schema } from "mongoose";
import { Hub } from "../../../../Domain/Entities/Hub/Hub";

const hubSchema = new Schema<Hub>(
    {
        agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },

        name: { type: String, required: true },

        address: {
            addressLine1: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },

        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },

        verificationImage: { type: String, required: true },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },
    },
    {
        timestamps: true,
    }
);

export const HubModel = model<Hub>("Hub", hubSchema);
