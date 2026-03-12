import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";
import { PaginationResponseDTO, ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";
import { PaginatedTravelRequestResponceDTO, TravelerRequestFilterDTO } from "../../../Dto/User/traveler.dto";
import { GeoLocation } from "../../useCase_Interfaces/user/Booking/IFindServicableAgencyUsecase";

export interface ITravelRequestRepository {
  create(travelRequest: TravelRequest): Promise<void>;
  findByTravelerId(travelerId: string, dto: TravelerRequestFilterDTO): Promise<PaginatedTravelRequestResponceDTO>;
  getTravelRequestById(travelRequestId: string): Promise<TravelRequest>;
  findServiceableTravelers(pickupLocation: GeoLocation, deliveryLocation: GeoLocation,userId:string, page: number, limit: number):
    Promise<PaginationResponseDTO<ServiceableTravelerDTO>>;
  update(travelRequest: TravelRequest): Promise<void>;
}