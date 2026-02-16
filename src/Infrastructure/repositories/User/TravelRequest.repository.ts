import { ITravelRequestRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
import { AppError } from "../../../Domain/utils/customError";
import { USER_MESSAGES } from "../../constants/messages/userMessage";
import { STATUS } from "../../constants/statusCodes";
import { TravelRequestDocument, TravelRequestModel } from "../../database/models/UserModels/travelRequestSchema";
import { BaseRepository } from "../baseRepositories";


export class TravelRequestRepository extends BaseRepository<TravelRequestDocument> implements ITravelRequestRepository {
    constructor() {
        super(TravelRequestModel)
    };

    async create(travelRequest: TravelRequest): Promise<void> {
        const doc = {
            travelerId: travelRequest.travelerId,
            startLocation: travelRequest.startLocation,
            startAddress: travelRequest.startAddress,
            endLocation: travelRequest.endLocation,
            endAddress: travelRequest.endAddress,
            departureAt: travelRequest.departureAt,
            arrivalAt: travelRequest.arrivalAt,
            capacityKg: travelRequest.capacityKg,
            remainingCapacityKg: travelRequest.remainingCapacityKg,
            allowedPackageSizes: travelRequest.allowedPackageSizes,
            pricePerKg: travelRequest.pricePerKg,
            modeOfTransport: travelRequest.modeOfTransport,
            description: travelRequest.description,
            status: travelRequest.status,
        };

        await this.model.create(doc);
    };

    async findByTravelerId(travelerId: string): Promise<TravelRequest[]> {


        const docs = await this.model
            .find({ travelerId })
            .sort({ createdAt: -1 });

        return docs.map(doc => this.toDomain(doc))
    }

    async getTravelRequestById(travelerId: string, travelRequestId: string): Promise<TravelRequest> {
        const doc = await this.model.findOne({ _id: travelRequestId, travelerId });
        if (!doc) throw new AppError(USER_MESSAGES.TRAVEL_REQUEST_NOT_FOUND, STATUS.NOT_FOUND);
        return this.toDomain(doc);
    }

    toDomain(doc: TravelRequestDocument): TravelRequest {
        return new TravelRequest(
            doc._id.toString(),
            doc.travelerId.toString(),
            doc.startLocation,
            doc.startAddress,
            doc.endLocation,
            doc.endAddress,
            doc.departureAt,
            doc.arrivalAt ?? null,
            doc.capacityKg,
            doc.remainingCapacityKg,
            doc.allowedPackageSizes,
            doc.pricePerKg ?? null,
            doc.modeOfTransport,
            doc.description ?? null,
            doc.status,
            doc.createdAt,
            doc.updatedAt
        );
    }
}
