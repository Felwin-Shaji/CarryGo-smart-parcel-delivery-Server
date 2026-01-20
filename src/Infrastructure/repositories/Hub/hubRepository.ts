import { FilterQuery } from "mongoose";
import { GetHubsDTO, updateHubKycStatusDTO } from "../../../Application/Dto/Hub/hub.dto";
// import { PaginatedData } from "../../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository, PaginatedHubData } from "../../../Application/interfaces/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubModel } from "../../database/models/Hub/HubModel";
import { BaseRepository } from "../baseRepositories";
import { ServiceableHubWithAgencyDTO } from "../../../Application/Dto/User/Booking.dto";
import { AppError } from "../../../Domain/utils/customError";
import { HUB_MESSAGES } from "../../constants/messages/hubMessage";
import { STATUS } from "../../constants/statusCodes";

export class HubRepository extends BaseRepository<Hub> implements IHubRepository {
    constructor() {
        super(HubModel)
    };

    async getHubById(hubId: string): Promise<Hub> {
        const hub = await this.findById({ _id: hubId });

        if (!hub) throw new AppError(HUB_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND)

        return hub
    }

    async updateKycSatus(hubId: string, dto: updateHubKycStatusDTO): Promise<void> {

        const { status, rejectReason } = dto;

        const updateData: Partial<Hub> = {
            kycStatus: status,
        };

        if (status === "REJECTED") {
            if (!rejectReason) {
                throw new AppError(HUB_MESSAGES.REASON_NOT_FOUND, STATUS.BAD_REQUEST);
            }
            updateData.rejectReason = rejectReason;
        } else {
            updateData.rejectReason = null;
        }

        const updatedHub = await this.findOneAndUpdate(
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

        const sort: any = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit),
            this.model.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }


    async findServiceableAgenciesWithHubs(fromPincode: string, toPincode: string): Promise<ServiceableHubWithAgencyDTO[]> {

        const result = await HubModel.aggregate([
            {
                $match: {
                    "address.pincode": { $in: [fromPincode, toPincode] },
                    isBlocked: false
                }
            },
            {
                $group: {
                    _id: "$agencyId",
                    hubs: { $push: "$$ROOT" },
                    pincodes: { $addToSet: "$address.pincode" }
                }
            },
            {
                $match: {
                    pincodes: { $all: [fromPincode, toPincode] }
                }
            },
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

            {
                $project: {
                    agency: {
                        agencyId: { $toString: "$agency._id" },
                        name: "$agency.name",
                        commissionRate: "$agency.commisionRate"
                    },

                    fromHub: {
                        $first: {
                            $filter: {
                                input: "$hubs",
                                as: "hub",
                                cond: { $eq: ["$$hub.address.pincode", fromPincode] }
                            }
                        }
                    },

                    toHub: {
                        $first: {
                            $filter: {
                                input: "$hubs",
                                as: "hub",
                                cond: { $eq: ["$$hub.address.pincode", toPincode] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    agency: 1,

                    fromHub: {
                        hubId: { $toString: "$fromHub._id" },
                        hubName: "$fromHub.name",
                        address: "$fromHub.address",
                        location: "$fromHub.location"
                    },

                    toHub: {
                        hubId: { $toString: "$toHub._id" },
                        hubName: "$toHub.name",
                        address: "$toHub.address",
                        location: "$toHub.location"
                    }
                }
            }
        ]);

        return result;
    }
}