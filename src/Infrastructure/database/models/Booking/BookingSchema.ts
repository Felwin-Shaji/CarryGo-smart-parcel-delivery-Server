import { Document, model, Schema, Types } from "mongoose";
import { HubJourneyDocument, HubJourneySchema } from "./HubJourneySchema";
import { PartnerSnapshotDocument, PartnerSnapshotSchema } from "./PartnerSnapshotSchema";
import { BookingAddressDocument, BookingAddressSchema } from "./BookingAddressSchema";
import { PaymentGateway } from "../../../../Domain/Enums/PaymentGateway";
import { BookingStatusType, DeliveryPartnerType, PaymentGatewayType, PaymentMethodType } from "../../../Types/types";
import { DeliveryPartner } from "../../../../Domain/Enums/DeliveryPartnerType";
import { PaymentStatus } from "../../../../Domain/Enums/PaymentStatus";
import { PaymentMethod } from "../../../../Domain/Enums/PaymentMethod";
import { BookingStatus } from "../../../../Domain/Enums/BookingStatus";

export interface BookingDocument extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;

    deliveryPartnerType: DeliveryPartnerType;
    travelRequestId?: Types.ObjectId | undefined;
    partnerSnapshot?: PartnerSnapshotDocument | null | undefined;

    pickupAddress: BookingAddressDocument;
    deliveryAddress: BookingAddressDocument;

    packageDetails: {
        category: string;

        weightKg: number;

        dimensions: {
            lengthCm: number;
            widthCm: number;
            heightCm: number;
        };

        volumetricWeightKg?: number;
        fragile?: boolean;
    };

    pricing: {
        basePrice: number,
        distanceCharge: number,
        volumetricCharge: number,
        platformFee: number,
        totalAmount: number,
        currency: "INR",
    }

    distanceKm: number;

    logistics: {
        fromHubId?: Types.ObjectId;
        toHubId?: Types.ObjectId;
        routeHubs: HubJourneyDocument[];
        currentHubId?: Types.ObjectId;
        lastUpdatedAt?: Date;
    };
    travelerJourney?: {
        acceptedAt?: Date;
        pickedUpAt?: Date;
        deliveredAt?: Date;
    } | undefined;

    payment: {
        gateway: PaymentGatewayType,
        orderRef: string,
        paymentRef: string,
        paymentMethod: PaymentMethodType,
        paymentStatus: PaymentStatus,
        paidAt: Date,
        refundedAt: Date,
    }

    status: BookingStatusType,

    createdAt: Date;
    updatedAt: Date;
}


const bookingSchema = new Schema<BookingDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true, },

        deliveryPartnerType: { type: String, enum: Object.values(DeliveryPartner), required: true },

        travelRequestId: { type: Schema.Types.ObjectId, ref: "TravelRequest", required: false, index: true, },

        partnerSnapshot: { type: PartnerSnapshotSchema, default: null, },

        pickupAddress: { type: BookingAddressSchema, required: true, },
        deliveryAddress: { type: BookingAddressSchema, required: true, },

        packageDetails: {
            category: { type: String, required: true },

            weightKg: { type: Number, required: true },

            dimensions: {
                lengthCm: { type: Number, required: true },
                widthCm: { type: Number, required: true },
                heightCm: { type: Number, required: true },
            },

            volumetricWeightKg: { type: Number },

            fragile: { type: Boolean, default: false },
        },

        distanceKm: { type: Number, required: true },

        pricing: {
            basePrice: { type: Number, required: true },
            distanceCharge: { type: Number, required: true },
            volumetricCharge: { type: Number, required: true },
            platformFee: { type: Number, required: true },
            totalAmount: { type: Number, required: true },
            currency: { type: String, default: "INR" },
        },

        logistics: {
            fromHubId: { type: Schema.Types.ObjectId, ref: "Hub" },
            toHubId: { type: Schema.Types.ObjectId, ref: "Hub" },
            routeHubs: { type: [HubJourneySchema] },
            currentHubId: { type: Types.ObjectId, ref: "Hub", },
            lastUpdatedAt: Date,
        },
        travelerJourney: {
            acceptedAt: Date,
            pickedUpAt: Date,
            deliveredAt: Date,
        },

        payment: {
            gateway: { type: String, enum: Object.values(PaymentGateway), required: true, },
            orderRef: String,
            paymentRef: String,
            paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
            paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.NOT_INITIATED },
            paidAt: Date,
            refundedAt: Date,
        },

        status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.CREATED, index: true },
    },
    {
        timestamps: true,
    }
);

export const BookingModel = model<BookingDocument>("Booking", bookingSchema);


bookingSchema.pre("save", function (next) {

    if (this.deliveryPartnerType === "TRAVELER" && !this.travelRequestId) {
        return next(new Error("Traveler booking must have travelRequestId"));
    }

    if (this.deliveryPartnerType === "AGENCY" && this.travelRequestId) {
        return next(new Error("Agency booking cannot have travelRequestId"));
    }

    next();
});
