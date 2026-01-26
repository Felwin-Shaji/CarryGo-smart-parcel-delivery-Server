import { Document, model, Schema, Types } from "mongoose";
import { HubJourneyDocument, HubJourneySchema } from "./HubJourneySchema";
import { PartnerSnapshotDocument, PartnerSnapshotSchema } from "./PartnerSnapshotSchema";
import { BookingAddressDocument, BookingAddressSchema } from "./BookingAddressSchema";
import { PackageSize } from "../../../../Domain/Enums/PackageSize";
import { PaymentGateway } from "../../../../Domain/Enums/PaymentGateway";
import { BookingStatusType, DeliveryPartnerType, PackageSizeType, PaymentGatewayType, PaymentMethodType } from "../../../Types/types";
import { DeliveryPartner } from "../../../../Domain/Enums/DeliveryPartnerType";
import { PaymentStatus } from "../../../../Domain/Enums/PaymentStatus";
import { PaymentMethod } from "../../../../Domain/Enums/PaymentMethod";
import { BookingStatus } from "../../../../Domain/Enums/BookingStatus";

export interface BookingDocument extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;

    deliveryPartnerType: DeliveryPartnerType;
    partnerSnapshot?: PartnerSnapshotDocument | null;

    pickupAddress: BookingAddressDocument;
    deliveryAddress: BookingAddressDocument;

    packageDetails: {
        category: string;
        size: PackageSizeType
        weightKg: number
    };

    pricing: {
        basePrice: number,
        distanceCharge: number,
        sizeCharge: number,
        platformFee: number,
        totalAmount: number,
        currency: "INR",
    }

    distanceKm: number;

    logistics: {
        routeHubs: HubJourneyDocument[];
        currentHubId?: Types.ObjectId;
        lastUpdatedAt?: Date;
    };

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

        partnerSnapshot: {
            type: PartnerSnapshotSchema,
            default: null,
        },

        pickupAddress: { type: BookingAddressSchema, required: true, },

        deliveryAddress: { type: BookingAddressSchema, required: true, },

        packageDetails: {
            category: { type: String, required: true },
            size: { type: String, enum: Object.values(PackageSize), required: true },
            weightKg: { type: Number, required: true },
        },

        distanceKm: { type: Number, required: true },

        pricing: {
            basePrice: { type: Number, required: true },
            distanceCharge: { type: Number, required: true },
            sizeCharge: { type: Number, required: true },
            platformFee: { type: Number, required: true },
            totalAmount: { type: Number, required: true },
            currency: { type: String, default: "INR" },
        },

        logistics: {
            routeHubs: { type: [HubJourneySchema], default: [] },
            currentHubId: { type: Types.ObjectId, ref: "Hub", },
            lastUpdatedAt: Date,
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
