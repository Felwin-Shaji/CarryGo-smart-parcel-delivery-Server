import { Booking, PartnerEntity } from "../../../Domain/Entities/Booking/Booking";
import { AddressResponseDTO, BookingListResponseDTO, CalculatePriceResponseDTO, UserBookingsDTO, } from "../../Dto/User/Booking.dto";
import { BookingStatusType, PaymentGatewayType, PaymentStatusType, DeliveryPartnerType } from "../../../Infrastructure/Types/types";
import { AppError } from "../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../../Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { ShipmentStatus } from "../../../Domain/Entities/Logistics/HubShipment";

export class BookingMapper {
    static createNew(params: {
        bookingId: string;
        userId: string;
        deliveryPartnerType: DeliveryPartnerType;
        partnerSnapshot: PartnerEntity | null;
        travelRequestId?: string | null;
        fromHubId?: string | null;
        toHubId?: string | null;
        pickup: AddressResponseDTO;
        delivery: AddressResponseDTO;

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

        pricing: CalculatePriceResponseDTO;
    }): Booking {

        const {
            bookingId,
            userId,
            deliveryPartnerType,
            partnerSnapshot,
            travelRequestId = null,
            pickup,
            delivery,
            packageDetails,
            pricing,
        } = params;

        const isTraveler = deliveryPartnerType === "TRAVELER";

        return new Booking(
            null,
            bookingId,
            userId,

            deliveryPartnerType,
            partnerSnapshot,

            {
                label: pickup.label,
                formattedAddress: pickup.formattedAddress!,
                city: pickup.city,
                state: pickup.state,
                country: pickup.country,
                pincode: pickup.pincode,
                location: pickup.location,
            },

            {
                label: delivery.label,
                formattedAddress: delivery.formattedAddress!,
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
                volumetricCharge: pricing.volumetricCharge,
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

            !isTraveler ? {
                fromHubId: params.fromHubId ? params.fromHubId : null,
                toHubId: params.toHubId ? params.toHubId : null,
                routeHubs: []
            } : undefined,


        );
    }

    static toUsersBookingListResponseDTO(
        bookings: Booking[],
        totalPages: number,
        totalCount: number
    ): BookingListResponseDTO {

        const bookingDTOs: UserBookingsDTO[] = bookings.map((booking) => {

            if (!booking.id)
                throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND);

            return {
                id: booking.id,
                bookingId: booking.bookingId,

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

                    weightKg: booking.packageDetails.weightKg,

                    dimensions: {
                        lengthCm: booking.packageDetails.dimensions.lengthCm,
                        widthCm: booking.packageDetails.dimensions.widthCm,
                        heightCm: booking.packageDetails.dimensions.heightCm,
                    },

                    fragile: booking.packageDetails.fragile ?? false,
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
            };
        });

        return {
            bookings: bookingDTOs,
            totalPages,
            totalCount,
        };
    };

    static fromShipmentStatus(
        status: ShipmentStatus
    ): BookingStatusType | null {
        const map: Record<ShipmentStatus, BookingStatusType | null> = {
            PENDING: null,
            LOADING: null,
            DISPATCHED: "IN_TRANSIT",

            ARRIVED: "IN_TRANSIT", // still moving in system

            COMPLETED: "DELIVERED",

            CANCELLED: "CANCELLED_AFTER_PICKUP",
        };

        return map[status];
    }
}
