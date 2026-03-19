import { AppError } from "../../utils/customError";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { AddressLabelType, BookingStatusType, DeliveryPartnerType, HubJourneyStatusType, PaymentGatewayType, PaymentMethodType, PaymentStatusType } from "../../../Infrastructure/Types/types";

export interface AddressEntity {
    label: AddressLabelType,
    formattedAddress: string,
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
        lat: number;
        lng: number;
    };
}

export interface PartnerEntity {
    partnerId: string | null;
    name: string;
    type: DeliveryPartnerType;
    contact?: {
        email?: string;
        phone?: string | null;
    };
}

export interface PackageDimensions {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
}

export interface PackageDetails {
    category: string;
    weightKg: number;

    dimensions: PackageDimensions;

    volumetricWeightKg?: number;
    fragile?: boolean;
}

export interface HubJourney {
    hubId: string;
    hubName: string;
    status: HubJourneyStatusType,
    arrivedAt?: Date | undefined;
    departedAt?: Date | undefined;
}



export class Booking {
    constructor(
        public readonly id: string | null,

        public userId: string,


        public deliveryPartnerType: DeliveryPartnerType,
        public partnerSnapshot: PartnerEntity | null,

        public pickupAddress: AddressEntity,
        public deliveryAddress: AddressEntity,

        public packageDetails: PackageDetails,


        public pricing: {
            basePrice: number;
            distanceCharge: number;
            volumetricCharge: number;
            platformFee: number;
            totalAmount: number;
            currency: "INR";
        },

        public distanceKm: number,


        public payment: {
            gateway: PaymentGatewayType;

            orderRef?: string;
            paymentRef?: string;

            paymentMethod?: PaymentMethodType;
            paymentStatus: PaymentStatusType;

            paidAt?: Date;
            refundedAt?: Date;
        },


        public status: BookingStatusType,

        public travelRequestId?: string | null,
        public travelerJourney?: {
            acceptedAt?: Date;
            pickedUpAt?: Date;
            deliveredAt?: Date;
        },


        public logistics?: {
            parcelRouteId?: string | null; 
            routeHubs?: HubJourney[];
            currentHubId?: string | undefined;
            lastUpdatedAt?: Date | undefined;
        },
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.validate();
    }


    private validate(): void {
        if (this.pricing.totalAmount <= 0) {
            throw new AppError(BOOKING_MESSAGE.INVALID_AMOUNT);
        }

        if (this.distanceKm <= 0) {
            throw new AppError(BOOKING_MESSAGE.INVALID_DISTANCE);
        }
    }
};