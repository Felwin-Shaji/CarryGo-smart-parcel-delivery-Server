import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";
import { ServiceableTravelerDTO } from "../../../Dto/User/Booking.dto";

export interface ITravelRequestRepository {
  create(travelRequest: TravelRequest): Promise<void>;
  findByTravelerId(travelerId: string): Promise<TravelRequest[]>;
  getTravelRequestById(travelRequestId: string): Promise<TravelRequest>;
  findServiceableTravelers(fromPincode: string, toPincode: string): Promise<ServiceableTravelerDTO[]>;
  update(travelRequest: TravelRequest): Promise<void>;
}