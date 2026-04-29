import { TravelerParcelTrackingDTO } from "@/Application/Dto/Logistics/ParcelTracking.dto";
import { Booking } from "@/Domain/Entities/Booking/Booking";
import { User } from "@/Domain/Entities/User";
import { TravelRequest } from "@/Domain/Entities/User/TravelRequest";
import { AppError } from "@/Domain/utils/customError";
import { BOOKING_MESSAGE } from "@/Infrastructure/constants/messages/bookingMessages";
import { STATUS } from "@/Infrastructure/constants/statusCodes";


export class TravelerParcelTrackingMapper {

    static toDTO(
        booking: Booking,
        travelRequest: TravelRequest,
        traveler: User
    ): TravelerParcelTrackingDTO {

        // 1️⃣ Derive Status
        const journey = booking.travelerJourney;

        let currentStatus = "MATCHED";
        let currentMessage = "Traveler assigned to your parcel";
        let currentLocation: { lat: number; lng: number } | null = null;
        let updatedAt: Date | null = null;

        if (journey?.acceptedAt) {
            currentStatus = "ACCEPTED";
            currentMessage = "Traveler accepted your parcel";
            updatedAt = journey.acceptedAt;
        }

        if (journey?.pickedUpAt) {
            currentStatus = "IN_TRANSIT";
            currentMessage = "Parcel is in transit with traveler";
            currentLocation = travelRequest.startLocation;
            updatedAt = journey.pickedUpAt;
        }

        if (journey?.deliveredAt) {
            currentStatus = "DELIVERED";
            currentMessage = "Parcel delivered successfully";
            currentLocation = travelRequest.endLocation;
            updatedAt = journey.deliveredAt;
        }

        // 2️⃣ Timeline
        const timeline = [
            {
                status: "BOOKED",
                message: "Booking created",
                timestamp: booking.createdAt
            },
            journey?.acceptedAt && {
                status: "ACCEPTED",
                message: "Traveler accepted your parcel",
                timestamp: journey.acceptedAt
            },
            journey?.pickedUpAt && {
                status: "PICKED_UP",
                message: "Parcel picked up by traveler",
                timestamp: journey.pickedUpAt
            },
            journey?.deliveredAt && {
                status: "DELIVERED",
                message: "Parcel delivered",
                timestamp: journey.deliveredAt
            }
        ].filter(Boolean) as TravelerParcelTrackingDTO["timeline"];

        // 3️⃣ Checkpoints
        const checkpoints = [
            {
                type: "PICKUP" as const,
                lat: booking.pickupAddress.location.lat,
                lng: booking.pickupAddress.location.lng,
                label: "Pickup Location"
            },
            {
                type: "DELIVERY" as const,
                lat: booking.deliveryAddress.location.lat,
                lng: booking.deliveryAddress.location.lng,
                label: "Delivery Location"
            }
        ];

        if (!booking.id) {
            throw new AppError(BOOKING_MESSAGE.ID_MISSING, STATUS.NOT_FOUND)
        }

        // 4️⃣ Return DTO
        return {
            type: "TRAVELER",

            booking: {
                id: booking.id,
                bookingId: booking.bookingId,
                status: booking.status,

                from: {
                    address: booking.pickupAddress.formattedAddress,
                    city: booking.pickupAddress.city,
                    pincode: booking.pickupAddress.pincode,
                    location: booking.pickupAddress.location
                },

                to: {
                    address: booking.deliveryAddress.formattedAddress,
                    city: booking.deliveryAddress.city,
                    pincode: booking.deliveryAddress.pincode,
                    location: booking.deliveryAddress.location
                },

                package: {
                    category: booking.packageDetails.category,
                    weightKg: booking.packageDetails.weightKg,
                    ...(booking.packageDetails.fragile !== undefined && {
                        fragile: booking.packageDetails.fragile
                    })
                },

                price: booking.pricing.totalAmount,

                createdAt: booking.createdAt
            },

            traveler: {
                id: traveler.id!,
                name: traveler.name,
                email: traveler.email,
                phone: traveler.mobile,
                kycStatus: traveler.kycStatus
            },

            currentStatus: {
                status: currentStatus,
                message: currentMessage,
                location: currentLocation,
                updatedAt: updatedAt
            },

            trip: {
                fromAddress: travelRequest.startAddress,
                toAddress: travelRequest.endAddress,

                fromPincode: travelRequest.startPincode,
                toPincode: travelRequest.endPincode,

                departureAt: travelRequest.departureAt,
                arrivalAt: travelRequest.arrivalAt,

                transportMode: travelRequest.modeOfTransport
            },

            checkpoints,

            timeline
        };
    }
}