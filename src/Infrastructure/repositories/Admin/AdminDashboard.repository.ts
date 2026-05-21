import { AdminBookingChartResponseDTO, AdminBookingsReportDTO, AdminBookingsReportResponseDTO, AdminDashboardResponseDTO, AdminRevenueChartResponseDTO, GetAdminDashboardDTO } from "../../../Application/Dto/Admin/adminDashboard.dto";
import { IAdminDashboardRepository } from "../../../Application/interfaces/repositories_interfaces/adminRepositories_Interfaces/IAdminDashboardRepository";
import { PaymentStatus } from "../../../Domain/Enums/PaymentStatus";
import { AgencyModel } from "../../database/models/AgencyModels/agencyModel";
import { BookingModel } from "../../database/models/Booking/BookingSchema";
import { HubModel } from "../../database/models/Hub/HubModel";
import { UserModel } from "../../database/models/UserModels/userModel";
import { HubWorkerModel } from "../../database/models/Worker/workerModel";



export class AdminDashboardRepository implements IAdminDashboardRepository {

    async getDashboardOverview(dto: GetAdminDashboardDTO): Promise<AdminDashboardResponseDTO> {

        const bookingFilter: Record<string, unknown> = {};

        if (dto.fromDate || dto.toDate) {

            const createdAtFilter: Record<string, Date> = {};

            if (dto.fromDate) createdAtFilter.$gte = new Date(dto.fromDate);
            if (dto.toDate) createdAtFilter.$lte = new Date(dto.toDate);

            bookingFilter.createdAt = createdAtFilter;
        }


        const [
            totalUsers,
            totalTravelers,
            totalAgencies,
            totalHubs,
            totalWorkers,
            activeParcels,
            deliveredParcels,
            revenueData,

        ] = await Promise.all([

            UserModel.countDocuments(),
            UserModel.find({ kycStatus: "APPROVED" }).countDocuments(),
            AgencyModel.countDocuments(),
            HubModel.countDocuments(),
            HubWorkerModel.countDocuments(),

            BookingModel.countDocuments({
                ...bookingFilter,
                status: {
                    $nin: [
                        "DELIVERED",
                        "CANCELLED",
                    ],
                },
            }),

            BookingModel.countDocuments({
                ...bookingFilter,
                status: "DELIVERED",
            }),

            BookingModel.aggregate([
                {
                    $match: {
                        ...bookingFilter,

                        status: "DELIVERED",

                        "payment.paymentStatus":
                            PaymentStatus.PAID,
                    },
                },

                {
                    $group: {

                        _id: null,

                        platformRevenue: {
                            $sum:
                                "$pricing.platformFee",
                        },

                        totalRevenue: {
                            $sum:
                                "$pricing.totalAmount",
                        },
                    },
                },
            ]),
        ]);

        const revenue = revenueData[0];

        return {

            overview: {

                totalUsers,

                totalTravelers,

                totalAgencies,

                totalHubs,

                totalWorkers,

                activeParcels,

                deliveredParcels,

                platformRevenue:
                    revenue?.platformRevenue || 0,

                travelerCommission:
                    revenue?.travelerCommission || 0,

                agencyCommission:
                    revenue?.agencyCommission || 0,
            },
        };
    };

    async getRevenueChart(dto: GetAdminDashboardDTO): Promise<AdminRevenueChartResponseDTO> {

        const bookingFilter: Record<string, unknown> = {

            status: "DELIVERED",

            "payment.paymentStatus":
                PaymentStatus.PAID,
        };

        if (dto.fromDate || dto.toDate) {

            const createdAtFilter:
                Record<string, Date> = {};

            if (dto.fromDate) {

                createdAtFilter.$gte =
                    new Date(dto.fromDate);
            }

            if (dto.toDate) {

                createdAtFilter.$lte =
                    new Date(dto.toDate);
            }

            bookingFilter.createdAt =
                createdAtFilter;
        }

        const revenueData =
            await BookingModel.aggregate([

                {
                    $match: bookingFilter,
                },

                {
                    $group: {

                        _id: {

                            year: {
                                $year: "$createdAt",
                            },

                            month: {
                                $month: "$createdAt",
                            },
                        },

                        revenue: {

                            $sum:
                                "$pricing.platformFee",
                        },
                    },
                },

                {
                    $sort: {

                        "_id.year": 1,

                        "_id.month": 1,
                    },
                },
            ]);


        const formattedData =
            revenueData.map((item) => {

                const month =
                    new Date(
                        item._id.year,
                        item._id.month - 1
                    ).toLocaleString("default", {
                        month: "short",
                    });

                return {

                    label: month,

                    revenue:
                        item.revenue,
                };
            });

        return {

            data: formattedData,
        };
    };

