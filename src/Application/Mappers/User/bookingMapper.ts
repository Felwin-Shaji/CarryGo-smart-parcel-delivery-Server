import { Booking, PartnerEntity } from "../../../Domain/Entities/Booking/Booking";
import { Address } from "../../../Domain/Entities/User/Address";
import { CalculatePriceResponseDTO } from "../../Dto/User/Booking.dto";
import {
    BookingStatusType,
    PaymentGatewayType,
    PaymentStatusType,
    DeliveryPartnerType,
} from "../../../Infrastructure/Types/types";

export class BookingMapper {
    static createNew(params: {
        userId: string;
        deliveryPartnerType: DeliveryPartnerType;
        partnerSnapshot: PartnerEntity | null
        pickup: Address;
        delivery: Address;

        packageDetails: {
            category: string;
            size: "SMALL" | "MEDIUM" | "LARGE";
            weightKg: number;
        };

        pricing: CalculatePriceResponseDTO;
    }): Booking {

        const {
            userId,
            deliveryPartnerType,
            partnerSnapshot,
            pickup,
            delivery,
            packageDetails,
            pricing,
        } = params;

        return new Booking(
            null,
            userId,

            deliveryPartnerType,
            partnerSnapshot,

            {
                label: pickup.label,
                addressLine1: pickup.addressLine1,
                addressLine2: pickup.addressLine2 ?? null,
                city: pickup.city,
                state: pickup.state,
                country: pickup.country,
                pincode: pickup.pincode,
                location: pickup.location,
            },

            {
                label: delivery.label,
                addressLine1: delivery.addressLine1,
                addressLine2: delivery.addressLine2 ?? null,
                city: delivery.city,
                state: delivery.state,
                country: delivery.country,
                pincode: delivery.pincode,
                location: delivery.location,
            },

            packageDetails,

            {
                basePrice: pricing.basePrice,
                distanceCharge: pricing.distanceCharge,
                sizeCharge: pricing.sizeCharge,
                platformFee: pricing.platformFee,
                totalAmount: pricing.totalPrice,
                currency: "INR",
            },

            pricing.distanceKm,

            {
                gateway: "RAZORPAY" as PaymentGatewayType,
                paymentStatus: "NOT_INITIATED" as PaymentStatusType,
            },

            "PAYMENT_PENDING" as BookingStatusType,
            {
                routeHubs: [],
            },


        );
    }
}
