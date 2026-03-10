import { IGetTravelRequestsUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/IGetTravelRequestsUseCase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { inject, injectable } from "tsyringe";
import { TravelerRequestFilterDTO } from "../../../Dto/User/traveler.dto";

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
