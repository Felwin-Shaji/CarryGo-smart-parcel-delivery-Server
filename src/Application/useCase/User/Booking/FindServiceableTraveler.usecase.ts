import { inject, injectable } from "tsyringe";
import { IFindServiceableTravelerUsecase } from "../../../interfaces/useCase_Interfaces/user/Booking/IFindServiceableTravelerUsecase";
import { ITravelRequestRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/ITravelRequestRepository";
import { IUserRepository } from "../../../interfaces/repositories_interfaces/userRepositories_Interfaces/user.repository";
import { ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";
import { GeoLocation } from "../../../interfaces/useCase_Interfaces/user/Booking/ICheckServiceablePartnersUsecase";

@injectable()
export class FindServiceableTravelerUsecase implements IFindServiceableTravelerUsecase {

    constructor(
        @inject("ITravelRequestRepository") private readonly _travelRequestRepository: ITravelRequestRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository

    ) { }

    async execute(pickupLocation: GeoLocation, deliveryLocation: GeoLocation): Promise<ServiceableTravelerDTO[]> {

        const travelRequests = await this._travelRequestRepository.findServiceableTravelers(pickupLocation, pickupLocation);

        return travelRequests
    }
}
