import { inject, injectable } from "tsyringe";
import { IFindServiceableTravelerUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";
import { GeoLocation } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

@injectable()
export class FindServiceableTravelerUsecase implements IFindServiceableTravelerUsecase {

    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,

    ) { }

    async execute(pickupLocation: GeoLocation, deliveryLocation: GeoLocation): Promise<ServiceableTravelerDTO[]> {

        const travelRequests = await this._travelRequestRepository.findServiceableTravelers(pickupLocation, deliveryLocation);

        return travelRequests
    }
}