    async getBookingsChart(dto: GetAdminDashboardDTO): Promise<AdminBookingChartResponseDTO> {

        const bookingFilter: Record<string, unknown> = {};

        if (dto.fromDate || dto.toDate) {

            const createdAtFilter: Record<string, Date> = {};

            if (dto.fromDate) createdAtFilter.$gte = new Date(dto.fromDate);
            if (dto.toDate) createdAtFilter.$lte = new Date(dto.toDate);

            bookingFilter.createdAt = createdAtFilter;
        };

        const bookingsData =
            await BookingModel.aggregate([

                {
                    $match: bookingFilter,
                },

                {
                    $group: {

                        _id: {

                            year: {
                                $year: "$createdAt",
                            },

                            month: {
                                $month: "$createdAt",
                            },
                        },

                        bookings: {
                            $sum: 1,
                        },

                        delivered: {

                            $sum: {

                                $cond: [

                                    {
                                        $eq: [
                                            "$status",
                                            "DELIVERED",
                                        ],
                                    },

                                    1,

                                    0,
                                ],
                            },
                        },
                    },
                },

                {
                    $sort: {

                        "_id.year": 1,

                        "_id.month": 1,
                    },
                },
            ]);

        const formattedData =
            bookingsData.map((item) => {

                const month =
                    new Date(
                        item._id.year,
                        item._id.month - 1
                    ).toLocaleString("default", {
                        month: "short",
                    });

                return {

                    label: month,

                    bookings:
                        item.bookings,

                    delivered:
                        item.delivered,
                };
            });

        return {

            data: formattedData,
        };
    };

    async getBookingsReport(dto: AdminBookingsReportDTO): Promise<AdminBookingsReportResponseDTO> {

        const filter: Record<string, unknown> = {};

        if (dto.fromDate || dto.toDate) {
            const createdAtFilter: Record<string, Date> = {};

            if (dto.fromDate) createdAtFilter.$gte = new Date(dto.fromDate);
            if (dto.toDate) createdAtFilter.$lte = new Date(dto.toDate);

            filter.createdAt = createdAtFilter;
        }


        if (dto.deliveryType) filter.deliveryPartnerType = dto.deliveryType;
        if (dto.status) filter.status = dto.status;

        const page = Number(dto.page) || 1;
        const limit = Number(dto.limit) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await BookingModel.countDocuments(filter);

        const bookings =
            await BookingModel.find(filter)
                .populate(
                    "userId",
                    "name"
                )

                .sort({
                    createdAt: -1,
                })

                .skip(skip)

                .limit(limit)

                .lean();

        const formattedBookings =
            bookings.map((booking) => ({

                bookingId:
                    booking.bookingId,

                user:
                    (
                        booking.userId as {
                            name?: string;
                        }
                    )?.name || "Unknown",

                deliveryType:
                    booking.deliveryPartnerType,

                partnerName:

                    booking.partnerSnapshot?.name ||

                    "N/A",

                pickupCity:
                    booking.pickupAddress.city,

                deliveryCity:
                    booking.deliveryAddress.city,

                totalAmount: booking.pricing.totalAmount,
                platformCommission: booking.pricing.platformFee,
                travelerCommission: 0,
                agencyCommission: 0,
                status: booking.status,
                createdAt: booking.createdAt,
            }));

        return {

            bookings: formattedBookings,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalCount,
        };
    }

}