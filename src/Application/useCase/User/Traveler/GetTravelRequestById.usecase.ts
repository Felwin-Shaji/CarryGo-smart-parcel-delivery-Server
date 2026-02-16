// import { inject, injectable } from "tsyringe";
// import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
// import { IGetTravelRequestByIdUseCase } from "../../../interfaces/useCase_Interfaces/user/Traveler/IGetTravelRequestByIdUseCase";
// import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";


// @injectable()
// export class GetTravelRequestByIdUseCase implements IGetTravelRequestByIdUseCase {
//     constructor(
//         @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository
//     ) { };

//    async execute(travelerId: string, travelRequestId: string): Promise<TravelRequest> {
//         const travelRequest = await this._travelRequestRepository.getTravelRequestById(travelerId, travelRequestId);
//         return travelRequest;
//     }
// }