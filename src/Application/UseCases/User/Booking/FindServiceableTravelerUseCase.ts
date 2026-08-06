import { inject, injectable } from "tsyringe";
import { IFindServiceableTravelerUsecase } from "../../../Interfaces/UseCases/User/Booking/IFindServiceableTravelerUseCase";
import { ITravelRequestRepository } from "../../../Interfaces/Repositories/User/ITravelRequestRepository";
import { CheckServiceableTravelerDTO, PaginationResponseDTO, ServiceableTravelerDTO } from "../../../DTOs/User/BookingDTO";

@injectable()
export class FindServiceableTravelerUsecase implements IFindServiceableTravelerUsecase {

    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    ) { }


    async execute(userId: string, dto: CheckServiceableTravelerDTO): Promise<PaginationResponseDTO<ServiceableTravelerDTO>> {

        const { pickupLocation, deliveryLocation, page = 1, limit = 5 } = dto;

        const travelRequests = await this._travelRequestRepository.findServiceableTravelers(pickupLocation, deliveryLocation,userId , page, limit);

        return travelRequests
    }
}
