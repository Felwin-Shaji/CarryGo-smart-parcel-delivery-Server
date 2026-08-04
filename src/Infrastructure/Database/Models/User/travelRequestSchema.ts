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


export interface TravelRequestDocument extends Document {
    _id: Types.ObjectId;
    travelerId: Types.ObjectId;

    startLocation: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    startAddress: string;
    startPincode: string;

    endLocation: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    endAddress: string;
    endPincode: string;

    departureAt: Date;
    arrivalAt?: Date | null;

    capacityKg: number;
    remainingCapacityKg: number;

    totalVolumeCm3: number;
    remainingVolumeCm3: number;

    allowedPackageDimensions: {
        maxLengthCm: number;
        maxWidthCm: number;
        maxHeightCm: number;
    };

    pricePerKg?: number | null;

    modeOfTransport: TransportMode;

    description?: string | null;

    status: TravelRequestStatus;

    createdAt: Date;
    updatedAt: Date;
}


const travelRequestSchema = new Schema<TravelRequestDocument>(
    {
        travelerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true, },

        startLocation: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number], // [lng, lat]
                required: true,
            },
        },
        startAddress: { type: String, required: true, },
        startPincode: { type: String, required: true, index: true },

        endLocation: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number], // [lng, lat]
                required: true,
            },
        },
        endAddress: { type: String, required: true, },
        endPincode: { type: String, required: true, index: true },

        departureAt: { type: Date, required: true, index: true, },
        arrivalAt: { type: Date, },

        capacityKg: { type: Number, required: true, },
        remainingCapacityKg: { type: Number, required: true, },

        totalVolumeCm3: { type: Number, required: true, },
        remainingVolumeCm3: { type: Number, required: true, },

        allowedPackageDimensions: {
            maxLengthCm: { type: Number, required: true, },
            maxWidthCm: { type: Number, required: true, },
            maxHeightCm: { type: Number, required: true, },
        },

        pricePerKg: { type: Number, },

        modeOfTransport: {
            type: String,
            enum: ["FLIGHT", "TRAIN", "CAR", "BUS", "BIKE"],
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

travelRequestSchema.index({ startLocation: "2dsphere" });
travelRequestSchema.index({ endLocation: "2dsphere" });


export const TravelRequestModel = model<TravelRequestDocument>("TravelRequest", travelRequestSchema);