import { FilterQuery, Types } from "mongoose";
import type { AgencyWithKYC_DB_Result, IAgencyRepository, PaginatedData } from "../../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { Agency } from "../../../Domain/Entities/Agency/Agency";
import { AgencyModel } from "../../database/models/AgencyModels/agencyModel";
import { BaseRepository } from "./..//baseRepositories";
import { GetAgenciesDTO } from "../../../Application/Dto/Agency/agency.dto";
import { threadCpuUsage } from "process";
import { AppError } from "../../../Domain/utils/customError";
import { AGENCY_MESSAGES } from "../../constants/messages/agencyMessages";
import { STATUS } from "../../constants/statusCodes";

export class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository {
    constructor() {
        super(AgencyModel);
    };

    async getAgencies(): Promise<Agency[]> {
        return this.find({});
    }

    async getAgencyById(agencyId: string): Promise<Agency> {
        const agency = await this.findById({ _id: agencyId });
        if (!agency) throw new AppError(AGENCY_MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
        return agency
    }

    async getPaginatedAgencies(dto: GetAgenciesDTO): Promise<PaginatedData> {
        const { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate } = dto;
        const skip = (page - 1) * limit;

        const filter: FilterQuery<Agency> = {};

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


    async findAgencyWithKYC(id: string): Promise<AgencyWithKYC_DB_Result | null> {
        const result = await this.model.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "agencykycs",
                    localField: "_id",
                    foreignField: "agencyId",
                    as: "kyc"
                }
            },
            { $unwind: { path: "$kyc", preserveNullAndEmptyArrays: true } }
        ])

        if (!result || result?.length === 0) return null;

        const agencyDoc = result[0];

        return agencyDoc as AgencyWithKYC_DB_Result;
    }
};