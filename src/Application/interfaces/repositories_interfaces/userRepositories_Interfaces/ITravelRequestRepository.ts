import { TravelRequest } from "../../../../Domain/Entities/User/TravelRequest";

export interface ITravelRequestRepository {
  create(travelRequest: TravelRequest): Promise<void>;
}