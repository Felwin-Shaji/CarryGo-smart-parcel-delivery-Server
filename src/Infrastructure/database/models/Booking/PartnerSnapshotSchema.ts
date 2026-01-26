import { Schema, Types } from "mongoose";
import { DeliveryPartnerType } from "../../../Types/types";
import { DeliveryPartner } from "../../../../Domain/Enums/DeliveryPartnerType";

export interface PartnerSnapshotDocument {
    partnerId: Types.ObjectId;

    name: string;

    type: DeliveryPartnerType;

    contact?: {
        email?: string;
        phone?: string;
    };
}

export const PartnerSnapshotSchema = new Schema<PartnerSnapshotDocument>(
    {
        partnerId: { type: Schema.Types.ObjectId, refPath: "deliveryType" },
        name: { type: String, required: true },
        type: {
            type: String,
            enum: Object.values(DeliveryPartner),
            required: true,
        },
        contact: {
            email: String,
            phone: String,
        },
    }, 
    { _id: false }
);