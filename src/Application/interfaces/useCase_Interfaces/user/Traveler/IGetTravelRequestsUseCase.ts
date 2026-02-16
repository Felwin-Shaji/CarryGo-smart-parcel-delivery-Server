import { TravelRequest } from "../../../../../Domain/Entities/User/TravelRequest";

export interface IGetTravelRequestsUseCase {
    execute(userId: string): Promise<TravelRequest[]>;
}
