import { ITravelRequestRepository } from "../../../Application/interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { TravelRequest } from "../../../Domain/Entities/User/TravelRequest";
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
};
