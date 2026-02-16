import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";

export interface ITravelRequestRepository {
  create(travelRequest: TravelRequest): Promise<void>;
  findByTravelerId(travelerId: string): Promise<TravelRequest[]>;
  getTravelRequestById(travelerId: string, travelRequestId: string): Promise<TravelRequest>;
}