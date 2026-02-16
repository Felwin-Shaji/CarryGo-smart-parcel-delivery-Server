import { Document, model, Schema, Types } from "mongoose";

export type TravelRequestStatus =
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "PARTIALLY_BOOKED"
    | "FULLY_BOOKED"
    | "COMPLETED"
    | "CANCELLED";

export type TransportMode =
    | "FLIGHT"
    | "TRAIN"
    | "CAR"
    | "BUS"
    | "BIKE";

export type PackageSizeType =
    | "SMALL"
    | "MEDIUM"
    | "LARGE";

export interface TravelRequestDocument extends Document {
    _id: Types.ObjectId;
    travelerId: Types.ObjectId;

    startLocation: { lat: number; lng: number; };
    startAddress: string;

    endLocation: { lat: number; lng: number; };
    endAddress: string;

    departureAt: Date;
    arrivalAt?: Date;

    capacityKg: number;
    remainingCapacityKg: number;
    allowedPackageSizes: PackageSizeType[];
    pricePerKg?: number;

    modeOfTransport: TransportMode;

    description?: string;

    status: TravelRequestStatus;

    createdAt: Date;
    updatedAt: Date;
}


const travelRequestSchema = new Schema<TravelRequestDocument>(
    {
        travelerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true, },

        startLocation: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        startAddress: { type: String, required: true, },

        endLocation: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        endAddress: { type: String, required: true, },

        departureAt: { type: Date, required: true, index: true, },
        arrivalAt: { type: Date, },

        capacityKg: { type: Number, required: true, },
        remainingCapacityKg: { type: Number, required: true, },
        allowedPackageSizes: { type: [String], enum: ["SMALL", "MEDIUM", "LARGE"], required: true, },
        pricePerKg: { type: Number, },

        modeOfTransport: {
            type: String,
            enum: ["FLIGHT", "TRAIN", "CAR", "BUS","BIKE"],
            required: true,
        },

        description: { type: String, },

        status: {
            type: String,
            enum: [
                "DRAFT",
                "PENDING_APPROVAL",
                "ACTIVE",
                "PARTIALLY_BOOKED",
                "FULLY_BOOKED",
                "COMPLETED",
                "CANCELLED",
            ],
            default: "DRAFT",
            index: true,
        },
    },
    {
        timestamps: true,
    }
);


export const TravelRequestModel = model<TravelRequestDocument>("TravelRequest", travelRequestSchema);