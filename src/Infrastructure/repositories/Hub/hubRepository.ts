import { ClientSession, FilterQuery, Types } from "mongoose";
import { GetHubsDTO, updateHubKycStatusDTO } from "../../../Application/Dto/Hub/hub.dto";
import { IHubRepository, PaginatedHubData } from "../../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubDocument, HubModel } from "../../database/models/Hub/HubModel";
import { ServiceableHubWithAgencyDTO } from "../../../Application/Dto/User/Booking.dto";
import { AppError } from "../../../Domain/utils/customError";
import { HUB_MESSAGES } from "../../constants/messages/hubMessage";
import { STATUS } from "../../constants/statusCodes";
import { SortOrder } from "mongoose";
import { GeoLocation } from "../../../Application/interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";
import { HubWorkerModel } from "../../database/models/Worker/workerModel";

export class HubRepository implements IHubRepository {
    async findById(filter: FilterQuery<HubDocument>): Promise<Hub> {
        const docs = await HubModel.findById(filter);
        if (!docs) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        return this.toDomain(docs);
    }


    async findOne(filter: FilterQuery<HubDocument>): Promise<Hub | null> {
        const docs = await HubModel.findOne(filter);
        if (!docs) return null;
        return this.toDomain(docs);
    }

    async findOneAndUpdate(filter: FilterQuery<HubDocument>, value: object, unsetData?: object, session?: ClientSession): Promise<Hub | null> {
        const options: {
            new: boolean;
            session?: ClientSession;
        } = { new: true };

        const update: {
            $set: object;
            $unset?: object;
        } = { $set: value };

        if (unsetData) {
            const cleanedUnset: Record<string, string> = {};
            for (const key in unsetData) {
                cleanedUnset[key] = "";
            }
            update.$unset = cleanedUnset;
        }

        if (session) options.session = session;

        const docs = await HubModel.findOneAndUpdate(filter, update, options);
        if (!docs) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);

