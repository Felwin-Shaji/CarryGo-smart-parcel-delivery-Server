import { IGetTravelRequestsUseCase } from "../../../Interfaces/UseCases/User/Traveler/IGetTravelRequestsUseCase";
import { ITravelRequestRepository } from "../../../Interfaces/Repositories/User/ITravelRequestRepository";
import { inject, injectable } from "tsyringe";
import { TravelerRequestFilterDTO } from "../../../DTOs/User/traveler.dto";

@injectable()
export class GetTravelRequestsUseCase implements IGetTravelRequestsUseCase {
    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository
    ) { }

    async execute(userId: string, dto: TravelerRequestFilterDTO) {
        const travelRequests = await this._travelRequestRepository.findByTravelerId(userId, dto);
        return travelRequests;
    }
}
