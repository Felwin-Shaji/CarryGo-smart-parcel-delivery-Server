import { FilterQuery } from "mongoose";
import { GetHubsDTO } from "../../../Application/Dto/Hub/hub.dto";
// import { PaginatedData } from "../../../Application/interfaces/repositories_interfaces/agencyRepositories_Interfaces/agency.repository";
import { IHubRepository, PaginatedHubData } from "../../Interface/repositories_interfaces/hubRepositories_Interfaces/hub.repository";
import { Hub } from "../../../Domain/Entities/Hub/Hub";
import { HubModel } from "../../database/models/Hub/HubModel";
import { BaseRepository } from "../baseRepositories";

export class HubRepository extends BaseRepository<Hub> implements IHubRepository {
    constructor() {
        super(HubModel)
    };

    async getPaginatedAgencies(dto: GetHubsDTO): Promise<PaginatedHubData> {
        const { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate } = dto;
        const skip = (page - 1) * limit;

        const filter: FilterQuery<Hub> = {};
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
}