        return this.toDomain(docs)
    }

    async saveHub(hub: Hub): Promise<Hub> {

        const doc = await HubModel.create({
            agencyId: hub.agencyId,
            name: hub.name,
            email: hub.email,
            mobile: hub.mobile,
            password: hub.password,
            role: hub.role,
            address: hub.address,
            location: {
                type: "Point",
                coordinates: [
                    hub.location.lng,
                    hub.location.lat
                ]
            },
            verificationImage: hub.verificationImage,
            kycStatus: hub.kycStatus,
            rejectReason: hub.rejectReason,
            walletBalance: hub.walletBalance,
            isBlocked: hub.isBlocked,
            tokenVersion: hub.tokenVersion
        });

        return this.toDomain(doc);
    }

    async getHubById(hubId: string): Promise<Hub> {
        const hub = await HubModel.findById({ _id: hubId });

        if (!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND)

        return this.toDomain(hub)
    }

    async findByIds(hubIds: string[]): Promise<Hub[]> {
        const docs = await HubModel
            .find({
                _id: { $in: hubIds.map(id => new Types.ObjectId(id)) }
            })

        return docs.map(this.toDomain);
    }

    async updateKycSatus(hubId: string, dto: updateHubKycStatusDTO): Promise<void> {

        const { status, reason } = dto;

        const updateData: Partial<Hub> = {
            kycStatus: status,
        };

        if (status === "REJECTED") {
            if (!reason) {
                throw new AppError(HUB_MESSAGES.REASON_NOT_FOUND, STATUS.BAD_REQUEST);
            }
            updateData.rejectReason = reason;
        } else {
            updateData.rejectReason = null;
        }

        const updatedHub = await HubModel.findOneAndUpdate(
            { _id: hubId },
            updateData,
            { new: true }
        );

        if (!updatedHub) {
            throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND)
        }
    }

    async getPaginatedHubsByAgency(agencyId: string, dto: GetHubsDTO): Promise<PaginatedHubData> {
        const { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate } = dto;

        const safeLimit = Math.min(limit, 50);
        const skip = (page - 1) * safeLimit;

        const filter: FilterQuery<Hub> = { agencyId };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { mobile: { $regex: search, $options: "i" } },
            ];
        }

        if (blocked !== null && blocked !== undefined) {
            filter.isBlocked = blocked;
        }

        if (kycStatus) {
            filter.kycStatus = kycStatus;
        }

        if (startDate || endDate) {
            filter.createdAt = {};

            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const sort: Record<string, SortOrder> = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        const [data, total] = await Promise.all([
            HubModel.find(filter).sort(sort).skip(skip).limit(limit),
            HubModel.countDocuments(filter),
        ]);

        return {
            data: data.map(d => this.toDomain(d)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findServiceableAgenciesWithHubs(
        pickupLocation: GeoLocation,
        deliveryLocation: GeoLocation,
    ): Promise<ServiceableHubWithAgencyDTO[]> {

        const MAX_DISTANCE = 20000;
        // const skip = (page - 1) * limit;

        const result = await HubModel.aggregate([
            // 1️ Find hubs near pickup location
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [pickupLocation.lng, pickupLocation.lat],
                    },
                    distanceField: "pickupDistance",
                    maxDistance: MAX_DISTANCE,
                    spherical: true,
                }
            },

            {
                $match: {
                    isBlocked: false,
                    kycStatus: "APPROVED"
                }
            },

            // 2️ Group pickup hubs by agency
            {
                $group: {
                    _id: "$agencyId",
                    pickupHub: { $first: "$$ROOT" }
                }
            },

            // 3️ Lookup delivery hub from same agency
            {
                $lookup: {
                    from: "hubs",
                    let: { agencyId: "$_id" },
                    pipeline: [
                        {
                            $geoNear: {
                                near: {
                                    type: "Point",
                                    coordinates: [deliveryLocation.lng, deliveryLocation.lat],
                                },
                                distanceField: "deliveryDistance",
                                maxDistance: MAX_DISTANCE,
                                spherical: true,
                            }
                        },
                        {
                            $match: {
                                $expr: { $eq: ["$agencyId", "$$agencyId"] },
                                isBlocked: false,
                                kycStatus: "APPROVED"
                            }
                        },
                        { $limit: 1 }
                    ],
                    as: "deliveryHub"
                }
            },

            { $unwind: "$deliveryHub" },

            // 4️ Lookup agency
            {
                $lookup: {
                    from: "agencies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "agency"
                }
            },

            { $unwind: "$agency" },

            {
                $match: {
                    "agency.isBlocked": false,
                    "agency.kycStatus": "APPROVED"
                }
            },

            // 5️ Final projection
            {
                $project: {
                    agency: {
                        agencyId: { $toString: "$agency._id" },
                        name: "$agency.name",
                        commissionRate: "$agency.commisionRate"
                    },

                    fromHub: {
                        hubId: { $toString: "$pickupHub._id" },
                        hubName: "$pickupHub.name",
                        address: {
                            city: "$pickupHub.address.city",
                            state: "$pickupHub.address.state",
                            pincode: "$pickupHub.address.pincode"
                        },

                        location: {
                            lat: { $arrayElemAt: ["$pickupHub.location.coordinates", 1] },
                            lng: { $arrayElemAt: ["$pickupHub.location.coordinates", 0] }
                        }
                    },

                    toHub: {
                        hubId: { $toString: "$deliveryHub._id" },
                        hubName: "$deliveryHub.name",
                        address: {
                            city: "$deliveryHub.address.city",
                            state: "$deliveryHub.address.state",
                            pincode: "$deliveryHub.address.pincode"
                        },
                        location: {
                            lat: { $arrayElemAt: ["$deliveryHub.location.coordinates", 1] },
                            lng: { $arrayElemAt: ["$deliveryHub.location.coordinates", 0] }
                        }
                    }
                }
            },

            // {
            //     $facet: {
            //         metadata: [{ $count: "total" }],
            //         data: [
            //             { $skip: skip },
            //             { $limit: limit }
            //         ]
            //     }
            // }
        ]);

        // const total = result.length;
        // const data = result[0]?.data || [];


        return result

    }

    async countByAgency(agencyId: string): Promise<number> {
        return await HubModel.countDocuments({
            agencyId: new Types.ObjectId(agencyId),
        });
    };

    async countWorkersByAgency(agencyId: string): Promise<number> {
        const hubs = await HubModel
            .find({ agencyId: new Types.ObjectId(agencyId) })
            .select("_id");

        if (!hubs.length) return 0;

        const hubIds = hubs.map(h => h._id);

        //  Step 2: count workers using hubIds
        return await HubWorkerModel.countDocuments({
            hubId: { $in: hubIds }
        });
    }


    private toDomain(doc: HubDocument): Hub {
        return new Hub(
            doc._id.toString(),
            doc.agencyId,
            doc.name,
            doc.email,
            doc.mobile,
            doc.password,
            doc.role,
            doc.address,
            {
                lat: doc.location.coordinates[1],
                lng: doc.location.coordinates[0],
            },
            doc.verificationImage,
            doc.kycStatus,
            doc.rejectReason,
            doc.walletBalance,
            doc.isBlocked,
            doc.tokenVersion,
            doc.createdAt,
            doc.updatedAt
        );
    }
}