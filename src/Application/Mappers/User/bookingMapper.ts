import { Booking, PartnerEntity } from "../../../Domain/Entities/Booking/Booking";
import { Address } from "../../../Domain/Entities/User/Address";
import { CalculatePriceResponseDTO, UserBookingResponseDTO } from "../../Dto/User/Booking.dto";
import {
    BookingStatusType,
    PaymentGatewayType,
    PaymentStatusType,
    DeliveryPartnerType,
} from "../../../Infrastructure/Types/types";
import { AppError } from "../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";

export class BookingMapper {
    static createNew(params: {
        userId: string;
        deliveryPartnerType: DeliveryPartnerType;
        partnerSnapshot: PartnerEntity | null;
        travelRequestId?: string | null;
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
            travelRequestId=null,
            pickup,
            delivery,
            packageDetails,
            pricing,
        } = params;

        const isTraveler = deliveryPartnerType === "TRAVELER";

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
            isTraveler ? travelRequestId : null,

            isTraveler ? {} : undefined,

            !isTraveler ? { routeHubs: [] } : undefined,


        );
    }

    static toUsersBookingListResponseDTO(
        bookings: Booking[]
    ): UserBookingResponseDTO[] {
        return bookings.map((booking) => {

            if (!booking.id) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND)

            return {
                id: booking.id!,

                createdAt: booking.createdAt.toISOString(),

                deliveryPartnerType: booking.deliveryPartnerType,

                partnerSnapshot: booking.partnerSnapshot
                    ? {
                        name: booking.partnerSnapshot.name,
                        type: booking.partnerSnapshot.type,
                    }
                    : null,

                pickupAddress: {
                    city: booking.pickupAddress.city,
                    pincode: booking.pickupAddress.pincode,
                },

                deliveryAddress: {
                    city: booking.deliveryAddress.city,
                    pincode: booking.deliveryAddress.pincode,
                },

                packageDetails: {
                    category: booking.packageDetails.category,
                    size: booking.packageDetails.size,
                    weightKg: booking.packageDetails.weightKg,
                },

                pricing: {
                    totalAmount: booking.pricing.totalAmount,
                    currency: booking.pricing.currency,
                },

                distanceKm: booking.distanceKm,

                payment: {
                    paymentStatus: booking.payment.paymentStatus,
                },

                status: booking.status,
            }
        });
    }
}
