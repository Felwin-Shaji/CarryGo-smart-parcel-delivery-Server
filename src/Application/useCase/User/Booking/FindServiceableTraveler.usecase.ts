import { inject, injectable } from "tsyringe";
import { IFindServiceableTravelerUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { CheckServiceableTravelerDTO, PaginationResponseDTO, ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";
import { GeoLocation } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

@injectable()
export class FindServiceableTravelerUsecase implements IFindServiceableTravelerUsecase {

    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    ) { }


    async execute(dto: CheckServiceableTravelerDTO): Promise<PaginationResponseDTO<ServiceableTravelerDTO>> {

        const {pickupLocation,deliveryLocation,page=1,limit=5} = dto;

        const travelRequests = await this._travelRequestRepository.findServiceableTravelers(pickupLocation, deliveryLocation,page,limit);

        return travelRequests
    }
}
