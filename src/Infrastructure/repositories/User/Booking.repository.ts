import { IBookingRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/IBookingRepository";
import { Booking } from "../../../Domain/Entities/Booking/Booking";
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

            logistics: booking.logistics,

            payment: booking.payment,

            status: booking.status,
        });

        return this.toDomain(doc);
    }

    async getBookingById(bookingId: string): Promise<Booking> {
        const doc = await this.model.findById(bookingId);

        if (!doc) throw new AppError(BOOKING_MESSAGE.NOT_FOUND, STATUS.NOT_FOUND)

        return this.toDomain(doc)
    }

    async getBooingsByUserId(userId: string): Promise<Booking[]> {
        const docs = await this.model.find({ userId })

        const bookings = docs.map((doc) => this.toDomain(doc));

        return bookings

    }

    async updatePayment(
        bookingId: string,
        payment: {
            orderRef?: string;
            paymentRef?: string;
            paymentStatus: PaymentStatusType;
            paidAt?: Date;
        }
    ): Promise<void> {

        await this.findOneAndUpdate(
            { _id: bookingId },
            {
                $set: {
                    "payment.orderRef": payment.orderRef,
                    "payment.paymentRef": payment.paymentRef,
                    "payment.paymentStatus": payment.paymentStatus,
                    "payment.paidAt": payment.paidAt,
                },
            }
        );

    };

    async updateStatus(bookingId: string, status: BookingStatusType): Promise<void> {
        await this.model.updateOne(
            { _id: bookingId },
            { $set: { status } }
        );
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
                addressLine1: doc.pickupAddress.addressLine1,
                addressLine2: doc.pickupAddress.addressLine2 ?? null,
                city: doc.pickupAddress.city,
                state: doc.pickupAddress.state,
                country: doc.pickupAddress.country,
                pincode: doc.pickupAddress.pincode,
                location: doc.pickupAddress.location,
            },

            {
                label: doc.deliveryAddress.label,
                addressLine1: doc.deliveryAddress.addressLine1,
                addressLine2: doc.deliveryAddress.addressLine2 ?? null,
                city: doc.deliveryAddress.city,
                state: doc.deliveryAddress.state,
                country: doc.deliveryAddress.country,
                pincode: doc.deliveryAddress.pincode,
                location: doc.deliveryAddress.location,
            },

            {
                category: doc.packageDetails.category,
                size: doc.packageDetails.size,
                weightKg: doc.packageDetails.weightKg,
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
            {
                routeHubs: doc.logistics.routeHubs.map(hub => ({
                    hubId: hub.hubId.toString(),
                    hubName: hub.hubName,
                    status: hub.status,
                    arrivedAt: hub.arrivedAt,
                    departedAt: hub.departedAt,
                })),
                currentHubId: doc.logistics.currentHubId?.toString(),
                lastUpdatedAt: doc.logistics.lastUpdatedAt,
            },

            doc.createdAt,
            doc.updatedAt
        );
    }

}