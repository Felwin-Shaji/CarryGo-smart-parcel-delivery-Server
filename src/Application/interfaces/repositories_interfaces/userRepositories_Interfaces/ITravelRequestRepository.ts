import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";
import { ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";
import { GeoLocation } from "../../useCase_Interfaces/user/Booking/ICheckServiceablePartnersUsecase";

export interface ITravelRequestRepository {
  create(travelRequest: TravelRequest): Promise<void>;
  findByTravelerId(travelerId: string): Promise<TravelRequest[]>;
  getTravelRequestById(travelRequestId: string): Promise<TravelRequest>;
  findServiceableTravelers(pickupLocation: GeoLocation, deliveryLocation: GeoLocation): Promise<ServiceableTravelerDTO[]>;
  update(travelRequest: TravelRequest): Promise<void>;
}