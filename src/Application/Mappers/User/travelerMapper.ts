import { Booking } from "../../../Domain/Entities/Booking/Booking";
import { User } from "../../../Domain/Entities/User";
import { TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
import { IWrokerKYCVerification } from "../../../Domain/Entities/Worker/WorkerKyc";
import { PaymentStatus } from "../../../Domain/Enums/PaymentStatus";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../../Infrastructure/constants/messages/userMessage";
import { STATUS } from "../../../Infrastructure/constants/statusCodes";
import { BookingStatusType } from "../../../Infrastructure/Types/types";
import { CreateTravelRequestDTO, TravelerRequestAddressDTO, TripDetailsResponseDTO } from "../../Dto/User/traveler.dto";
import { GetTravelerKycResponseDTO } from "../../Dto/User/user.dto";

export class TravelerMapper {

    static toDomainTravelRequest(
        dto: CreateTravelRequestDTO,
        travelerId: string,
        startAddress: TravelerRequestAddressDTO,
        endAddress: TravelerRequestAddressDTO
    ): TravelRequest {

        const formattedStartAddress = startAddress.formattedAddress;
        const formattedEndAddress = endAddress.formattedAddress;

        if (!formattedStartAddress || !formattedEndAddress) {
            throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_ADDRESS_ERROR, STATUS.BAD_REQUEST);
        }

        return new TravelRequest(
            null,
            travelerId,

            startAddress.location,
            formattedStartAddress,
            startAddress.pincode,

            endAddress.location,
            formattedEndAddress,
            endAddress.pincode,

            new Date(dto.departureAt),
            dto.arrivalAt ? new Date(dto.arrivalAt) : null,

            dto.capacityKg,
            dto.capacityKg,

            dto.totalVolumeCm3,
            dto.totalVolumeCm3,

            dto.allowedPackageDimensions,

            dto.pricePerKg ?? null,

            dto.modeOfTransport,

            dto.description ?? null,

            "DRAFT"
        );
    }

    static toGetTravelerKycResponseDTO(kyc: IWrokerKYCVerification, user: User): GetTravelerKycResponseDTO {
        return {
            idType: kyc.idType,
            idNumber: kyc.idNumberEncrypted,
            documentUrl: kyc.documentUrl,
            selfieUrl: kyc.selfieUrl,
            rejectionReason: user.kycStatus === "REJECTED" ? user.rejectReason : null
        };
    }

    static toGetTravelRequestByIdResponseDTO(travelRequest: TravelRequest, bookings: Booking[]): TripDetailsResponseDTO {

        const isDeliveredStatus = (status: BookingStatusType): boolean =>
            status === "DELIVERED" || status === "SETTLED";

        const isCancelledStatus = (status: BookingStatusType): boolean =>
            [
                "CANCELLED_BEFORE_PICKUP",
                "CANCELLED_AFTER_PICKUP",
                "CANCELLED_BY_USER",
                "CANCELLED_BY_TRAVELER",
            ].includes(status);

        const isActiveStatus = (status: BookingStatusType): boolean =>
            [
                "PAID_PENDING_PICKUP",
                "PICKUP_STARTED",
                "IN_TRANSIT",
            ].includes(status);

        const isFinanciallyCompleted = (status: BookingStatusType): boolean =>
            status === "SETTLED";

        // -----------------------
        // Orders Mapping
        // -----------------------
        const orders = bookings.map(b => ({
            id: b.id!,
            customerName: b.partnerSnapshot?.name ?? "Sender",
            pickupCity: b.pickupAddress.city,
            deliveryCity: b.deliveryAddress.city,
            weightKg: b.packageDetails.weightKg,
            amount: b.pricing.totalAmount,
            status: b.status,
        }));


        // -----------------------
        // Stats
        // -----------------------
        const totalOrders = bookings.length;

        const deliveredOrders = bookings.filter(b =>
            isDeliveredStatus(b.status)
        ).length;

        const cancelledOrders = bookings.filter(b =>
            isCancelledStatus(b.status)
        ).length;

        const activeOrders = bookings.filter(b =>
            isActiveStatus(b.status)
        ).length;

        // -----------------------
        // Earnings
        // IMPORTANT: only count paid bookings
        // -----------------------
        const earningBookings = bookings.filter(
            b =>
                isDeliveredStatus(b.status) &&
                b.payment.paymentStatus === PaymentStatus.PAID
        );

        const total = earningBookings.reduce(
            (sum, b) => sum + b.pricing.totalAmount,
            0
        );

        const completed = earningBookings
            .filter(b => isFinanciallyCompleted(b.status))
            .reduce((sum, b) => sum + b.pricing.totalAmount, 0);

        const pending = total - completed;



        // -----------------------
        // Build Response DTO
        // -----------------------
        return {
            id: travelRequest.id!,

            startCity: this.extractCity(travelRequest.startAddress),
            endCity: this.extractCity(travelRequest.endAddress),

            departureAt: travelRequest.departureAt.toISOString(),
            arrivalAt: travelRequest.arrivalAt ? travelRequest.arrivalAt.toISOString() : "",

            modeOfTransport: travelRequest.modeOfTransport,

            capacityKg: travelRequest.capacityKg,
            remainingCapacityKg: travelRequest.remainingCapacityKg,

            totalVolumeCm3: travelRequest.totalVolumeCm3,
            remainingVolumeCm3: travelRequest.remainingVolumeCm3,

            allowedPackageDimensions: travelRequest.allowedPackageDimensions,

            description: travelRequest.description ?? "",

            status: travelRequest.status,

            createdAt: travelRequest.createdAt.toISOString(),

            orders,

            earnings: {
                total,
                completed,
                pending,
            },

            stats: {
                totalOrders,
                deliveredOrders,
                activeOrders,
                cancelledOrders,
            },
        };
    }


    // -----------------------
    // Utility: Extract City
    // -----------------------
    private static extractCity(address: string): string {
        const parts = address.split(",");
        if (parts.length > 2 && typeof parts[parts.length - 3] === "string") {
            return (parts[parts.length - 3] ?? '').trim();
        }
        return address;
    }
}