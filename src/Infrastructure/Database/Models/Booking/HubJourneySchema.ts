import { Schema, Types } from "mongoose";
import { HubJourneyStatus } from "../../../../Domain/Enums/HubJourneyStatus";

export interface HubJourneyDocument {
    hubId: Types.ObjectId;

    hubName: string;

    status: HubJourneyStatus;

    arrivedAt?: Date;
    departedAt?: Date;
}

export const HubJourneySchema = new Schema<HubJourneyDocument>(
    {
        hubId: { type: Schema.Types.ObjectId, ref: "Hub", required: true },
        hubName: { type: String, required: true },
        status: {
            type: String,
            enum: Object.values(HubJourneyStatus),
            default: HubJourneyStatus.PENDING,
        },
        arrivedAt: Date,
        departedAt: Date,
    },
    { _id: false }
);