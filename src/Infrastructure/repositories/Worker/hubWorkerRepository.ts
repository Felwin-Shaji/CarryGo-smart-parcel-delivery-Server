import { FilterQuery } from "mongoose";
import { IHubWorkerRepository } from "../../../Application/interfaces/repositories_interfaces/workerRepository_interfaces/worker.repository";
import { HubWorker } from "../../../Domain/Entities/Worker/Worker";
import { HubWorkerModel } from "../../database/models/Worker/workerModel";
import { BaseRepository } from "../baseRepositories";
import { GetHubWorkersResponseDTO, GetWorkersDTO, WorkerResponseDTO } from "../../../Application/Dto/Workers/worker.dto";

export class HubWorkerRepository extends BaseRepository<HubWorker> implements IHubWorkerRepository {
    constructor() {
        super(HubWorkerModel)
    }

    async getPaginatedWorkersByHubs(hubId: string, dto: GetWorkersDTO): Promise<GetHubWorkersResponseDTO> {
        const { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate } = dto;

        const safeLimit = Math.min(limit, 10);
        const skip = (page - 1) * safeLimit;

        const filter: FilterQuery<HubWorker> = { hubId };

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

        const sort: Record<string, 1 | -1> = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        const [workers, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(safeLimit)
                .select({
                    hubId: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    role: 1,
                    kycStatus: 1,
                    createdAt: 1,
                })
                .lean<WorkerResponseDTO[]>(),

            this.model.countDocuments(filter),
        ]);

        return {
            data: workers,
            total,
            page,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit),
        };


    }

}