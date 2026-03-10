import { FilterQuery, Types } from "mongoose";
import { BookingFilterDTO } from "../../../Application/Dto/User/Booking.dto";
import { IBookingRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { Booking } from "../../../Domain/Entities/Booking/Booking";
import { DeliveryPartner } from "../../../Domain/Enums/DeliveryPartnerType";
import { AppError } from "../../../Domain/utils/customError";
import { BOOKING_MESSAGE } from "../../constants/messages/bookingMessages";
import { STATUS } from "../../constants/statusCodes";
import { BookingDocument, BookingModel } from "../../database/models/Booking/BookingSchema";
import { BookingStatusType, PaymentStatusType } from "../../Types/types";
import { BaseRepository } from "../baseRepositories";

export class BookingRepository extends BaseRepository<BookingDocument> implements IBookingRepository {
    constructor() {
        super(BookingModel)
    }

    async create(booking: Booking): Promise<Booking> {
        const doc = await this.model.create({
            userId: booking.userId,

            deliveryPartnerType: booking.deliveryPartnerType,
            partnerSnapshot: booking.partnerSnapshot,

            pickupAddress: booking.pickupAddress,
            deliveryAddress: booking.deliveryAddress,

            packageDetails: booking.packageDetails,

            pricing: booking.pricing,
            distanceKm: booking.distanceKm,

            payment: booking.payment,

            status: booking.status,

            travelRequestId: booking.travelRequestId ?? null,
            travelerJourney: booking.travelerJourney ?? null,

            logistics: booking.logistics ?? null,
        });

        return this.toDomain(doc);
    }

    async getBookingById(bookingId: string): Promise<Booking> {
        const doc = await this.model.findById(bookingId);

        if (!doc) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND)

        return this.toDomain(doc)
    }

    async getBooingsByUserId(userId: string, dto: BookingFilterDTO): Promise<{ bookings: Booking[]; totalCount: number; }> {
        const {
            page,
            limit,
            deliveryType,
            status,
            paymentStatus,
            // size,
            minPrice,
            maxPrice,
        } = dto;

        const query: FilterQuery<BookingDocument> = { userId };

        if (deliveryType && deliveryType !== "ALL") {
            query.deliveryPartnerType = deliveryType;
        }

        if (status && status !== "ALL") {
            query.status = status;
        }

        if (paymentStatus && paymentStatus !== "ALL") {
            query["payment.paymentStatus"] = paymentStatus;
        }

        if (minPrice || maxPrice) {
            query["pricing.totalAmount"] = {};
            if (minPrice) query["pricing.totalAmount"].$gte = minPrice;
            if (maxPrice) query["pricing.totalAmount"].$lte = maxPrice;
        }

        const skip = (page - 1) * limit;

        const [bookings, totalCount] = await Promise.all([
            this.model.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            this.model.countDocuments(query),
        ]);

        return { bookings: bookings.map(doc => this.toDomain(doc)), totalCount };

    }

    async updatePayment(
        bookingId: string,
        payment: {
            orderRef?: string;
            paymentRef?: string;
            paymentStatus?: PaymentStatusType;
            paidAt?: Date;
        }
    ): Promise<void> {

        const updateFields: Record<string, string | Date | PaymentStatusType> = {};

        if (payment.orderRef !== undefined) {
            updateFields["payment.orderRef"] = payment.orderRef;
        }

        if (payment.paymentRef !== undefined) {
            updateFields["payment.paymentRef"] = payment.paymentRef;
        }

        if (payment.paymentStatus !== undefined) {
            updateFields["payment.paymentStatus"] = payment.paymentStatus;
        }

        if (payment.paidAt !== undefined) {
            updateFields["payment.paidAt"] = payment.paidAt;
        }

        await this.model.findOneAndUpdate(
            { _id: bookingId },
            { $set: updateFields }
        );
    }

    async updateStatus(bookingId: string, status: BookingStatusType): Promise<void> {
        await this.model.updateOne(
            { _id: bookingId },
            { $set: { status } }
        );
    }

    async  findByTravelRequestId(travelRequestId: string): Promise<Booking[]> {

        const docs = await this.model
            .find({
                "partnerSnapshot.partnerId": new Types.ObjectId(travelRequestId),
                deliveryPartnerType: DeliveryPartner.TRAVELER
            })
            .sort({ createdAt: -1 });

        if (!docs.length) {
            return [];
        }

        return docs.map(doc => this.toDomain(doc));
    }




    private toDomain(doc: BookingDocument): Booking {
        return new Booking(
            doc._id.toString(),

            doc.userId.toString(),

            doc.deliveryPartnerType,
            doc.partnerSnapshot
                ? {
                    partnerId: doc.partnerSnapshot.partnerId?.toString() ?? null,
                    name: doc.partnerSnapshot.name,
                    type: doc.partnerSnapshot.type,
                    contact: doc.partnerSnapshot.contact ?? {},
                }
                : null,

            {
                label: doc.pickupAddress.label,
                formattedAddress: doc.pickupAddress.formattedAddress,
                city: doc.pickupAddress.city,
                state: doc.pickupAddress.state,
                country: doc.pickupAddress.country,
                pincode: doc.pickupAddress.pincode,
                location: doc.pickupAddress.location,
            },

            {
                label: doc.deliveryAddress.label,
                formattedAddress: doc.deliveryAddress.formattedAddress,
                city: doc.deliveryAddress.city,
                state: doc.deliveryAddress.state,
                country: doc.deliveryAddress.country,
                pincode: doc.deliveryAddress.pincode,
                location: doc.deliveryAddress.location,
            },

            {
                category: doc.packageDetails.category,

                weightKg: doc.packageDetails.weightKg,

                dimensions: {
                    lengthCm: doc.packageDetails.dimensions.lengthCm,
                    widthCm: doc.packageDetails.dimensions.widthCm,
                    heightCm: doc.packageDetails.dimensions.heightCm,
                },

                volumetricWeightKg: doc.packageDetails.volumetricWeightKg ?? 0,

                fragile: doc.packageDetails.fragile ?? false,
            },

            doc.pricing,

            doc.distanceKm,


            {
                gateway: doc.payment.gateway,
                orderRef: doc.payment.orderRef,
                paymentRef: doc.payment.paymentRef,
                paymentMethod: doc.payment.paymentMethod,
                paymentStatus: doc.payment.paymentStatus,
                paidAt: doc.payment.paidAt,
                refundedAt: doc.payment.refundedAt,
            },

            doc.status,
            doc.travelRequestId?.toString() ?? null,
            doc.travelerJourney ?? undefined,
            doc.logistics
                ? {
                    routeHubs: doc.logistics.routeHubs?.map(hub => ({
                        hubId: hub.hubId.toString(),
                        hubName: hub.hubName,
                        status: hub.status,
                        arrivedAt: hub.arrivedAt,
                        departedAt: hub.departedAt,
                    })) ?? [],
                    currentHubId: doc.logistics.currentHubId?.toString(),
                    lastUpdatedAt: doc.logistics.lastUpdatedAt,
                }
                : undefined,

            doc.createdAt,
            doc.updatedAt
        );
    }

}